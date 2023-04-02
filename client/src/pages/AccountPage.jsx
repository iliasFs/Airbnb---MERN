import React from "react";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

const AccountPage = () => {
  const { user, ready } = useContext(UserContext);

  //The thing here is that in the use context we have an async function that takes like 28ms to grab the user.So it goes into the if statement as if there is no user. This leads to throw us at login page every time. Thats why we need to user ready state.

  //if the user is still not fetched
  if (!ready) return "Loading...";

  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div>
      <nav className="w-full flex justify-center mt-8 gap-2">
        <Link className="py-2 px-6 bg-primary text-white rounded-full" to={"/account"}>
          My Profile
        </Link>
        <Link className="py-2 px-6" to={"/account/bookings"}>
          My bookings
        </Link>
        <Link className="py-2 px-6" to={"/account/places"}>
          My accommodations
        </Link>
      </nav>
    </div>
  );
};

export default AccountPage;
