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
    <div>
      {places.length > 0 && places.map((place) => <div>{place.title}</div>)}
    </div>
  );
};

export default IndexPage;
