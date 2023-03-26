import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  //we are using useContext to grab the setUser function in order to store the userinfo to our state
  const { setUser } = useContext(UserContext);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const response = await axios.post("/login", { email, password });
      //we are grabbing the user info from our api (userDoc)
      setUser(response.data);
      alert("Login succesful");
      setRedirect(true);
    } catch (e) {
      alert("Please input your credentials correctly");
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Dont have an account?{" "}
            <Link
              className="underline text-black hover:text-primary"
              to={"/register"}
            >
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
