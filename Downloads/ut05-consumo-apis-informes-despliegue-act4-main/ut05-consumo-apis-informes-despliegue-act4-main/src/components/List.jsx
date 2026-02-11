/**
 * Renderiza una lista de productos como un conjunto de tarjetas.
 *
 * @component
 * @param {Object} props - El objeto de propiedades.
 * @param {Array} [props.items=[]] - Un array de productos para mostrar. Cada producto debe ser un objeto con las siguientes propiedades:
 * @param {string} props.items[].id - El identificador único del producto.
 * @param {string} props.items[].imagen - La URL de la imagen del producto.
 * @param {string} props.items[].nombre - El nombre del producto.
 * @param {number} props.items[].precio - El precio del producto.
 *
 * @returns {JSX.Element} Una lista de tarjetas de productos.
 */
/**
 * Renderiza una lista de productos como un conjunto de tarjetas.
 *
 * @component
 */
import "../assets/styles/index.css";
import { Link } from "react-router-dom";

export default function List({ lista = [], onDelete }) {
  
  if (!lista || lista.length === 0) return <p>No hay productos disponibles.</p>;

  return (
    <ul className="product-list" role="list">
      {lista.map((item) => (

        <li key={item.id}>
          <article className="product-card">
          <figure>
              <img 
                src={item.imagen} 
                alt={item.nombre} 
               
                onError={(e) => { 
                    e.target.onerror = null; 
                    e.target.src = 'https://via.placeholder.com/150'; 
                }}
              />
            </figure>
            <h3 className="product-name">{item.nombre}</h3>
            <p className="product-price">{item.precio} €</p>
            
            <div className="product-actions">
              <Link to={`/productos/${item.id}`}>
                <button>Ver</button>
              </Link>
              
              {onDelete && (
                  <button  className="btn-danger" onClick={() => onDelete(item.id)} > Borrar </button>
              )}
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
  