// src/pages/ProductosPage.js

import React, { useState } from 'react';
import FormularioProducto from '../components/FormularioProducto'; // Componente para el formulario de productos
import TablaProductos from '../components/TablaProductos'; // Componente para mostrar productos en una tabla
import TablaProductosRegistrados from '../components/TablaProductosRegistrados'; // Componente para mostrar productos registrados
import { formatearMiles } from '../utils/formato'; // Utilidad para formatear números

function ProductosPage() {
  // Estado para manejar el producto actual en el formulario
  const [producto, setProducto] = useState({ codigoBarras: '', nombreProducto: '', precioVenta: '' });

  // Estado para manejar la lista de productos agregados
  const [productos, setProductos] = useState([]);

  // Estado para manejar la lista de productos registrados en el servidor
  const [productosRegistrados, setProductosRegistrados] = useState([]);

  // Estado para manejar mensajes de error o éxito
  const [mensaje, setMensaje] = useState('');

  // Función para agregar un producto a la lista
  const agregarProducto = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    const { codigoBarras, nombreProducto, precioVenta } = producto;

    // Validación: Verifica que todos los campos estén llenos
    if (!codigoBarras || !nombreProducto || !precioVenta) {
      setMensaje('⚠️ Todos los campos son obligatorios');
      return;
    }

    // Agrega el producto a la lista de productos
    setProductos([
      ...productos,
      { codigoBarras, nombreProducto, precioVenta: parseFloat(precioVenta) },
    ]);

    // Limpia el formulario y el mensaje
    setProducto({ codigoBarras: '', nombreProducto: '', precioVenta: '' });
    setMensaje('');
  };

  // Función para eliminar un producto de la lista
  const eliminarProducto = (index) => {
    const copia = [...productos]; // Crea una copia de la lista de productos
    copia.splice(index, 1); // Elimina el producto en el índice especificado
    setProductos(copia); // Actualiza el estado
  };

  // Función para registrar los productos en el servidor
  const registrarProductos = async () => {
    // Validación: Verifica que haya productos para registrar
    if (productos.length === 0) {
      setMensaje('⚠️ No hay productos para registrar');
      return;
    }

    try {
      // Realiza una solicitud POST al servidor con la lista de productos
      const res = await fetch('http://localhost:8080/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productos),
      });

      const data = await res.json(); // Obtiene la respuesta del servidor
      setMensaje('✅ Registro exitoso'); // Muestra un mensaje de éxito
      setProductos([]); // Limpia la lista de productos
      setProductosRegistrados(data); // Actualiza la lista de productos registrados
    } catch (error) {
      console.error('Error:', error); // Maneja errores en la consola
      setMensaje('❌ Error al registrar los productos'); // Muestra un mensaje de error
    }
  };

  return (
    <div className="container mt-2">
      {/* Título de la página */}
      <h5 className="text-center text-white mb-2">Registro de Productos</h5>

      {/* Formulario para agregar productos */}
      <FormularioProducto
        producto={producto}
        setProducto={setProducto}
        onAgregar={agregarProducto}
      />

      {/* Tabla para mostrar los productos agregados */}
      {productos.length > 0 && (
        <TablaProductos
          productos={productos}
          onEliminar={eliminarProducto}
          onRegistrar={registrarProductos}
          formatearMiles={formatearMiles}
        />
      )}

      {/* Mensaje de error o éxito */}
      {mensaje && <div className="text-center mt-3 text-info">{mensaje}</div>}

      {/* Tabla para mostrar los productos registrados */}
      {productosRegistrados.length > 0 && (
        <TablaProductosRegistrados
          productos={productosRegistrados}
          formatearMiles={formatearMiles}
        />
      )}
    </div>
  );
}

export default ProductosPage; // Exporta el componente para su uso en otras partes de la aplicación