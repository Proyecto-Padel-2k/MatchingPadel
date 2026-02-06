import express from 'express';
import multer from 'multer';
import fs from 'fs';
import Producto from '../models/Producto.js'; // Importamos el modelo

// 1. CONFIGURACIÓN DE MULTER (Subida de imágenes)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = 'public/imagenes/';
    // Si la carpeta no existe, la crea
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    // Nombre único: fecha + nombre original
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });
const productRouter = express.Router();

// ------------------------------------------------
// RUTAS (Ahora son async/await porque MongoDB tarda unos milisegundos)
// ------------------------------------------------

// POST: Crear producto (Con subida de foto)
productRouter.post('/', upload.single('photo'), async (req, res) => {
  try {
    const { name, description, category, price } = req.body;
    
    // Construir ruta de la imagen si existe
    let photoUrl = '';
    if (req.file) {
      photoUrl = `/imagenes/${req.file.filename}`;
    }

    // Crear objeto para MongoDB
    const newProducto = new Producto({
      name,
      description,
      category,
      price, 
      photo: photoUrl
    });

    // Guardar en Base de Datos
    const savedProducto = await newProducto.save();

    res.status(201).json({
      message: 'Producto añadido con éxito',
      data: savedProducto,      // Para tu frontend actual
      savedProducto: savedProducto // Por si acaso
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al guardar producto', error: error.message });
  }
});

// GET: Obtener todos
productRouter.get('/', async (req, res) => {
  try {
    const productos = await Producto.find(); // Busca todo en Mongo
    res.json({
      message: 'Lista de productos',
      data: productos
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos' });
  }
});

// GET: Obtener por ID
productRouter.get('/:id', async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    // Mantenemos tu estructura de respuesta:
    res.json(producto); 
  } catch (error) {
    res.status(500).json({ message: 'Error buscando producto (ID inválido)' });
  }
});

// DELETE: Eliminar
productRouter.delete('/:id', async (req, res) => {
  try {
    const deleted = await Producto.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado', data: deleted });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar' });
  }
});

export default productRouter;