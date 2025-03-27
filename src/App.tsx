import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, useLocation, Route, Link, useParams } from "react-router-dom";
import SellCar from "./sellCar";
import SavedPage from "./savedPage";
import { auth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider } from "./firebase";
import { motion } from "framer-motion";
import UsedCars from "./used-cars";
import CarDetails from "./carDetails";
import { Heart, LogIn, Save } from "lucide-react"; // Importing icons from lucide-react
import { FaFacebook, FaGoogle, FaApple } from "react-icons/fa"; // Importing social media icons
import SignUpPage from "./SignUpPage";
import { onAuthStateChanged } from "firebase/auth";
import HeaderNavigation from "./headerNavigation";


// Mock Data for Used Cars
const carData = [
  {
    id: 1,
    make: "Toyota",
    model: "Camry",
    year: 2019,
    price: "$15,000",
    mileage: "45,000 miles",
    location: "New York, NY",
    description:
      "This 2019 Toyota Camry is in excellent condition with a premium interior and advanced safety features.",
    images: [
      "https://via.placeholder.com/300x200?text=Toyota+Camry+1",
      "https://via.placeholder.com/300x200?text=Toyota+Camry+2",
    ],
  },
  {
    id: 2,
    make: "Honda",
    model: "Civic",
    year: 2020,
    price: "$18,500",
    mileage: "30,000 miles",
    location: "Los Angeles, CA",
    description:
      "A reliable and fuel-efficient 2020 Honda Civic with a sleek design and modern technology.",
    images: [
      "https://via.placeholder.com/300x200?text=Honda+Civic+1",
      "https://via.placeholder.com/300x200?text=Honda+Civic+2",
    ],
  },
  {
    id: 3,
    make: "Ford",
    model: "Focus",
    year: 2018,
    price: "$12,800",
    mileage: "60,000 miles",
    location: "Chicago, IL",
    description:
      "Affordable and practical, this 2018 Ford Focus is perfect for city commuting or road trips.",
    images: [
      "https://via.placeholder.com/300x200?text=Ford+Focus+1",
      "https://via.placeholder.com/300x200?text=Ford+Focus+2",
    ],
  },
];

