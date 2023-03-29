import React from "react";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const AccountPage = () => {
  const { user, ready } = useContext(UserContext);

  if(!ready) return 'Loading...'

  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }
  return <div>AccountPage for {user?.name} </div>;
};

export default AccountPage;
