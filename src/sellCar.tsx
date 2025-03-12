import React from 'react';
import SellCarCarousel from './sellCarCarousel';

function SellCar() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Main Content */}
      <main className="flex-1 bg-gray-100">
        {/* Hero Section */}
        <section className="bg-blue-500 text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold">Sell Your Car</h2>
            <p className="text-lg mt-4">You're in control, choose how you want to sell your car.</p>
          </div>
        </section>

        {/* Selling Options */}
        <section className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Option 1 */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-2xl font-bold">Advertise on Auto Trader</h3>
            <ul className="list-disc pl-5 mt-4 space-y-2">
              <li>Maximise your selling price</li>
              <li>Advertise to over 10 million buyers monthly</li>
              <li>Your sale, your terms</li>
            </ul>
            <a
              href="/create-advert"
              className="block bg-blue-500 text-white mt-6 py-2 px-4 rounded-lg text-center hover:bg-blue-600"
            >
              Start an Advert
            </a>
          </div>

          {/* Option 2 */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-2xl font-bold">Get Dealer Offers</h3>
            <ul className="list-disc pl-5 mt-4 space-y-2">
              <li>Sell for free, with collection included</li>
              <li>Receive the best offer from trusted dealers</li>
              <li>Sell your car quickly and conveniently</li>
            </ul>
            <a
              href="/get-offers"
              className="block bg-blue-500 text-white mt-6 py-2 px-4 rounded-lg text-center hover:bg-blue-600"
            >
              Get Dealer Offers
            </a>
          </div>
        </section>

        {/* Trustpilot Section */}
        <section className="bg-gray-200 py-12">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-2xl font-bold">Join Thousands of Happy Sellers</h3>
            <p className="mt-4">AutoTrader Trustpilot rating: Excellent (4.7/5)</p>
          </div>
        </section>

        <SellCarCarousel />

        {/* FAQ Section */}
        <section className="container mx-auto px-4 py-12">
          <h3 className="text-2xl font-bold text-center mb-8">Your Questions Answered</h3>
          <div className="space-y-4">
            <details className="bg-white shadow-md rounded-lg p-4">
              <summary className="font-bold cursor-pointer">Why sell my car with AutoTrader?</summary>
              <p className="mt-2">
                AutoTrader offers the largest audience of buyers, giving you the best chance to sell your car quickly
                and for the best price.
              </p>
            </details>
            <details className="bg-white shadow-md rounded-lg p-4">
              <summary className="font-bold cursor-pointer">What paperwork do I need to sell my car?</summary>
              <p className="mt-2">
                You'll need the car's handbook, service logbook, and MOT certificate if the car is over three years old.
              </p>
            </details>
            <details className="bg-white shadow-md rounded-lg p-4">
              <summary className="font-bold cursor-pointer">How can I sell my car?</summary>
              <p className="mt-2">
                You can sell privately using our advert system or get dealer offers through our auction platform.
              </p>
            </details>
          </div>
        </section>
        
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 AutoTrader. All rights reserved.</p>
          <nav className="space-x-4 mt-4">
            <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
            <a href="/terms" className="hover:underline">Terms & Conditions</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default SellCar;