import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";

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
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-blue-600 text-white text-center py-4">
          <h1 className="text-3xl font-bold">AutoTrader</h1>
          <p className="mt-1">Sell Your Car or Find Your Next Ride!</p>
        </header>

        {/* App Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/used-cars" element={<UsedCarsList />} />
          <Route path="/used-cars/:carId" element={<CarDetails />} />
          <Route path="/sell-car" element={<SellCarTab />} />
        </Routes>

        {/* Footer */}
        <footer className="bg-gray-200 text-center py-4 mt-8">
          <p className="text-gray-600">© 2025 AutoTrader. All rights reserved.</p>
        </footer>
      </div>
    </Router>
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

// Car Details Component
function CarDetails() {
  const { carId } = useParams();
  const car = carData.find((c) => c.id === parseInt(carId));

  if (!car) {
    return <p className="text-center mt-8 text-gray-500">Car not found.</p>;
  }

  return (
    <div className="max-w-7xl mx-auto mt-8 flex space-x-6">
      {/* Car Images */}
      <div className="w-1/2">
        {car.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${car.make} ${car.model}`}
            className="w-full h-60 object-cover rounded-lg mb-4"
          />
        ))}
      </div>

      {/* Car Details */}
      <div className="w-1/2">
        <h2 className="text-2xl font-bold">
          {car.year} {car.make} {car.model}
        </h2>
        <p className="text-gray-600 text-lg">{car.price}</p>
        <p className="text-gray-500">{car.mileage}</p>
        <p className="text-gray-500 mb-4">{car.location}</p>
        <p className="text-gray-700">{car.description}</p>
      </div>
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