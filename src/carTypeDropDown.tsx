import React, { useState } from "react";

function CarTypeDropdown() {
  const [selectedItem, setSelectedItem] = useState("選擇車型");

  const items = [
    { name: "兩門車", icon: "🏎️" },
    { name: "四門車", icon: "🚖" },
    { name: "七人車", icon: "🚐" },
    { name: "SUV", icon: "🚜" },
    { name: "掀背車", icon: "🚘" },
    { name: "旅行車", icon: "🚙" },
    { name: "開篷車", icon: "🚗" }
  ];

  const handleSelectChange = (e) => {
    const selectedName = e.target.value;
    setSelectedItem(selectedName);
  };

  return (
    <div>
      <label htmlFor="carType" className="block mb-2">
        車身類型 <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <select
          id="carType"
          value={selectedItem}
          onChange={handleSelectChange}
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
        >
          <option disabled value="選擇車型">
            選擇車型
          </option>
          {items.map((item, index) => (
            <option key={index} value={item.name}>
              {item.icon} {item.name}
            </option>
          ))}
        </select>
        <svg
          className="w-5 h-5 absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}

export default CarTypeDropdown;