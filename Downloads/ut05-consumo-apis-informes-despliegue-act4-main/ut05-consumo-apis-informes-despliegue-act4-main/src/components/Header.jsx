import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav.jsx';
import "../assets/styles/index.css";

/**
 * Componente Header
 * 
 * Este componente representa el encabezado global de la aplicación. Incluye
 * el logo/título y el menú de navegación principal.
 * 
 * @componente
 * @returns {JSX.Element} El componente de encabezado renderizado.
 * 
 * @example
 * // Ejemplo de uso:
 * <Header />
 * 
 * @notas
 * - El logo está envuelto en un componente `Link` para navegar a la página de inicio.
 * - El componente `Nav` se utiliza para renderizar el menú de navegación.
 * - El componente utiliza estilos de "index.css".
 */

export default function Header() {
  return (
    <header role="banner" className="header">
      <div className="header-container"> 
        {/* Logo / Título */}
        <Link to="/" className="header-logo" aria-label="Inicio - TerraBloom">
          <span>TerraBloom</span>
        </Link>

        <Nav /> 
      </div>
    </header>
  );
}