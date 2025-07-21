import React, { useState } from 'react';

// Importa el componente que se mostrará en la pestaña de empleados
import ConsultaEmpleados from '../components/consultas/ConsultaEmpleados';
import ConsultaClientes from '../components/consultas/ConsultaClientes';
import ConsultaProveedores from '../components/consultas/ConsultaProveedores';
import ConsultaProductos from '../components/consultas/ConsultaProductos';
import ConsultaVentas from '../components/consultas/ConsultaVentas';

const ConsultasPage = () => {
  const [tabSeleccionada, setTabSeleccionada] = useState('empleados'); // Por ahora solo una pestaña

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Consultas del Sistema</h2>

      {/* Navegación de pestañas */}
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${tabSeleccionada === 'empleados' ? 'active' : ''}`}
            onClick={() => setTabSeleccionada('empleados')}
          >
            Empleados
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${tabSeleccionada === 'clientes' ? 'active' : ''}`}
            onClick={() => setTabSeleccionada('clientes')}
          >
            Clientes
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${tabSeleccionada === 'proveedores' ? 'active' : ''}`}
            onClick={() => setTabSeleccionada('proveedores')}
          >
            Proveedores
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${tabSeleccionada === 'productos' ? 'active' : ''}`}
            onClick={() => setTabSeleccionada('productos')}
          >
            Productos 
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${tabSeleccionada === 'ventas' ? 'active' : ''}`}
            onClick={() => setTabSeleccionada('ventas')}
          >
            Ventas
          </button>
        </li>
        {/* Puedes añadir más tabs así:
        <li className="nav-item">
          <button
            className={`nav-link ${tabSeleccionada === 'productos' ? 'active' : ''}`}
            onClick={() => setTabSeleccionada('productos')}
          >
            Productos
          </button>
        </li>
        */}
      </ul>
      
      {/* Contenido de cada tab */}
      <div className="mt-4">
        {tabSeleccionada === 'empleados' && <ConsultaEmpleados />}
        {/* Agrega aquí más condiciones para futuras pestañas */}
      </div>
      <div className="mt-4">
        {tabSeleccionada === 'clientes' && <ConsultaClientes />}
      </div>
      <div className="mt-4">
        {tabSeleccionada === 'proveedores' && <ConsultaProveedores />}
      </div>
      <div className="mt-4">
        {tabSeleccionada === 'productos' && <ConsultaProductos />} 
      </div>
      <div className="mt-4">
        {tabSeleccionada === 'ventas' && <ConsultaVentas />}
      </div>
    </div>
  );
};

export default ConsultasPage;


/*
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ConsultasPage() {
  const [activeTab, setActiveTab] = useState('productos');
  const [criterio, setCriterio] = useState('');
  const [tab, setTab] = useState('empleados');

  return (
    // Página de Consultas
    <div className="container mt-4">
      <h2>Consultas del Sistema</h2>

      {/* Tabs *//*}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'productos' ? 'active' : ''}`} onClick={() => setActiveTab('productos')}>
            Productos
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'ventas' ? 'active' : ''}`} onClick={() => setActiveTab('ventas')}>
            Ventas
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'compras' ? 'active' : ''}`} onClick={() => setActiveTab('compras')}>
            Compras
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'clientes' ? 'active' : ''}`} onClick={() => setActiveTab('clientes')}>
            Clientes
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'empleados' ? 'active' : ''}`} onClick={() => setActiveTab('empleados')}>
            Empleados
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'proveedores' ? 'active' : ''}`} onClick={() => setActiveTab('proveedores')}>
            Proveedores
          </button>
        </li>
      </ul>

      {/* Contenido dinámico *//*}
      {activeTab === 'productos' && (
        <div>
          <h5>Consultas de Productos</h5>
          <div className="mb-3">
            <input className="form-control" placeholder="ID" />
            <button className="btn btn-primary mt-2">Buscar por ID</button>
          </div>
          <div className="mb-3">
            <input className="form-control" placeholder="Nombre (parcial o completo)" />
            <button className="btn btn-primary mt-2">Buscar por Nombre</button>
          </div>
          <div className="mb-3">
            <input className="form-control" placeholder="Código de Barras" />
            <button className="btn btn-primary mt-2">Buscar por Código</button>
          </div>
        </div>
      )}

      {activeTab === 'ventas' && (
        <div>
          <h5>Consultas de Ventas</h5>
          <div className="mb-3">
            <input className="form-control" placeholder="ID de Venta" />
            <button className="btn btn-primary mt-2">Buscar por ID</button>
          </div>
          <div className="mb-3">
            <input className="form-control" placeholder="Fecha (YYYY-MM-DD)" />
            <button className="btn btn-primary mt-2">Ventas por Fecha</button>
            <button className="btn btn-secondary mt-2 ms-2">Total Diario</button>
          </div>
          <div className="mb-3">
            <input className="form-control" placeholder="ID del Producto" />
            <button className="btn btn-primary mt-2">Ventas por Producto</button>
          </div>
          <div className="mb-3">
            <input className="form-control" placeholder="Filtro Avanzado (JSON o múltiple)" />
            <button className="btn btn-primary mt-2">Filtrar Ventas</button>
          </div>
        </div>
      )}

      {activeTab === 'compras' && (
        <div>
          <h5>Consultas de Compras</h5>
          <div className="mb-3">
            <button className="btn btn-primary">Listar Todas las Compras</button>
          </div>
          <div className="mb-3">
            <input className="form-control" placeholder="ID de Compra" />
            <button className="btn btn-primary mt-2">Buscar por ID</button>
          </div>
        </div>
      )}

      {activeTab === 'clientes' && (
        <div>
          <h5>Consultas de Clientes</h5>
          <div className="mb-3">
            <button className="btn btn-primary">Listar Clientes</button>
          </div>
          <div className="mb-3">
            <input className="form-control" placeholder="ID del Cliente" />
            <button className="btn btn-primary mt-2">Buscar por ID</button>
          </div>
          <div className="mb-3">
            <input className="form-control" placeholder="Nombre del Cliente" />
            <button className="btn btn-primary mt-2">Buscar por Nombre</button>
          </div>
        </div>
      )}

      {activeTab === 'empleados' && (
        <div>
          <h5>Consultas de Empleados</h5>
          <div className="mb-3">
            <button className="btn btn-primary">Listar Empleados</button>
          </div>
          <div className="mb-3">
            <input className="form-control" placeholder="ID del Empleado" />
            <button className="btn btn-primary mt-2">Buscar por ID</button>
          </div>
        </div>
      )}

      {activeTab === 'proveedores' && (
        <div>
          <h5>Consultas de Proveedores</h5>
          <div className="mb-3">
            <button className="btn btn-primary">Listar Proveedores</button>
          </div>
          <div className="mb-3">
            <input className="form-control" placeholder="ID del Proveedor" />
            <button className="btn btn-primary mt-2">Buscar por ID</button>
          </div>
          <div className="mb-3">
            <input className="form-control" placeholder="Nombre del Proveedor" />
            <button className="btn btn-primary mt-2">Buscar por Nombre</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConsultasPage;*/

/*
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

export default ConsultasPage;*/