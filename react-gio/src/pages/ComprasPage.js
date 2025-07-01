import React  from "react";
import TablaCompras from "../components/TablaCompras";
import FormularioCompras from "../components/FormularioCompras";
import ResumenCompra from "../components/ResumenCompra";
import { formatearMiles } from "../utils/formato";

function ComprasPage() {
    const [producto, setProducto] = React.useState({
        id: '',
        nombreProducto: '',
        codigoBarras: '',
        precioCompra: 0,
        cantidad: 1,
    });

    const [criterioBusqueda, setCriterioBusqueda] = React.useState('');
    const [mensaje, setMensaje] = React.useState('');
    const [totalCompra, setTotalCompra] = React.useState(0);
    //const [productos, setProductos] = React.useState([]);
    const [resultadosBusqueda, setResultadosBusqueda] = React.useState([]);
    const [productosAgregados, setProductosAgregados] = React.useState([]);
    const [compraConfirmada, setCompraConfirmada] = React.useState(null);
    const [criterioProveedor, setCriterioProveedor] = React.useState('')
    const [proveedor, setProveedor] = React.useState(null)
 
    const consultarProveedor = async () => {
        if (!criterioProveedor.trim()) {
            setMensaje("⚠️ Debes ingresar un criterio de búsqueda válido");
            return;
        }
        const criterio = criterioProveedor.trim();
        let url = '';
        if (!isNaN(criterio)) {
            url = `http://localhost:8080/proveedores/${criterio}`;
        } else {
            url = `http://localhost:8080/proveedores/nombre/${criterio}`;
        }
        console.log("Consultando URL:", url);
        try {
            const res = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                }
            });
            if (res.ok) {
                const data = await res.json();
                const proveedorSeleccionado = Array.isArray(data) ? data[0] : data;

                if (proveedorSeleccionado) {
                    setProveedor({
                        id: proveedorSeleccionado.id,
                        nombre: proveedorSeleccionado.nombre,
                        nit: proveedorSeleccionado.nit,
                        responsable: proveedorSeleccionado.responsable,
                        telefono: proveedorSeleccionado.telefono,
                    });
                    setMensaje(`✅ Proveedor encontrado: ${proveedorSeleccionado.nombre}`);
                } else {
                    setMensaje("❌ Proveedor no encontrado");
                    setProveedor(null);
                }
            } else {
                setMensaje("❌ Error al consultar el proveedor");
                setProveedor(null);
            }
        } catch (error) {
            console.error("Error al consultar el proveedor:", error);
            setMensaje("❌ Error al consultar el proveedor");
            setProveedor(null);
        }
    };
    
    const consultarProducto = async () => {
        if (!criterioBusqueda.trim()) {
            setMensaje("⚠️ Debes ingresar un criterio de búsqueda válido");
            return;
        }

        const criterio = criterioBusqueda.trim();
        let url = '';

        if (!isNaN(criterio) && criterio.length <= 6) {
            url = `http://localhost:8080/productos/${criterio}`;
        } else if (!isNaN(criterio) && criterio.length > 6) {
            url = `http://localhost:8080/productos/codigoBarras/${criterio}`;
        } else {
            url = `http://localhost:8080/productos/nombre/${criterio}`;
        }
        console.log("Consultando URL:", url);

        try {
            const res = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                }
            });

            if (res.ok) {
                console.log("Respuesta del servidor:", res);
                const data = await res.json();
                if (Array.isArray(data)) {
                    console.log("Datos de productos encontrados:", data);
                    setResultadosBusqueda(data);
                } else {
                    setProducto({
                        // Asignar los datos del producto encontrado
                        id: data.id,
                        nombreProducto: data.nombreProducto,
                        codigoBarras: data.codigoBarras,
                        precioCompra: data.precioCompra,
                        cantidad: 1
                    });
                    setMensaje("✅ Producto encontrado");
                }
    } 

            } catch (error) {
            console.error("Error al consultar el producto:", error);
            setMensaje("❌ Producto no encontrado");
        }
    };

    const agregarProducto = () => {
        if (!producto.id) {
            setMensaje("⚠️ Debes buscar un producto válido");
            return;
        }
        setProductosAgregados([...productosAgregados, producto]);
        setProducto({
            id: '',
            nombreProducto: '',
            codigoBarras: '',
            precioCompra: 0,
            cantidad: 1,
        });
        console.log("Producto agregado:", producto);
        setMensaje("✅ Producto agregado");
    };

    const eliminarProducto = (index) => {
        const nuevosProductos = productosAgregados.filter((_, i) => i !== index);
        setProductosAgregados(nuevosProductos);
    };

    const registrarCompra = async () => {
        if (productosAgregados.length === 0) {
            setMensaje("⚠️ Debes agregar al menos un producto a la compra");
            return;
        }

        const detallesCompra = productosAgregados.map((p) => ({
            productoId: p.id,
            cantidad: p.cantidad,
            precioUnitario: p.precio,
        }));

        try {
            // Preparar el objeto de compra
            const compra = {
                detallesCompra,
                totalCompra: totalCompra,
                fechaCompra: new Date().toISOString(),
            };
            const response = await fetch('http://localhost:8080/compras', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                },
                body: JSON.stringify(compra),
            });

            if (!response.ok) {
                throw new Error("Error al registrar la compra");
            }    

            const compraRegistrada = await response.json();
            setCompraConfirmada(compraRegistrada);
            setMensaje(`✅ Compra registrada con éxito. ID: ${compraRegistrada.id}`);

            // Limpiar los estados después de registrar la compra
            setProductosAgregados([]);
            setTotalCompra(0);
            setProducto({
                id: '',
                nombreProducto: '',
                codigoBarras: '',
                precioCompra: 0,
                cantidad: 1,
            });
        } catch (error) {
            console.error("Error al registrar la compra:", error);
            setMensaje("❌ Error al registrar la compra");
        }
    }

  return (
    <div className="container mt-4">
      <h1>Compras</h1>
      <div className="row">
        <div className="col-md-6">
        {/* Formulario de Compras */}
        <FormularioCompras
        producto={producto}
        setProducto={setProducto}
        criterioBusqueda={criterioBusqueda}
        setCriterioBusqueda={setCriterioBusqueda}
        consultarProducto={consultarProducto}
        mensaje={mensaje}
        setMensaje={setMensaje}
        totalCompra={totalCompra}
        setTotalCompra={setTotalCompra}
        agregarProducto={agregarProducto}
        eliminarProducto={eliminarProducto}
        registrarCompra={registrarCompra}
        proveedor={proveedor}
        setProveedor={setProveedor}
        criterioProveedor={criterioProveedor}
        setCriterioProveedor={setCriterioProveedor}
        consultarProveedor={consultarProveedor}
        compra={productosAgregados}
        />
        </div>
        <div className="col-md-6">
            {/*Resultados de búsqueda */}
            {resultadosBusqueda.length > 0 && (
                <table className="table table-dark table-striped mt-3">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            {resultadosBusqueda.map((p) => (
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td>{p.codigoBarras}</td>
                                    <td>{p.nombreProducto}</td>
                                    <td>${formatearMiles(p.precioCompra)}</td>
                                    <td>
                                        <button 
                                            className="btn btn-sm btn-info"
                                            onClick={() => {
                                                setProducto({
                                                    id: p.id,
                                                    nombre: p.nombreProducto,
                                                    codigo: p.codigoBarras,
                                                    precio: p.precioCompra,
                                                    cantidad: 1
                                                });
                                                setResultadosBusqueda([]);
                                                setMensaje(`📝 Producto seleccionado: ${p.nombreProducto}`);
                                            }}
                                        >
                                            Seleccionar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                </table>
            )}

            {/*Tabla de resultados de búsqueda */}
            <div className="bg-card-dark p-3 rounded text-white mb-4">
        <TablaCompras
            eliminarCompra={eliminarProducto}
            compras={productosAgregados}
            totalCompra={totalCompra}
            setTotalCompra={setTotalCompra}
            eliminarProducto={eliminarProducto}
            registrarCompra={registrarCompra}
            />
            <ResumenCompra compras={compraConfirmada} />
            
            </div>
            {/*Mensaje de estado */}
            {mensaje && <div className="text-center mt-3 text-info">{mensaje}</div>}
        </div>
    </div>
    </div>
  );
}

export default ComprasPage;