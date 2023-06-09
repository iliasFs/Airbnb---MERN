import { createContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  //Initially user = null so in the AccountPage and when we refresh, it navigates to the login page because it cant find a user and returns to loginPage. So we need to add another state here.So, after setting the data about the user it sets ready to true. Problem solved.
  const [ready, setReady] = useState(false);

  // when the page loads we need to grab the user information from the '/profile' endpoint (api). The information about the user is stored in the cookie-token we send back when we login.
  useEffect(() => {
    if (!user) {
      axios.get("/profile").then(({ data }) => {
        setUser(data);
        setReady(true);
      });
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, ready, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
