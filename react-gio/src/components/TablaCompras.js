import React from "react";
import { formatearMiles } from "../utils/formato";

function TablaCompras({ compras, eliminarCompra, pagina, totalPaginas, onPaginar }) {
    return (
        <div className="bg-card-dark p-3 rounded text-white mb-4">
        <h5>Productos agregados a la Compra</h5>
        <table className="table table-dark table-striped">
            <thead>
            <tr>
                <th>ID</th>
                <th>Código</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            {/* Aquí se renderizarían las compras */}
            {compras.map((compra) => (
                <tr key={compra.id}>
                    <td>{compra.id}</td>
                    <td>{compra.codigoBarras}</td>
                    <td>{compra.nombreProducto}</td>
                    <td>${formatearMiles(compra.precioCompra)}</td>
                    <td>{compra.cantidad}</td>
                    <td>${formatearMiles(compra.precioCompra * compra.cantidad).toFixed(2)}</td>
                    <td>
                        <button
                            className="btn btn-sm btn-danger"
                            onClick={() => eliminarCompra(compra.id)}
                        >
                            Eliminar
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>

        <nav className="mt-3">
            <ul className="pagination justify-content-center">0.
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

export default TablaCompras;