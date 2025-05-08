// src/components/Layout.js

import { Link } from 'react-router-dom';
import { getRol, logout, getUsuario } from '../utils/auth';

const usuario = getUsuario();

function Layout({ children }) {
  const rol = getRol();
  const usuario = getUsuario(); // Obtener el nombre del usuario desde el token

  const handleLogout = () => {
    logout();
    window.location.href = '/login'; // Redirigir a la página de login después de cerrar sesión
  }

  return (
    <div
      style={{
        minWidth: '100vw',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #0d6efd, #000)',
        color: 'white',
        margin: 0,
        padding: 0,
      }}
    >
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <Link className="navbar-brand" to="/">MENU</Link>

        <div className="text-end text-white small me-3">
          👋 Bienvenido, <strong>{usuario}</strong>
        </div>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">

            {rol === 'ADMINISTRADOR' && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/productos">Productos</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/empleados">Empleados</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/ventas">Ventas</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/consultas">Consultas</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/clientes">Clientes</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/proveedores">Proveedores</Link></li>
              </>
            )}

            {rol === 'ALMACENISTA' && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/productos">Productos</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/consultas">Consultas</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/proveedores">Proveedores</Link></li>
              </>
            )}

            {rol === 'VENDEDOR' && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/ventas">Ventas</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/consultas">Consultas</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/clientes">Clientes</Link></li>
              </>
            )}

            <li className="nav-item">
              <button className="btn btn-danger ms-3" onClick={handleLogout}>Cerrar sesión</button>
            </li>

          </ul>
        </div>
      </nav>

      <main className="flex-fill py-4">
        <div className="container">
          {children}
        </div>
      </main>
    </div>
  );
}

export default Layout;