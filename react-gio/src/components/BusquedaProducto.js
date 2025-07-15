import React, { useState } from 'react';

function BusquedaProducto({ onBuscar, onListarVentas, onConsultarPorProducto }) {
  const [busqueda, setBusqueda] = useState('');

  const handleBuscar = (e) => {
    e.preventDefault();
    if (busqueda.trim()) {
      onBuscar(busqueda.trim());
    }
  };

  return (
    <form onSubmit={handleBuscar} className="bg-card-dark p-3 rounded mb-4">
      <div className="mb-3">
        <label
          htmlFor='busquedaProducto'
          className="form-label text-white">Buscar Producto</label>
        <input
          type="text"
          id='busquedaProducto'
          name='busquedaProducto'
          className="form-control form-control-dark"
          placeholder="ID, Nombre o Código de Barras"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>
      <div className="d-flex flex-column gap-2">
        <button className="btn btn-info" type="submit">Consultar Productos</button>
        <button className="btn btn-primary" type="button" onClick={() => onListarVentas(0)}>Listar Ventas</button>
        <button className="btn btn-secondary" type="button" onClick={() => onConsultarPorProducto(busqueda)}>Ventas por Producto</button>
      </div>
    </form>
  );
}

export default BusquedaProducto;
