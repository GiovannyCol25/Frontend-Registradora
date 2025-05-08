// src/components/FormularioProducto.js
import React from 'react';

function FormularioProducto({ producto, setProducto, onAgregar }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  return (
    <form className="bg-card-dark shadow-sm p-4 rounded mb-4" onSubmit={onAgregar}>
      <div className="mb-3">
        <label className="form-label text-white">Código de Barras</label>
        <input
          type="text"
          name="codigoBarras"
          value={producto.codigoBarras}
          onChange={handleChange}
          className="form-control form-control-dark"
          placeholder="Ingrese el código de barras"
        />
      </div>

      <div className="mb-3">
        <label className="form-label text-white">Nombre del Producto</label>
        <input
          type="text"
          name="nombreProducto"
          value={producto.nombreProducto}
          onChange={handleChange}
          className="form-control form-control-dark"
          placeholder="Ingrese el nombre"
        />
      </div>

      <div className="mb-4">
        <label className="form-label text-white">Precio de Venta</label>
        <input
          type="number"
          name="precioVenta"
          value={producto.precioVenta}
          onChange={handleChange}
          className="form-control form-control-dark"
          placeholder="Ingrese el precio"
        />
      </div>

      <button type="submit" className="btn btn-info w-100">Añadir Producto</button>
    </form>
  );
}

export default FormularioProducto;
