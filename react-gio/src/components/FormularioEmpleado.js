import React from 'react';

function FormularioEmpleado({ empleado, onChange, onSubmit, onEliminar }) {
  return (
    <div className="text-center mb-4">
      <form onSubmit={onSubmit} className="bg-card-dark shadow-sm p-4 rounded mb-4">
        <div className="mb-3">
          <label className="form-label text-white">Nombre del Empleado</label>
          <input
            type="text"
            name="nombreEmpleado"
            value={empleado.nombreEmpleado}
            onChange={onChange}
            className="form-control form-control-dark"
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-white">Cargo</label>
          <input
            type="text"
            name="cargo"
            value={empleado.cargo}
            onChange={onChange}
            className="form-control form-control-dark"
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-white">Teléfono</label>
          <input
            type="number"
            name="telefono"
            value={empleado.telefono}
            onChange={onChange}
            className="form-control form-control-dark"
          />
        </div>

        <hr className="text-white" />
        <h6 className="text-white">🧾 Datos de Usuario</h6>

        <div className="mb-3">
          <label className="form-label text-white">Usuario (login)</label>
          <input
            type="text"
            name="login"
            value={empleado.usuario.login}
            onChange={onChange}
            className="form-control form-control-dark"
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-white">Contraseña</label>
          <input
            type="password"
            name="clave"
            value={empleado.usuario.clave}
            onChange={onChange}
            className="form-control form-control-dark"
          />
        </div>

        <div className="mb-4">
          <label className="form-label text-white">Rol</label>
          <select
            name="rol"
            value={empleado.usuario.rol}
            onChange={onChange}
            className="form-control form-control-dark"
          >
            <option value="EMPLEADO">VENDEDOR</option>
            <option value="ALMACENISTA">ALMACENISTA</option>
            <option value="ADMINISTRADOR">ADMINISTRADOR</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Registrar Empleado + Usuario
        </button>
      </form>
    
  </div>
  );
}

export default FormularioEmpleado;
