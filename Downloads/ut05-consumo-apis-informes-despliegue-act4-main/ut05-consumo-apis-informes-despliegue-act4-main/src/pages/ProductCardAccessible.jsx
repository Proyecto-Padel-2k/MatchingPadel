/**
 * El componente ProductCardAccessible renderiza una tarjeta de producto accesible con una imagen, 
 * nombre, precio y un enlace a los detalles del producto. También resalta los productos destacados.
 *
 * @componente
 * @param {Object} props - El objeto de propiedades.
 * @param {string} props.imagen - La URL de la imagen del producto.
 * @param {string} props.nombre - El nombre del producto.
 * @param {string} props.precio - El precio del producto.
 * @param {string} props.link - La URL a la página de detalles del producto.
 * @param {boolean} [props.isFeatured=false] - Indica si el producto es destacado.
 *
 * @returns {JSX.Element} Un componente de tarjeta de producto.
 */
import React from 'react';
import { Link } from 'react-router-dom';

function ProductCardAccessible({ imagen, nombre, precio, link, isFeatured = false }) {

  return (
 
    <Link 
      to={link}
      className="card-link-wrapper"
      aria-label={`${nombre}, precio ${precio}. ${isFeatured ? 'Producto destacado.' : ''} Ver detalles`}
    >
      <article
        className="flex flex-col items-start gap-3 p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
      >
        
        {/* Imagen del producto */}
        <figure className="w-full aspect-square rounded-lg bg-gray-100 overflow-hidden">
          <img
            src={imagen}
            alt={`Imagen de ${nombre} fresco`} 
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </figure>

        <header className="w-full">
          {/* Título del producto. Usamos <h2> dentro de <article> */}
          <h2
            className={`text-lg font-semibold ${
              isFeatured ? "text-red-600" : "text-gray-800"
            }`}
          >
            <strong>{nombre}</strong>
            {isFeatured && <em className="text-sm"> – Destacado</em>}
          </h2>
        </header>
        
        {/* Precio */}
        <p className="text-xl font-bold text-green-700 mt-[-8px]">
          {precio}
        </p>

      </article>
    </Link>

  );
}

export default ProductCardAccessible;