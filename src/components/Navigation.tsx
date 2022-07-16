import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="flex justify-between items-center h-[50px] text-white px-5 text-xl shadow-md bg-gray-500">
      <h3 className="font-bold">Github search</h3>

      <span>
        <Link to="/" className="mr-8">Home</Link>
        <Link to="/favourites">Favourites</Link>
      </span>
    </nav>
  );
};

export default Navigation;
