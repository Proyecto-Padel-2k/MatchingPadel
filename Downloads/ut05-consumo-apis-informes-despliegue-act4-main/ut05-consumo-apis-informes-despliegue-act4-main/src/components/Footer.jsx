import "../assets/styles/index.css";

/**
 * Componente Footer que renderiza la sección de pie de página de la aplicación.
 * 
 * @componente
 * @returns {JSX.Element} El elemento de pie de página renderizado que contiene:
 * - Una imagen del logo.
 * - Una lista de enlaces de navegación.
 * - Información de derechos de autor.
 * 
 * @example
 * <Footer />
 */
export default function Footer() {
  return (
    <footer role="contentinfo" className="footer">
      <div className="footer-container">
        {/* Sección de Marca */}
        <div>
          <img src="/public/imagenes/logo.png" alt="TerraBloom Logo" />
        </div>
        {/* Sección de Enlaces */}
        <div>
          <h4>Enlaces</h4>
          <ul>
            <li><a href="#">Sobre nosotros</a></li>
            <li><a href="#">Envíos</a></li>
          </ul>
        </div>
        {/* Sección de Derechos */}
        <div>
          <p>2025 TerraBloom. AbdelMoghit Samini</p>
        </div>
      </div>
    </footer>
  );
}
