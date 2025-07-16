import React, { useState } from 'react';

function ConsultaProducto() {
  const [query, setQuery] = useState('');
  const [producto, setProducto] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const buscarProducto = async () => {
    try {
      const API = 'http://localhost:8080/productos';
      let url = !isNaN(query)
        ? `${API}/${query}`
        : `${API}/nombre/${query}`;

      let res = await fetch(url);
      if (!res.ok && !isNaN(query)) {
        url = `${API}/codigoBarras/${query}`;
        res = await fetch(url);
      }

      if (!res.ok) throw new Error('Producto no encontrado');
      const data = await res.json();
      setProducto(Array.isArray(data) ? data[0] : data);
      setMensaje('');
    } catch (error) {
      setMensaje(error.message);
      setProducto(null);
    }
  };

  return (
    <div className="bg-card-dark p-3 rounded text-white shadow-sm">
      <h5>Consultar Producto</h5>
      <div className="d-flex gap-2 mb-3">
        <input
            htmlFor='consultaProducto'
            type="text"
            id='consultaProducto'
            name='consultaProducto'
            className="form-control form-control-dark"
            placeholder="ID, nombre o código de barras"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-primary" onClick={buscarProducto}>Buscar</button>
      </div>
      {mensaje && <div className="alert alert-warning">{mensaje}</div>}
      {producto && (
        <div className="bg-secondary p-3 rounded text-white">
          <p><strong>ID:</strong> {producto.id}</p>
          <p><strong>Nombre:</strong> {producto.nombreProducto}</p>
          <p><strong>Código:</strong> {producto.codigoBarras}</p>
          <p><strong>Precio:</strong> ${producto.precioVenta}</p>
        </div>
      )}
    </div>
  );
}

export default ConsultaProducto;