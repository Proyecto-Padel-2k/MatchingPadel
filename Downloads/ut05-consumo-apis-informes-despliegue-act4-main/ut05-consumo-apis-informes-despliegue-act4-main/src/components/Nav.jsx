import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom"; 
import { UserContext } from "../context/UserContext";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { userLogged, login, logout } = useContext(UserContext); 
  const navigate = useNavigate();

  const handleLoginAction = () => {
    login(); 
    setOpen(false);
    navigate("/admin"); 
  };

  const handleLogoutAction = () => {
    logout();
    setOpen(false);
    navigate("/"); 
  };

  return (
    <>
      <button onClick={() => setOpen(!open)} className="nav-toggle">
        {open ? "✕" : "☰"}
      </button>

      <nav className={`nav-menu ${open ? "nav-open" : ""}`}>
        <ul className="nav-list" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <li><NavLink to="/" onClick={() => setOpen(false)}>Inicio</NavLink></li>
          <li><NavLink to="/productos" onClick={() => setOpen(false)}>Productos</NavLink></li>
          
          <li>
            <NavLink to={userLogged ? "/admin" : "/login"} onClick={() => setOpen(false)}>
              Admin
            </NavLink>
          </li>

          <li>
            {!userLogged ? (
              <button onClick={handleLoginAction} className="nav-auth-btn">
                Iniciar Sesión
              </button>
            ) : (
              <button onClick={handleLogoutAction} className="nav-auth-btn">
                Cerrar Sesión
              </button>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
}