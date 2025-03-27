import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

const GET_CARS = gql`
  query {
    cars {
      id
      title
      make
      model
      year
      price
      description
      images {
        url
      }
    }
  }
`;

const UsedCars = () => {
  const { loading, error, data } = useQuery(GET_CARS);
  const [filters, setFilters] = useState([]);

  if (loading) return <p className="text-center">Loading cars...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  const handleRemoveFilter = (filter) => {
    setFilters(filters.filter((f) => f !== filter));
  };

  const handleAddFilter = (filter) => {
    if (!filters.includes(filter)) setFilters([...filters, filter]);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Filters Section */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-gray-100 text-sm rounded-full flex items-center"
            >
              {filter}
              <button
                onClick={() => handleRemoveFilter(filter)}
                className="ml-2 text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
            </span>
          ))}
          <button
            onClick={() => handleAddFilter("Make & Model")}
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50"
          >
            + Make & Model
          </button>
          <button
            onClick={() => handleAddFilter("Price")}
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50"
          >
            + Price
          </button>
          <button
            onClick={() => handleAddFilter("Mileage")}
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50"
          >
            + Mileage
          </button>
          <button
            onClick={() => handleAddFilter("Gearbox")}
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50"
          >
            + Gearbox
          </button>
          <button
            onClick={() => handleAddFilter("Body Type")}
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50"
          >
            + Body Type
          </button>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-gray-600 text-sm">{data.cars.length} results</p>
          <button className="text-blue-600 text-sm font-semibold flex items-center hover:underline">
            <span className="mr-2">Filter and sort</span>
            <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs">1</span>
          </button>
        </div>
      </div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.cars.map((car) => (
          <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Car Image */}
            <div className="relative">
              <img
                src={
                  car.images && car.images.length > 0
                    ? car.images[0].url // Use the first image from the images array
                    : "https://via.placeholder.com/300x200" // Fallback placeholder
                }
                alt={car.title}
                className="w-full h-52 object-cover"
              />
              <button className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-gray-100">
                ♥
              </button>
            </div>

            {/* Car Details */}
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800">{car.title}</h2>
              <p className="text-sm text-gray-600">
                {car.make} {car.model} | {car.year}
              </p>
        
              <p className="text-lg text-blue-600 font-bold mt-2">£{car.price.toLocaleString()}</p>
              <Link
                to={`/used-cars/${car.id}`}
                className="text-blue-500 hover:underline text-sm mt-2 block"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsedCars;