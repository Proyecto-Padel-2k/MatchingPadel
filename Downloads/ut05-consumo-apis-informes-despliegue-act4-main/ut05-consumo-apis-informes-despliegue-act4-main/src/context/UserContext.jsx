import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userLogged, setUserLogged] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("userLogged");
    if (stored === "true") setUserLogged(true);
  }, []);

  const login = () => {
    setUserLogged(true);
    localStorage.setItem("userLogged", "true");
  };

  const logout = () => {
    setUserLogged(false);
    localStorage.removeItem("userLogged");
  };

  return (
    <UserContext.Provider value={{ userLogged, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext };
