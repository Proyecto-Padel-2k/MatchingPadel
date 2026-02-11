import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCreateProducto } from '../hooks/useProductos'; 
import '../assets/styles/formulario.css'; 

const Admin = () => {
    const navigate = useNavigate();
    
    const { addProducto, loading, error } = useCreateProducto();

    const [form, setForm] = useState({
        name: '', description: '', price: '', category: 'Zumos', photo: ''
    });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

 
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
            
                setForm({ ...form, photo: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
    
        const exito = await addProducto(form);
        
        if (exito) {
            alert('Producto creado con éxito');
            navigate('/productos');
        }
    };

    return (
        <div className="form-container">
        <h2>Añadir Producto</h2>
        {error && <p style={{color:'red'}}>{error}</p>}
            <form onSubmit={handleSubmit}>
                
                <div className="form-group">
                    <label>Nombre del producto:</label>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Ej: Zumo de Naranja" 
                        value={form.name} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label>Descripción:</label>
                    <textarea 
                        name="description" 
                        placeholder="Breve descripción del producto" 
                        value={form.description} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label>Precio (€):</label>
                    <input 
                        type="number" 
                        name="price" 
                        placeholder="0.00" 
                        value={form.price} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

              <div className="form-group">
                    <label>Categoría:</label>
                    <select 
                        name="category" 
                        value={form.category} 
                        onChange={handleChange}
                        style={{width: '100%', padding: '0.6rem', marginTop: '0.3rem', borderRadius: '0.5rem', border: '1px solid var(--color-grey-4)'}}
                    >
                        <option value="Zumos">Zumos</option>
                        <option value="Frutas">Frutas</option>
                        <option value="Verduras">Verduras</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Imagen del producto:</label>
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageChange} 
                        required
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Guardando...' : 'Guardar Producto'}
                </button>
            </form>
        </div>
    );
};

export default Admin;