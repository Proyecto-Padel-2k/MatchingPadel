import { Outlet } from "react-router-dom";
import Header from "./Header"; 
import Footer from "./Footer"; 
import "../assets/styles/index.css";

/**
 * Componente funcional que actúa como el layout principal de la aplicación.
 * Define la estructura semántica común (Header, Main, Footer).
 *
 * @component
 * @param {Object} props - Las propiedades del componente.
 * @param {string} [props.titulo] - Título opcional que se mostrará como h1.
 * @returns {JSX.Element} El contenedor renderizado.
 */
function Contenedor({ titulo }) {
  return (
    <div className="layout-contenedor">
      <Header />

     {/*- role="main" define la región principal para lectores de pantalla.
          - tabIndex="-1" permite que el foco se mueva aquí programáticamente
           sin entrar en la secuencia natural del tabulador.
          */}
      <main id="main-content" role="main" tabIndex="-1" className="layout-main">
       
       {/* Vinculamos la sección con su título para mejorar la semántica */}
        <section aria-labelledby="main-section-title" className="layout-section">
          {titulo && <h1 id="main-section-title" className="layout-titulo">{titulo}</h1>}
          <Outlet />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Contenedor;
