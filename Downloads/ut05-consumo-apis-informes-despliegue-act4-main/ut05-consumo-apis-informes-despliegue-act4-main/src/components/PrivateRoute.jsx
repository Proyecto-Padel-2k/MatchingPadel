import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function PrivateRoute() {
  const { userLogged } = useContext(UserContext);

  return userLogged ? <Outlet /> : <Navigate to="/login" replace />;
}
