import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, default: 'General' },
  photo: { type: String } // Aquí guardaremos la ruta de la imagen (ej: /imagenes/foto.png)
}, {
  timestamps: true, // Crea automáticamente campos de fecha de creación y actualización
  versionKey: false // Elimina el campo "__v" interno de mongo
});

export default mongoose.model('Producto', productoSchema);