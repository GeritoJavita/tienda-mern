import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [editingProductId, setEditingProductId] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error al obtener productos', error);
      }
    };
    fetchProducts();
  }, []);

  const handleCreateOrUpdate = async () => {
    if (editingProductId) {
      // Actualizar producto
      try {
        await axios.put(
          `http://localhost:5000/api/products/${editingProductId}`,
          { name, price, description },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert('Producto actualizado con éxito');
        setEditingProductId(null); // Resetear el ID del producto que se está editando
      } catch (error) {
        console.error('Error al actualizar producto', error);
      }
    } else {
      // Crear producto nuevo
      try {
        const response = await axios.post(
          'http://localhost:5000/api/products',
          { name, price, description },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProducts([...products, response.data]); // Añadir el nuevo producto a la lista
        alert('Producto creado con éxito');
      } catch (error) {
        console.error('Error al crear producto', error);
      }
    }

    // Resetear los campos del formulario
    setName('');
    setPrice('');
    setDescription('');
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((product) => product._id !== id)); // Eliminar el producto de la lista
      alert('Producto eliminado con éxito');
    } catch (error) {
      console.error('Error al eliminar producto', error);
    }
  };

  const handleEdit = (product) => {
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setEditingProductId(product._id);
  };

  return (
    <div>
      <h2>Productos</h2>
      <div>
        <input
          type="text"
          placeholder="Nombre del producto"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleCreateOrUpdate}>
          {editingProductId ? 'Actualizar Producto' : 'Crear Producto'}
        </button>
      </div>

      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <p>
              {product.name} - ${product.price} <br />
              {product.description}
            </p>
            <button onClick={() => handleEdit(product)}>Editar</button>
            <button onClick={() => handleDelete(product._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
