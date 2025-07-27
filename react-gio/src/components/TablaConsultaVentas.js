import React from "react";

const TablaConsultaVentas = ({
  ventas,
  paginaActual,
  totalPaginas,
  cambiarPagina,
  onSeleccionar,
}) => {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-dark table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Forma de Pago</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {ventas.length > 0 ? (
            ventas.map((v, i) => (
              <tr key={i}>
                <td>{v.id}</td>
                <td>{new Date(v.fechaVenta).toLocaleDateString()}</td>
                <td>${v.totalVenta}</td>
                <td>{v.formaDePago}</td>
                <td>
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => onSeleccionar(v)}
                  >
                    Ver
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No hay ventas registradas
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ✅ Paginación */}
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-secondary"
          onClick={() => cambiarPagina(paginaActual - 1)}
          disabled={paginaActual <= 0}
        >
          Anterior
        </button>
        <span>
          Página {paginaActual + 1} de {totalPaginas}
        </span>
        <button
          className="btn btn-secondary"
          onClick={() => cambiarPagina(paginaActual + 1)}
          disabled={paginaActual >= totalPaginas - 1}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default TablaConsultaVentas;


/*import React from 'react';

function TablaConsultaVentas({ ventas = [], paginaActual = 0, totalPaginas = 1, cambiarPagina, onSeleccionar }) {
  const listaVentas = Array.isArray(ventas) ? ventas : [];

  return (
    <div className="tabla-contenedor">
      <h3>Listado de Ventas</h3>

      {listaVentas.length === 0 ? (
        <p>No hay ventas registradas.</p>
      ) : (
        <table className="tabla">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Descuento</th>
              <th>Forma de Pago</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {listaVentas.map((venta) => (
              <tr key={venta.id}>
                <td>{venta.id}</td>
                <td>{new Date(venta.fechaVenta).toLocaleString()}</td>
                <td>
                  {venta.totalVenta
                    ? venta.totalVenta.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })
                    : '$0'}
                </td>
                <td>{venta.descuento || 0}%</td>
                <td>{venta.formaDePago || 'N/A'}</td>
                <td>
                  <button onClick={() => onSeleccionar && onSeleccionar(venta)}>Ver</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ✅ Paginación *//*}
      {totalPaginas > 1 && (
        <div className="paginacion">
          <button onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual <= 0}>
            ⬅ Anterior
          </button>
          <span>Página {paginaActual + 1} de {totalPaginas}</span>
          <button onClick={() => cambiarPagina(paginaActual + 1)} disabled={paginaActual + 1 >= totalPaginas}>
            Siguiente ➡
          </button>
        </div>
      )}
    </div>
  );
}

export default TablaConsultaVentas;*/