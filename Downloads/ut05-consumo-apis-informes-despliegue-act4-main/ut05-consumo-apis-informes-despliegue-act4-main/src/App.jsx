/**
 * Componente Raíz y Configuración de Enrutamiento.
 * * Define la arquitectura de navegación de DOM.
 * Gestiona redirecciones y rutas comodín para errores 404.
 * * @component
 */
import { Routes, Route } from 'react-router-dom';
import Contenedor from './components/Contenedor';

// Importación de páginas
import HomePage from './pages/HomePage';
import ProductosPage from "./pages/ProductosPages"; // Ojo, revisa si el archivo se llama Page o Pages
import DetailPage from './pages/DetailPage';
import ErrorPage from './pages/ErrorPage';
import Admin from './pages/Admin';
import FormularioControlado from './pages/FormularioControlado';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route element={<Contenedor />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/productos' element={<ProductosPage />} />
        <Route path='/productos/:id' element={<DetailPage />} />
        
        <Route path='/login' element={<LoginPage />} />
      </Route>

      {/* Rutas Privadas */}
      <Route path="/admin" element={<PrivateRoute />}>
        <Route element={<Contenedor />}>
          <Route index element={<Admin />} />
          <Route path="formulario" element={<FormularioControlado />} />
        </Route>
      </Route>

      <Route path='*' element={<Contenedor><ErrorPage /></Contenedor>} />
    </Routes>
  );
}

export default App;