// Main App Component
function AutoTraderApp() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) setIsLoginOpen(false); // Close panel on login
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        console.log("Logged out successfully");
        // No need to manually update state here; onAuthStateChanged will handle it
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Signed in with Google:", result.user);
        setIsLoginOpen(false); // Close the login panel
      })
      .catch((error) => {
        console.error("Google sign-in error:", error);
      });
  };
  
  const signInWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Signed in with Facebook:", result.user);
        setIsLoginOpen(false);
      })
      .catch((error) => {
        console.error("Facebook sign-in error:", error);
      });
  };
  
  const signInWithApple = () => {
    const provider = new OAuthProvider("apple.com");
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Signed in with Apple:", result.user);
        setIsLoginOpen(false);
      })
      .catch((error) => {
        console.error("Apple sign-in error:", error);
      });
  };

  const toggleLogin = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Header with Navigation */}
        <header className="bg-white text-gray-800 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <HeaderNavigation />
          </div>


          {/* Second Row: Logo and Main Navigation */}
          <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
            <Navigation />
            
           {/* User Actions */}
  <div className="flex items-center space-x-6">
    {/* Saved Icon with Label */}
    <Link to="/saved" className="flex flex-col items-center text-black-600 hover:text-blue-800">
      <Heart className="w-6 h-6" />
      <span className="text-xs font-medium mt-1">Saved</span>
    </Link>

    {user ? (
      <div className="flex items-center space-x-4">
        <span className="text-gray-700">Hi, {user.displayName}</span>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
        >
          Log Out
        </button>
      </div>
    ) : (
      // Sign In Icon with Label
      <button
        onClick={toggleLogin}
        className="flex flex-col items-center text-black-600 hover:text-blue-800"
      >
        <LogIn className="w-6 h-6" />
        <span className="text-xs font-medium mt-1">Sign In</span>
      </button>
    )}
            </div>
          </div>
        </header>

        {/* App Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/used-cars" element={<UsedCars />} />
          <Route path="/used-cars/:id" element={<CarDetails />} />
          <Route path="/sell-car" element={<SellCar />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Routes>

        {/* Slide-in Login Panel */}
        {isLoginOpen && (
          <>
            {/* Background Overlay */}
            <div
              onClick={toggleLogin}
              className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40"
            ></div>

            {/* Sliding Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
              className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50"
            >
              <div className="p-6 flex flex-col h-full">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
                <div className="space-y-4">
                  <button
                    onClick={signInWithFacebook}
                    className="flex items-center w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <FaFacebook className="mr-2" /> Continue with Facebook
                  </button>
                  <button
                    onClick={signInWithGoogle}
                    className="flex items-center w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    <FaGoogle className="mr-2" /> Continue with Google
                  </button>
                  <button
                    onClick={signInWithApple}
                    className="flex items-center w-full px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
                  >
                    <FaApple className="mr-2" /> Continue with Apple
                  </button>
                </div>
                <label className="flex items-center mt-6 text-gray-700">
                  <input type="checkbox" className="mr-2" /> Remember me on this device
                </label>
                <p className="mt-6 text-center text-gray-600">
                  New here?{" "}
                  <Link to="/sign-up" className="text-blue-600 hover:underline">
                    Create an account
                  </Link>
                </p>
                <p className="mt-4 text-sm text-center text-gray-600">
                  By continuing, you agree to the{" "}
                  <Link to="/terms" className="text-blue-600 hover:underline">
                    Terms and Conditions
                  </Link>{" "}
                  and confirm you have read our{" "}
                  <Link to="/privacy" className="text-blue-600 hover:underline">
                    Privacy Notice
                  </Link>.
                </p>
                <button
                  onClick={toggleLogin}
                  className="mt-6 w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </>
        )}

        {/* Footer */}
        <footer className="bg-gray-200 text-center py-4 mt-8">
          <p className="text-gray-600">© 2025 AutoTrader. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

function Navigation() {
  const location = useLocation();
  const [hoveredLink, setHoveredLink] = useState(null);

  const navLinks = [
    { path: "/used-cars", label: "Used Cars" },
    { path: "/sell-car", label: "Sell Your Car" },
  ];

  return (
    <div className="flex items-baseline">
      {/* Logo */}
      <Link to="/" className="text-3xl font-bold">
        <img src="/Logo(150).png" alt="AutoRoll logo" className="h-11" />
      </Link>

      {/* Navigation Links */}
      <nav className="flex space-x-6 text-md font-medium ml-8 relative">
        {navLinks.map((link, index) => (
          <div
            key={index}
            className="relative"
            onMouseEnter={() => setHoveredLink(link.path)}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <Link
              to={link.path}
              className={`relative ${
                location.pathname === link.path
                  ? "font-semibold text-black"
                  : "text-black"
              } ${
                hoveredLink && hoveredLink !== link.path ? "opacity-60" : "opacity-100"
              } hover:opacity-100`}
            >
              {link.label}
            </Link>
            {/* Red Underline for Active Link */}
            {location.pathname === link.path && (
              <motion.div
                layoutId="underline"
                className="absolute bottom-[-16px] left-[-10px] w-[calc(100%+20px)] h-[2px] bg-red-600"
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}

// Home Page Component
function HomePage() {
  return (
    <div className="max-w-4xl mx-auto mt-8 text-center">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Welcome to AutoTrader!</h2>
      <div className="space-x-4">
        <Link
          to="/used-cars"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold"
        >
          Browse Used Cars
        </Link>
        <Link
          to="/sell-car"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold"
        >
          Sell Your Car
        </Link>
      </div>
    </div>
  );
}

// Used Cars List Component
function UsedCarsList() {
  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Available Used Cars</h2>
      <ul className="space-y-4">
        {carData.map((car) => (
          <li
            key={car.id}
            className="border rounded-lg p-4 shadow flex items-center justify-between"
          >
            <div>
              <p className="font-semibold text-lg">
                {car.year} {car.make} {car.model}
              </p>
              <p className="text-gray-600">{car.price}</p>
              <p className="text-gray-500">{car.mileage}</p>
            </div>
            <Link
              to={`/used-cars/${car.id}`}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              View Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Sell Car Page Component
function SellCarTab() {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Car listed for sale: ${JSON.stringify(formData)}`);
    setFormData({ make: "", model: "", year: "", price: "" });
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Sell Your Car</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Make</label>
          <input
            type="text"
            name="make"
            value={formData.make}
            onChange={handleChange}
            placeholder="e.g., Toyota"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Model</label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            placeholder="e.g., Camry"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Year</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="e.g., 2020"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Price</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="e.g., $15,000"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg"
        >
          List Car for Sale
        </button>
      </form>
    </div>
  );
}

export default AutoTraderApp;