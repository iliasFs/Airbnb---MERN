import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

import axios from "axios";
import AccountNavigation from "../components/AccountNavigation";
const [places, setPlaces] = useState([]);
const PlacesPage = () => {
  useEffect(() => {
    axios.get("/places").then(({ data }) => {});
  }, []);

  return (
    <div>
      <AccountNavigation />

      <div className="text-center flex justify-center">
        List of all added Places
        <Link
          className="flex gap-1 bg-primary text-white py-2 px-4 rounded-full w-[150px]"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add place
        </Link>
      </div>
    </div>
  );
};

export default PlacesPage;
