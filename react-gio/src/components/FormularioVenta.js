// src/components/FormularioVenta.js
import React from 'react';
import { formatearMiles } from '../utils/formato';

function FormularioVenta({ producto, setProducto, agregarProducto, dineroRecibido, setDineroRecibido, cambio }) {
  // Procesa el cambio en los inputs del producto
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Para campos numéricos, convierte el valor a número
    const processedValue = (name === 'cantidad' || name === 'descuento') ? Number(value) : value;
    setProducto({ ...producto, [name]: processedValue });
  };

  // Cálculo de total con descuento para el producto actual
  const totalConDescuento = (producto.precio * producto.cantidad - producto.descuento) || 0;

  return (
    <form>
      <div className="mb-3">
        <label className="form-label">Buscar Producto</label>
        <input type="text" className="form-control form-control-dark" name="buscar" placeholder="ID, Nombre o Código" />
      </div>

      <div className="d-flex align-items-end mb-3">
        <button type="button" className="btn btn-secondary w-50">Buscar</button>
        <button type="button" className="btn btn-info w-50 ms-2" onClick={agregarProducto}>Agregar</button>
      </div>

      <div className="bg-card-dark mb-3 shadow-sm">
        <h5 className="mb-3">Detalles del Producto</h5>
        <div className="row mb-3">
          <div className="col-md-4">
            <label>ID Producto</label>
            <input type="text" className="form-control form-control-dark" name="id" value={producto.id} readOnly />
          </div>
          <div className="col-md-4">
            <label>Nombre del Producto</label>
            <input type="text" className="form-control form-control-dark" name="nombre" value={producto.nombre} readOnly />
          </div>
          <div className="col-md-4">
            <label>Código de Barras</label>
            <input type="text" className="form-control form-control-dark" name="codigo" value={producto.codigo} readOnly />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label>Precio de Venta</label>
            {/* Visualiza el precio formateado */}
            <input type="text" className="form-control form-control-dark" name="precio" value={formatearMiles(producto.precio)} readOnly />
          </div>
          <div className="col-md-4">
            <label>Cantidad</label>
            <input type="number" className="form-control form-control-dark" name="cantidad" value={producto.cantidad} onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <label>Descuento en valor</label>
            <input type="number" className="form-control form-control-dark" name="descuento" value={producto.descuento} onChange={handleChange} />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label>Total con Descuento</label>
            <input type="text" className="form-control form-control-dark" value={formatearMiles(totalConDescuento)} readOnly />
          </div>
          <div className="col-md-6">
            <label>Dinero Recibido</label>
            <input
              type="number"
              className="form-control form-control-dark"
              name="dineroRecibido"
              value={dineroRecibido}
              onChange={e => setDineroRecibido(Number(e.target.value))}
            />
            <small className="form-text text-muted">
              {dineroRecibido ? formatearMiles(dineroRecibido) : 0} COP
            </small>
          </div>
        </div>
        <div className="mb-3">
          <label>Cambio a entregar</label>
          <input type="text" className="form-control form-control-dark" value={formatearMiles(cambio < 0 ? 0 : cambio)} readOnly />
        </div>
      </div>
    </form>
  );
}

export default FormularioVenta;
