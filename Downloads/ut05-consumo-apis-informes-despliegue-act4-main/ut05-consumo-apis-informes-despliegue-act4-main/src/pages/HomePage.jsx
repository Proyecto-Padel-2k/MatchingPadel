/**
 * El componente HomePage renderiza la página principal de la aplicación.
 * Muestra un mensaje de bienvenida, una breve descripción y un botón de llamada a la acción
 * que navega a la página de productos.
 *
 * @component
 * @returns {JSX.Element} El componente HomePage renderizado.
 */
import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/index.css";

export default function HomePage() {
  return (
    <section>
      <h1 className="layout-titulo">Frescura Natural en tu Hogar</h1>

      <div style={{ display: "flex", justifyContent: "center" }}>
        {/* Al dar ver productos nos llevara a lista de productos Grid */}
        <Link to="/productos" >
          Ver Productos
        </Link>
      </div>
    </section>
  );
}
