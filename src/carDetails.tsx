import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const GET_CAR = gql`
  query GetCar($id: ID!) {
    car(where: { id: $id }) {
      id
      title
      make
      model
      year
      price
      description
      miles
      fuelType
      transmission
      seats
      cc
      images {
        url
      }
    }
  }
`;

const CarDetails = () => {
  const { id } = useParams(); // Get the ID from the URL
  const { loading, error, data } = useQuery(GET_CAR, {
    variables: { id },
  });

  const [selectedImage, setSelectedImage] = useState(null); // State for the lightbox
  const [mainImage, setMainImage] = useState(null); // State for the main image in the carousel

  if (loading) return <p className="text-center">Loading car details...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  const car = data.car;

  // Set the first image as the default main image
  const defaultMainImage = car.images.length > 0 ? car.images[0].url : null;

  return (
    <div className="p-4 max-w-7xl mx-auto mt-8">
      <Link to="/" className="text-blue-600 hover:underline text-sm mb-4 inline-block">
        ← Back to results
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Main Image and Thumbnails */}
        <div className="col-span-2">
          {/* Main Image */}
          <div className="relative">
            <img
              src={mainImage || defaultMainImage}
              alt="Main Car"
              className="w-full h-96 object-cover rounded-lg shadow-md"
            />
            <button
              onClick={() => setSelectedImage(mainImage || defaultMainImage)}
              className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow hover:bg-gray-100 text-sm font-semibold"
            >
              View gallery
            </button>
          </div>

          {/* Thumbnails */}
          <div className="mt-4 flex gap-4 overflow-x-auto">
            {car.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                className={`h-24 w-36 object-cover rounded-lg cursor-pointer ${
                  mainImage === image.url ? "ring-4 ring-blue-500" : ""
                }`}
                onClick={() => setMainImage(image.url)} // Change main image on click
              />
            ))}
          </div>
        </div>

        {/* Right Column: Car Details */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{car.title}</h1>
          <p className="text-sm text-gray-600 mb-2">
            {car.make} {car.model} | {car.year}
          </p>
          <p className="text-3xl font-bold text-blue-600 mb-4">
            £{car.price.toLocaleString()}
          </p>

          {/* Additional Details */}
          <div className="space-y-2">
            <p className="flex justify-between">
              <span className="font-semibold text-gray-600">Mileage:</span>
              <span>{car.miles}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-semibold text-gray-600">Fuel Type:</span>
              <span>{car.fuelType}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-semibold text-gray-600">Transmission:</span>
              <span>{car.transmission}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-semibold text-gray-600">Seats:</span>
              <span>{car.seats}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-semibold text-gray-600">Engine CC:</span>
              <span>{car.cc}</span>
            </p>
          </div>

          {/* Seller Details */}
          <div className="bg-gray-100 p-4 rounded-lg mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Private Seller</h2>
            <p className="text-sm text-gray-600">Call: (0161) 9379058</p>
            <p className="text-sm text-gray-600">Ashton-under-Lyne, 7 miles away</p>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              src={selectedImage}
              alt="Selected Car"
              className="max-w-full max-h-full rounded-lg shadow-lg"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            />
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)} // Close lightbox
              className="absolute top-4 right-4 text-white text-2xl font-bold bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CarDetails;