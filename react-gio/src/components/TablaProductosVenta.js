// src/components/TablaProductosVenta.js
import React from 'react';
import { formatearMiles } from '../utils/formato';

function TablaProductosVenta({ productos, eliminarProducto, formaDePago, setFormaDePago, totalVenta }) {
  return (
    <div className="bg-card-dark shadow-sm">
      <h5 className="text-center">Detalles de la Venta</h5>
      <div className="table-responsive mb-3">
        <table className="table table-bordered table-dark table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Código</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Total</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p, index) => (
              <tr key={index}>
                <td>{p.id}</td>
                <td>{p.nombre}</td>
                <td>{p.codigo}</td>
                <td>{formatearMiles(p.precio)}</td>
                <td>{p.cantidad}</td>
                <td>{formatearMiles(p.total)}</td>
                <td>
                  <button className="btn btn-sm btn-danger" onClick={() => eliminarProducto(index)}>
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-3">
        <label className="form-label">Forma de Pago</label>
        <select
          className="form-select form-select-dark"
          value={formaDePago}
          onChange={e => setFormaDePago(e.target.value)}
        >
          <option value="Efectivo">Efectivo</option>
          <option value="Nequi">Nequi</option>
          <option value="Daviplata">Daviplata</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Total de la Venta</label>
        <input type="text" className="form-control" value={formatearMiles(totalVenta)} readOnly />
      </div>

      <button className="btn btn-primary w-100">Registrar Venta</button>
      <div id="mensaje" className="mt-3"></div>
    </div>
  );
}

export default TablaProductosVenta;
