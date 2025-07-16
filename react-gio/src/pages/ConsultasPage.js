import React, { useState } from 'react';
import ConsultaProducto from '../components/ConsultaProducto';
import ConsultaVentasPaginadas from '../components/ConsultaVentasPaginadas';
import ConsultaTotalVentasFecha from '../components/ConsultaTotalVentasFecha';

function ConsultasPage() {
  const [tabActivo, setTabActivo] = useState('producto');

  const renderTab = () => {
    switch (tabActivo) {
      case 'producto':
        return <ConsultaProducto />;
      case 'ventas':
        return <ConsultaVentasPaginadas />;
      case 'total':
        return <ConsultaTotalVentasFecha />;
      default:
        return null;
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="text-white text-center mb-4">Consultas</h4>

      <div className="btn-group mb-4 w-100" role="group">
        <button
          className={`btn ${tabActivo === 'producto' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setTabActivo('producto')}
        >
          Producto
        </button>
        <button
          className={`btn ${tabActivo === 'ventas' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setTabActivo('ventas')}
        >
          Ventas
        </button>
        <button
          className={`btn ${tabActivo === 'total' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setTabActivo('total')}
        >
          Total por Día
        </button>
      </div>

      <div>{renderTab()}</div>
    </div>
  );
}

export default ConsultasPage;
/*
import BusquedaProducto from '../components/BusquedaProducto';
import TablaVentas from '../components/TablaVentas';
import TablaVentasPorProducto from '../components/TablaVentasPorProducto';

function ConsultasPage() {
  const [producto, setProducto] = useState({ id: '', nombreProducto: '', codigoBarras: '', precioVenta: '' });
  const [ventas, setVentas] = useState([]);
  const [ventasPorProducto, setVentasPorProducto] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [pagina, setPagina] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);

  const API_PRODUCTO = 'http://localhost:8080/productos';
  const API_VENTAS = 'http://localhost:8080/ventas';

  const buscarProducto = async (query) => {
    try {
      let url = !isNaN(query)
        ? `${API_PRODUCTO}/${query}`
        : `${API_PRODUCTO}/nombre/${query}`;

      let res = await fetch(url);
      if (!res.ok && !isNaN(query)) {
        // intentar por código de barras si ID falló
        url = `${API_PRODUCTO}/codigoBarras/${query}`;
        res = await fetch(url);
      }

      if (!res.ok) throw new Error('Producto no encontrado');
      const data = await res.json();

      if (Array.isArray(data) && data.length === 1) {
        setProducto(data[0]);
      } else if (!Array.isArray(data)) {
        setProducto(data);
      } else {
        setMensaje('Se encontraron múltiples productos');
      }
    } catch (error) {
      setMensaje(error.message);
    }
  };

  const cargarVentas = async (pagina = 0) => {
    try {
      const res = await fetch(`${API_VENTAS}?page=${pagina}&size=20`,{
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      if (!res.ok) throw new Error('Error al cargar ventas');
      const data = await res.json();
      setVentas(data.contenido || []);
      setPagina(data.paginaActual || 0);
      setTotalPaginas(data.totalPaginas || 1);
      setMensaje('');
      console.log(data);
    } catch (error) {
      setMensaje(error.message);
    }
  };

  const consultarPorProducto = async (nombre) => {
    try {
      const res = await fetch(`${API_VENTAS}/por-producto?nombreProducto=${nombre}`, {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      if (!res.ok) throw new Error('No hay ventas para este producto');
      const data = await res.json();
      setVentasPorProducto(Array.isArray(data) ? data : data.ventas || []);
      setMensaje('');
    } catch (error) {
      setMensaje(error.message);
    }
  };

  const filtrarVentas = async ({ formaPago, fechaInicio, fechaFin, pagina = 0 }) => {
    try {
      let url = `${API_VENTAS}/filtroVentas?page=${pagina}&size=20`;

      if (formaPago) url += `&formaPago=${encodeURIComponent(formaPago)}`;
      if (fechaInicio) url += `&fechaInicio=${fechaInicio}`;
      if (fechaFin) url += `&fechaFin=${fechaFin}`;

      const res = await fetch(url, {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }});
      if (!res.ok) throw new Error('Error al filtrar ventas');
      const data = await res.json();

      setVentas(data.contenido);
      setPagina(data.paginaActual || 0);
      setTotalPaginas(data.totalPaginas || 1);
      setMensaje('');
    } catch (error) {
      setMensaje(error.message);
    }
  };

  return (
    <div className="container-fluid mt-4 px-3">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <h4 className="text-white text-center mb-4">Consultas de Ventas y Productos</h4>

          <BusquedaProducto
            onBuscar={buscarProducto}
            onListarVentas={cargarVentas}
            onConsultarPorProducto={consultarPorProducto}
          />

          {producto.nombreProducto && (
            <div className="bg-card-dark text-white p-3 mb-3 rounded">
              <div className="row">
                <div className="col-12 col-md-6">
                  <p><strong>ID:</strong> {producto.id}</p>
                  <p><strong>Nombre:</strong> {producto.nombreProducto}</p>
                </div>
                <div className="col-12 col-md-6">
                  <p><strong>Código:</strong> {producto.codigoBarras}</p>
                  <p><strong>Precio:</strong> ${producto.precioVenta}</p>
                </div>
              </div>
            </div>
          )}

          {ventas.length > 0 && (
            <div className="table-responsive">
              <TablaVentas
                ventas={ventas}
                pagina={pagina}
                totalPaginas={totalPaginas}
                onPaginar={cargarVentas}
                onFiltrar={filtrarVentas}
              />
            </div>
          )}

          {ventasPorProducto.length > 0 && (
            <div className="table-responsive">
              <TablaVentasPorProducto ventas={ventasPorProducto} />
            </div>
          )}

          {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
        </div>
      </div>
    </div>
  );
}

export default ConsultasPage;
*/