// src/pages/VentasPage.js

import React, { useState } from 'react';
import FormularioVenta from '../components/FormularioVenta'; // Componente para el formulario de ventas
import TablaProductosVenta from '../components/TablaProductosVenta'; // Componente para mostrar los productos agregados a la venta

function VentasPage() {
  // Estado para manejar el producto actual que se está agregando a la venta
  const [productoActual, setProductoActual] = useState({
    id: '',
    nombre: '',
    codigo: '',
    precio: 0,
    cantidad: 1,
    descuento: 0,
  });

  // Estado para manejar la lista de productos agregados a la venta
  const [productosAgregados, setProductosAgregados] = useState([]);

  // Estado para manejar el dinero recibido del cliente
  const [dineroRecibido, setDineroRecibido] = useState(0);

  // Estado para manejar la forma de pago seleccionada
  const [formaDePago, setFormaDePago] = useState('Efectivo');

  // Función para agregar un producto a la lista de productos de la venta
  const agregarProducto = () => {
    // Calcula el total del producto considerando cantidad y descuento
    const total = (productoActual.precio * productoActual.cantidad) - productoActual.descuento;

    // Crea un nuevo producto con el total calculado
    const nuevoProducto = { ...productoActual, total };

    // Agrega el nuevo producto a la lista de productos
    setProductosAgregados([...productosAgregados, nuevoProducto]);

    // Resetea parcialmente el estado del producto actual
    setProductoActual({ ...productoActual, cantidad: 1, descuento: 0 });
  };

  /*
  const consultarProducto = (producto) => {
    // Actualiza el estado del producto actual con los datos del producto consultado
    setProductoActual({
      id: producto.id,
      nombre: producto.nombre,
      codigo: producto.codigo,
      precio: producto.precio,
      cantidad: 1,
      descuento: 0,
    });
  }
  */


  // Función para eliminar un producto de la lista de productos de la venta
  const eliminarProducto = (index) => {
    const copia = [...productosAgregados]; // Crea una copia de la lista de productos
    copia.splice(index, 1); // Elimina el producto en el índice especificado
    setProductosAgregados(copia); // Actualiza el estado con la lista modificada
  };

  // Calcula el total de la venta sumando los totales de todos los productos
  const totalVenta = productosAgregados.reduce((acc, p) => acc + p.total, 0);

  // Calcula el cambio a devolver al cliente
  const cambio = dineroRecibido - totalVenta;

  return (
    <div className="container mt-2">
      {/* Título de la página */}
      <h5 className="text-center mb-2">Registro de Ventas</h5>

      <div className="row">
        {/* Columna izquierda: Formulario para agregar productos */}
        <div className="col-md-6">
          <FormularioVenta
            producto={productoActual}
            setProducto={setProductoActual}
            agregarProducto={agregarProducto}
            dineroRecibido={dineroRecibido}
            setDineroRecibido={setDineroRecibido}
            cambio={cambio}
            totalVenta={totalVenta}
          />
        </div>

        {/* Columna derecha: Tabla para mostrar los productos agregados */}
        <div className="col-md-6">
          <TablaProductosVenta
            productos={productosAgregados}
            eliminarProducto={eliminarProducto}
            formaDePago={formaDePago}
            setFormaDePago={setFormaDePago}
            totalVenta={totalVenta}
          />
        </div>
      </div>
    </div>
  );
}

export default VentasPage; // Exporta el componente para su uso en otras partes de la aplicación