import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [registered, setRegistered] = useState(false);

  //request to API
  const registerUser = async (event) => {
    event.preventDefault();

    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("Registration succesful. Now you can Log in");
      setRegistered(true);
    } catch {
      alert("Registration failed. The user already exist");
    }
  };

  if (registered) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Name and Surname"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already have an account?{" "}
            <Link
              className="underline text-black hover:text-primary"
              to={"/login"}
            >
              Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
