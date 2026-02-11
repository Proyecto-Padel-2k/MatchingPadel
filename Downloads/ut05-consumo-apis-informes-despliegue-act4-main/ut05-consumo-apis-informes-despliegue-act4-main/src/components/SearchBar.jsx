import "../assets/styles/index.css";
/**
 * El componente SearchBar renderiza un campo de entrada estilizado para realizar búsquedas.
 *
 * @componente
 * @param {Object} props - El objeto de propiedades.
 * @param {string} props.searchTerm - El valor actual del campo de búsqueda.
 * @param {Function} props.onSearchChange - Función de callback para manejar los cambios en el campo de búsqueda.
 * @param {string} [props.placeholder="Buscar..."] - Texto de marcador de posición para el campo de búsqueda.
 *
 * @returns {JSX.Element} Un componente de barra de búsqueda estilizado.
 */

// src/components/SearchBar.jsx (o como se llame tu componente)
import React, { useState, useEffect } from 'react';
import useVoiceRecognition from '../hooks/useVoiceRecognition';
import iconMicro from '../assets/icons/microfono.png'; 
import "../assets/styles/index.css";
const SearchBar = ({ onSearchChange, searchTerm }) => {
  

  const { text, isListening, isSupported, startListening, hasError } = useVoiceRecognition();
  

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Cuando el hook nos devuelve texto, actualizamos la búsqueda principal
  useEffect(() => {
    if (text) {
      onSearchChange(text); // Esto filtra tus productos
    }
  }, [text, onSearchChange]);

  // --- LÓGICA DE Deslizar ---
  const minSwipeDistance = 50; // Mínima distancia en px para considerar swipe

  const onTouchStart = (e) => {
    setTouchEnd(null); // Reseteamos
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    //  "Desliza -> para buscar" 
    if (isRightSwipe) {
      if (isSupported) {
        startListening(); // ACTIVAMOS VOZ POR GESTO
      } else {
        alert("Tu navegador no soporta búsqueda por voz");
      }
    }
  };

  return (
    <div className="search-container-wrapper">
      
      {/* Contenedor que escucha los eventos táctiles */}
      <div 
        className={`search-bar-container ${isListening ? 'listening-mode' : ''}`}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <input 
          type="text" 
          placeholder={isListening ? "Escuchando..." : "Buscar productos..."}
          value={isListening ? text : searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />

        {/* Botón de micrófono para ESCRITORIO */}
        {isSupported && (
          <button 
            className={`mic-button ${isListening ? 'active' : ''}`}
            onClick={startListening}
            title="Buscar por voz"
          >
           <img 
                src={iconMicro} 
                alt="Micrófono" 
                style={{ width: '24px', height: '24px' }} 
            />
          </button>
        )}
      </div>

      {/* Mensaje de ayuda visual para MÓVIL  */}
      <div className="mobile-hint">
        {isListening 
          ? <span className="listening-text">Escuchando... di el nombre del producto</span>
          : <span>Desliza el buscador 👉 para hablar</span>
        }
      </div>

      {hasError && <p className="error-text">Error: No te he entendido bien</p>}
    </div>
  );
};

export default SearchBar;