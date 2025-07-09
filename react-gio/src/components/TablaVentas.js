import React from 'react';


function TablaVentas({ ventas, pagina, totalPaginas, onPaginar, handleEditar }) {
  return (
    <div className="bg-card-dark p-3 rounded text-white mb-4">
      <h5>Ventas</h5>
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Forma de Pago</th>
            <th>Detalles</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((venta) => (
            <tr key={venta.id}>
              <td>{venta.id}</td>
              <td>{new Date(venta.fechaVenta).toLocaleDateString()}</td>
              <td>${venta.totalVenta.toFixed(2)}</td>
              <td>{venta.formaDePago}</td>
              <td>
                <ul className="mb-0">
                  {venta.detalles.map((d, i) => (
                    <li key={i}>
                      {d.nombreProducto} - Cant: {d.cantidad} - ${d.precioUnitario.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav className="mt-3">
        <ul className="pagination justify-content-center">
          {pagina > 0 && (
            <li className="page-item">
              <button className="page-link" onClick={() => onPaginar(pagina - 1)}>Anterior</button>
            </li>
          )}
          {[...Array(totalPaginas)].map((_, i) => (
            <li key={i} className={`page-item ${i === pagina ? 'active' : ''}`}>
              <button className="page-link" onClick={() => onPaginar(i)}>{i + 1}</button>
            </li>
          ))}
          {pagina < totalPaginas - 1 && (
            <li className="page-item">
              <button className="page-link" onClick={() => onPaginar(pagina + 1)}>Siguiente</button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default TablaVentas;
