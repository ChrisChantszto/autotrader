import React from "react";
import { Link, useLocation } from "react-router-dom";

function HeaderNavigation() {
  const location = useLocation(); // Get the current route

  return (
    <nav className="flex space-x-4 text-sm font-medium">
      {[
        { path: "/cars", label: "Cars" },
        { path: "/lgvs", label: "LGVs" },
        { path: "/bikes", label: "Bikes" },
        { path: "/trucks", label: "Trucks" },
      ].map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`${
            location.pathname === link.path
              ? "text-red-600 font-bold" // Red and bold for the active link
              : "text-gray-600 hover:text-blue-600" // Gray by default, blue on hover
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

export default HeaderNavigation;