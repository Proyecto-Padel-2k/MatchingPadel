/**
 * Componente FormularioControlado
 * 
 * Este componente renderiza un formulario controlado para añadir un nuevo producto. Incluye campos para
 * el nombre del producto, precio, descripción y ruta de la imagen. El formulario valida la entrada del usuario
 * y muestra mensajes de error para los campos inválidos. Tras una validación exitosa, los datos del producto
 * se registran y el formulario se reinicia.
 * 
 * @componente
 * 
 * @returns {JSX.Element} El componente del formulario renderizado.
 * 
 * @example
 * <FormularioControlado />
 * 
 * @descripción
 * - El formulario utiliza el hook `useState` para gestionar los datos del formulario y los errores de validación.
 * - Reglas de validación:
 *   - `nombre`: Obligatorio, mínimo 3 caracteres.
 *   - `precio`: Obligatorio, debe ser un número positivo.
 *   - `descripcion`: Obligatorio, mínimo 10 caracteres.
 *   - `imagen`: Obligatorio, no debe estar vacío.
 * - En caso de envío exitoso, los datos del formulario se registran y el formulario se limpia.
 */
import { useState } from "react";
import "../assets/styles/formulario.css";

export default function FormularioControlado() {
 // Estado único para agrupar campos del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    imagen: "",
  });

  const [errors, setErrors] = useState({});
// Handler genérico para inputs
  function handleChange(e) {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  }

  const validate = (data) => {
    const errs = {};
    let esValido = true;
  // Validaciones simples y mensajes de error
    if (!data.nombre || data.nombre.trim().length < 3) {
      errs.nombre = "El nombre es obligatorio (mín. 3 letras).";
      esValido = false;
    }

    if (!data.precio || isNaN(data.precio) || Number(data.precio) <= 0) {
      errs.precio = "El precio debe ser un número positivo.";
      esValido = false;
    }

    if (!data.descripcion || data.descripcion.trim().length < 10) {
      errs.descripcion = "La descripción debe tener al menos 10 caracteres.";
      esValido = false;
    }

    if (!data.imagen || data.imagen.trim().length === 0) {
      errs.imagen = "Debes indicar la ruta de la imagen.";
      esValido = false;
    }

    return { errs, esValido };
  };

  function handleSubmit(e) {
    e.preventDefault(); // Evitamos recarga del navegador

    const { errs, esValido } = validate(formData);
    setErrors(errs);

    if (!esValido) return;

    const nuevoProducto = {
      ...formData,
      precio: Number(formData.precio),
      id: Date.now(), // La fecha (en milisegundos) se usa porque siempre cambia, así sirve como id único
    };

    console.log("Producto válido para guardar:", nuevoProducto);
    alert("Producto guardado correctamente ");

    setFormData({ nombre: "", precio: "", descripcion: "", imagen: "" });
  }

  return (
    <div className="form-container">
      <h2>Añadir Nuevo Producto</h2>
  
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre del producto</label>
          <input
            id="nombre"
            type="text"
            value={formData.nombre}
            onChange={handleChange}
          />
          {/* En caso error muestro mensaje */}
          {errors.nombre && <p>{errors.nombre}</p>}
        </div>
  
        <div>
          <label htmlFor="precio">Precio (€)</label>
          <input
            id="precio"
            type="number"
            step="0.01"
            value={formData.precio}
            onChange={handleChange}
          />
          {errors.precio && <p>{errors.precio}</p>}
        </div>
  
        <div>
          <label htmlFor="imagen">Ruta de la imagen</label>
          <input
            id="imagen"
            type="text"
            value={formData.imagen}
            onChange={handleChange}
          />
          {errors.imagen && <p>{errors.imagen}</p>}
        </div>
  
        <div>
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            rows="3"
            value={formData.descripcion}
            onChange={handleChange}
          />
          {errors.descripcion && <p>{errors.descripcion}</p>}
        </div>
  
        <button type="submit">Guardar Producto</button>
      </form>

    </div>
    
  );
  
}
