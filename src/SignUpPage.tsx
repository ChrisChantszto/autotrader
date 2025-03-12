import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase"; // Adjust the import path

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed up:", user);
        if (newsletter) {
          // Save newsletter preference to Firestore
          setDoc(doc(db, "users", user.uid), { newsletter: true }, { merge: true })
            .then(() => console.log("Newsletter preference saved"))
            .catch((error) => console.error("Error saving newsletter:", error));
        }
        // Optionally redirect or update UI
      })
      .catch((error) => {
        console.error("Sign-up error:", error);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Create an Account</h2>
      <form onSubmit={handleSignUp} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Enter your email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. name@email.com"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={newsletter}
            onChange={(e) => setNewsletter(e.target.checked)}
            className="mr-2"
          />
          <label className="text-gray-700">
            Send me great offers and the latest vehicle reviews from Auto Trader
          </label>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Continue
        </button>
      </form>
    </div>
  );
}

export default SignUpPage;