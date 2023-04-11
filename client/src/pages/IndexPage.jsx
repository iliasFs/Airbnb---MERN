import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import { useState, useEffect } from "react";

const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);
  return (
    <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
      {places.length > 0 &&
        places.map((place) => (
          <div className="">
            <div className="rounded-2xl mb-2 flex w-full">
              {place.photos?.[0] && (
                <img
                  className="object-cover rounded-2xl w-full aspect-square"
                  src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                  alt=""
                />
              )}
            </div>
            <h2 className="font-bold">{place.address}</h2>
            <h3 className="text-sm text-gray-500" >{place.title}</h3>
            <div className="mt-1">
              
              <span className="font-bold"> ${place.price}</span> per night</div>
          </div>
        ))}
    </div>
  );
};

export default IndexPage;
