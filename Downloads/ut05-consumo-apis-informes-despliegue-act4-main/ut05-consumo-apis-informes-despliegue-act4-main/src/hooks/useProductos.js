import { useState, useEffect, useRef } from "react";
import { getAllProducts, createProduct, getProductById, deleteProduct } from "../services/productoService";

// ---------------------------------------------
// Hook 1: Obtener lista de productos 
// ---------------------------------------------
export const useProductos = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const products = await getAllProducts();
        setData(products);
      } catch (err) {
        setError(err.message);
        setData([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const removeProducto = async (id) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este producto?")) return;

    try {
        await deleteProduct(id);
        setData((prevData) => prevData.filter((item) => item.id !== id));
        alert("Producto eliminado correctamente");
    } catch (err) {
        alert("Error al eliminar: " + err.message);
    }
  };

  return { data, loading, error, removeProducto };
};

// ---------------------------------------------
// Hook 2: Crear producto 
// ---------------------------------------------
export const useCreateProducto = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addProducto = async (productData) => {
    try {
      setLoading(true);
      setError(null);
      await createProduct(productData);
      return true; // Éxito
    } catch (err) {
      setError(err.message || "No se pudo guardar el producto");
      return false; // Fallo
    } finally {
      setLoading(false);
    }
  };

  return { addProducto, loading, error };
};

// ---------------------------------------------
// Hook 3: Obtener un solo producto (Aquí sobraba removeProducto)
// ---------------------------------------------
export const useSingleProducto = (id) => {
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        const fetchProducto = async () => {
            try {
                setLoading(true);
                const data = await getProductById(id);
                setProducto(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducto();
    }, [id]);

    return { producto, loading, error };
};