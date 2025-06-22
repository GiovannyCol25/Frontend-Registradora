import React from "react";

function TablaClientes({ clientes, eliminarCliente, editarCliente, registrarCliente, onRegistrar }) {
    return (
        <div className="bg-card-dark shadow-sm p-3 rounded">
            <table className="table table-dark table-striped mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Asegúrate de que 'clientes' es un array y no undefined*/}
                    {clientes.map((c) => (
                        <tr key={c.id}>
                            <td>{c.nombre}</td>
                            <td>{c.telefono}</td>
                            <td>
                                <button
                                    className="btn btn-primary me-2"
                                    onClick={() => editarCliente(c.id)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => eliminarCliente(c.id)}
                                >
                                    Eliminar
                                </button>
                                <button
                                    className="btn btn-info ms-2"
                                    onClick={() => registrarCliente(`Detalles del cliente: ${onRegistrar}`)}
                                >
                                    Registrar Cliente
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}

export default TablaClientes;