/**
 * Componente DetailPage
 * 
 * Este componente muestra los detalles de un producto específico basado en el parámetro `id`
 * de la URL. Muestra información del producto como nombre, precio, descripción, 
 * y opciones para cantidad, tamaño y unidad. Los usuarios pueden navegar de vuelta al catálogo, 
 * añadir el producto al carrito o comprarlo directamente.
 * 
 * @componente
 * @returns {JSX.Element} La página de detalles renderizada para un producto.
 * 
 * @ejemplo
 * // Ejemplo de uso en una ruta:
 * <Route path="/product/:id" element={<DetailPage />} />
 * 
 * @dependencias
 * - React: Para construir el componente.
 * - react-router-dom: Para acceder a los parámetros de la URL (`useParams`) y navegación (`useNavigate`).
 * - productos: Un array de datos de productos utilizado para encontrar el producto por ID.
 * - index.css: Estilos para el componente.
 * 
 * @funcionalidades
 * - Muestra detalles del producto incluyendo imagen, nombre, precio y descripción.
 * - Permite a los usuarios seleccionar opciones de cantidad, tamaño y unidad.
 * - Proporciona acciones para añadir el producto a favoritos, al carrito o comprarlo.
 * - Maneja la navegación de vuelta al catálogo.
 * - Muestra un mensaje de "Producto no encontrado" si el ID del producto no es válido.
 */


import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSingleProducto } from '../hooks/useProductos';
import "../assets/styles/index.css"; 

const DetailPage = () => {
    const { id } = useParams(); 
    const { producto, loading, error } = useSingleProducto(id);

    // Estados de carga y error con estilos inline simples para centrar
    if (loading) return <div style={{textAlign: 'center', marginTop: '5rem'}}>Cargando...</div>;
    if (error) return <div style={{textAlign: 'center', marginTop: '5rem', color: 'red'}}>Error: {error}</div>;
    if (!producto) return <div style={{textAlign: 'center', marginTop: '5rem'}}>Producto no encontrado</div>;

    return (
        <div className="layout-main"> {/* Usamos layout-main para centrar y dar márgenes */}
            <div className="detail-container">
                
                {/* 1. ENLACE ARREGLADO */}
                <Link to="/productos" className="detail-back">
                    <span>←</span> Volver al catálogo
                </Link>
                
                <article className="detail-card">
                    <div className="detail-image">
                        <img 
                            src={producto.imagen} 
                            alt={producto.nombre} 
                            onError={(e) => { 
                                e.target.onerror = null; 
                                e.target.src = 'https://via.placeholder.com/300'; 
                            }}
                        />
                    </div>
                    
                    <div className="detail-info">
                        <h1 className="detail-title">{producto.nombre}</h1>
                        
                        <div style={{marginBottom: '1rem'}}>
                            <span className="detail-discount">{producto.categoria}</span>
                        </div>

                        <p className="detail-description">{producto.descripcion}</p>
                        
                        <div className="detail-price">
                            <span className="detail-current">{producto.precio} €</span>
                        </div>
                        
                        <div className="detail-actions">
                           
                            <button className="product-actions">
                                Añadir al Carrito
                            </button>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
};

export default DetailPage;