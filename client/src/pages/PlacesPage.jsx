import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

import axios from "axios";
import AccountNavigation from "../components/AccountNavigation";

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  console.log(places);
  return (
    <div>
      <AccountNavigation />
      <div className="text-center flex justify-center">
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
      <div className="mt-4 p-4">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              to={`/account/places/${place._id}`}
              className="flex cursor-pointer gap-4 border-l-4  border-primary p-4  "
              key={place._id}
            >
              <div className="flex w-32 h-32 grow shrink-0">
                {place.photos.length > 0 && (
                  <img
                    className="object-cover rounded-2xl"
                    src={"http://localhost:4000/uploads" + place.photos[0]}
                    alt=""
                  />
                )}
              </div>
              <div>
                <h2 className="text-xl">{place.title}</h2>
                <p className="text-sm mt-2 ">{place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default PlacesPage;
