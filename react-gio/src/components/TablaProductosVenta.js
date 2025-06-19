// src/components/TablaProductosVenta.js
import React from 'react';
import { formatearMiles } from '../utils/formato';

function TablaProductosVenta({ 
  productos, 
  eliminarProducto, 
  formaDePago, 
  setFormaDePago, 
  totalVenta, 
  registrarVenta,
  setMensaje,
  setTipoMensaje,
  dineroRecibido
}) {
  return (
    <div className="bg-card-dark shadow-sm p-3 rounded">
      <h5 className="text-center mb-3">Detalles de la Venta</h5>

      <div className="table-responsive mb-3">
        <table className="table table-bordered table-dark table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Código</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Descuento</th>
              <th>Subtotal</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p, index) => {
              const subtotal = p.precio * p.cantidad * (1 - (p.descuento || 0) / 100);
              return (
                <tr key={index}>
                  <td>{p.id}</td>
                  <td>{p.nombre}</td>
                  <td>{p.codigo}</td>
                  <td>{formatearMiles(p.precio)}</td>
                  <td>{p.cantidad}</td>
                  <td>${formatearMiles(p.descuento ?? 0)}</td>
                  <td>{formatearMiles(subtotal)}</td>
                  <td>
                    <button className="btn btn-sm btn-danger" onClick={() => eliminarProducto(index)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mb-3">
        <label htmlFor='formaDePago' className="form-label">Forma de Pago</label>
        <select
          className="form-select"
          id='formaDePago'
          name='formaDePago'
          value={formaDePago}
          onChange={e => setFormaDePago(e.target.value)}
        >
          <option value="Efectivo">Efectivo</option>
          <option value="Nequi">Nequi</option>
          <option value="Daviplata">Daviplata</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor='totalVenta' className="form-label">Total de la Venta</label>
        <input
          type="text"
          id="totalVenta"
          name="totalVenta"
          className="form-control"
          value={formatearMiles(totalVenta)}
          readOnly
        />
      </div>

      <button
        className="btn btn-primary w-100"
        onClick={() => {
          if (dineroRecibido < totalVenta) {
            setTipoMensaje("danger");
            setMensaje("❌ El dinero recibido es menor al total.");
          } else {
            registrarVenta();
          }
        }}
      >
        Registrar Venta
      </button>

      <div id="mensaje" className="mt-3"></div>
    </div>
  );
}

export default TablaProductosVenta;

/*
import React from "react";

function TablaProductosVenta(props) {
  const {
    productos,
    eliminarProducto,
    formaDePago,
    setFormaDePago,
    totalVenta,
    registrarVenta,
  } = props;

  return React.createElement("div", { className: "card p-4" },
    React.createElement("h4", null, "Productos agregados"),
    React.createElement("table", { className: "table table-bordered" },
      React.createElement("thead", null,
        React.createElement("tr", null,
          ["Nombre", "Precio", "Cantidad", "Descuento", "Subtotal", "Eliminar"].map((th, i) =>
            React.createElement("th", { key: i }, th)
          )
        )
      ),
      React.createElement("tbody", null,
        productos.map((producto, i) =>
          React.createElement("tr", { key: i },
            React.createElement("td", null, producto.nombre),
            React.createElement("td", null, `$${producto.precio}`),
            React.createElement("td", null, producto.cantidad),
            React.createElement("td", null, `${producto.descuento}%`),
            React.createElement("td", null,
              `$${(producto.precio * producto.cantidad * (1 - producto.descuento / 100)).toFixed(2)}`
            ),
            React.createElement("td", null,
              React.createElement("button", {
                className: "btn btn-danger btn-sm",
                onClick: () => eliminarProducto(i)
              }, "Eliminar")
            )
          )
        )
      )
    ),
    React.createElement("div", { className: "mb-3" },
      React.createElement("label", null, "Forma de Pago"),
      React.createElement("select", {
        className: "form-select",
        value: formaDePago,
        onChange: (e) => setFormaDePago(e.target.value)
      },
        React.createElement("option", null, "Efectivo"),
        React.createElement("option", null, "Tarjeta"),
        React.createElement("option", null, "Transferencia")
      )
    ),
    React.createElement("div", { className: "text-end mb-2" },
      React.createElement("strong", null, `Total: $${totalVenta.toFixed(2)}`)
    ),
    React.createElement("button", {
      className: "btn btn-primary w-100",
      onClick: registrarVenta
    }, "Registrar Venta")
  );
}

export default TablaProductosVenta;



/*
// src/components/TablaProductosVenta.js
import React from 'react';
import { formatearMiles } from '../utils/formato';

function TablaProductosVenta({ 
  productos, 
  eliminarProducto, 
  formaDePago, 
  setFormaDePago, 
  totalVenta, 
  registrarVenta,
  setMensaje,
  setTipoMensaje,
}) {
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

      <button
        className="btn btn-primary w-100"
        onClick={() => {
          if (dineroRecibido < totalVenta) {
            setTipoMensaje("danger");
            setMensaje("❌ El dinero recibido es menor al total.");
          } else {
            registrarVenta(); // esto ya hace el POST
          }
        }}
      >
        Registrar Venta
      </button>

      <div id="mensaje" className="mt-3"></div>
    </div>
  );
}

export default TablaProductosVenta;
*/
