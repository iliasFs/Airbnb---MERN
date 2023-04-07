import React from "react";
import { UserContext } from "../contexts/UserContext";
import { useContext, useState } from "react";
import { Navigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNavigation from "../components/AccountNavigation";

const ProfilePage = () => {
  const { user, ready, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = "profile";
  }

  //The thing here is that in the use context we have an async function that takes like 28ms to grab the user.So it goes into the if statement as if there is no user. This leads to throw us at login page every time. Thats why we need to user ready state.

  //if the user is still not fetched

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  if (!ready) return "Loading...";

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="h-full">
      <AccountNavigation />
      {subpage === "profile" && (
        <div className="text-center mt-48 flex flex-col gap-10 justify-center ">
          <h2 className="text-2xl">
            Logged in as {user.name} ({user.email})<br />
          </h2>
          <button
            onClick={logout}
            className="primary max-w-[150px] mt-2 mx-auto"
          >
            Log out
          </button>
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
};

export default ProfilePage;
