import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose'; // Importamos mongoose
import productosRoutes from './routes/productos.js';

const app = express();
const PORT = process.env.PORT || 5000;

// --- CONEXIÓN A MONGODB ---
// Si no hay variable en .env, usa una local por defecto
const MONGO_URI = process.env.MONGO_URI; // Render leerá esto automáticamente

mongoose.connect(MONGO_URI)
  .then(() => console.log('Conectado a Mongo'))
  .catch(err => console.log('Error Mongo:', err));
// --------------------------

// Middlewares
app.use(cors()); // Acepta peticiones de cualquier origen (React)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ¡IMPORTANTE! Hacer pública la carpeta de imágenes para que el navegador las pueda ver
app.use(express.static('public')); 

// Rutas
app.use('/productos', productosRoutes);

app.get('/', (req, res) => {
  res.send('Servidor funcionando 🚀');
});

// Exportamos app (sin el listen, es mejor hacerlo en main o aquí mismo, pero para seguir tu estructura:)
export default app;