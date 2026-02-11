import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const { login } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = () => {
        login(); 
        navigate('/admin'); 
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h2>Acceso Administrativo</h2>
            <p>Haz clic para entrar al panel de control.</p>
            <button 
                onClick={handleLogin}
                className="product-actions" 
            >
                Iniciar Sesión
            </button>
        </div>
    );
}