import React, { useState } from 'react';

function ClienteFormulario() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
  });

  const [busqueda, setBusqueda] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value);
  };

  const handleRegistrar = () => {
    if (formData.nombre && formData.correo && formData.telefono) {
      setMensaje('Cliente registrado exitosamente.');
    } else {
      setMensaje('Por favor, completa todos los campos.');
    }
  };

  const handleBuscar = () => {
    if (busqueda.toLowerCase() === 'juan' || busqueda === '1') {
      setFormData({
        nombre: 'Juan Pérez',
        correo: 'juan@example.com',
        telefono: '123456789',
      });
      setMensaje('Cliente encontrado.');
    } else {
      setMensaje('Cliente no encontrado.');
      setFormData({
        nombre: '',
        correo: '',
        telefono: '',
      });
    }
  };

  const handleActualizar = () => {
    if (formData.nombre && formData.correo && formData.telefono) {
      setMensaje('Cliente modificado exitosamente.');
    } else {
      setMensaje('Por favor, completa todos los campos para actualizar.');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl text-black font-bold text-black-800">Gestión de Clientes</h2>

      {mensaje && <div className="text-green-600 text-black font-medium">{mensaje}</div>}

      <div className="space-y-2">
        <input
          type="text"
          placeholder="Buscar cliente por ID o nombre"
          value={busqueda}
          onChange={handleBusquedaChange}
          className="w-full p-2 border rounded text-black"
        />
        <button
          onClick={handleBuscar}
          className="bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600"
        >
          Buscar
        </button>
      </div>

      <div className="space-y-2">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={formData.correo}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
        />
        <input
          type="tel"
          name="telefono"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
        />
      </div>

      <div className="flex justify-between space-x-2">
        <button
          onClick={handleRegistrar}
          className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-600"
        >
          Registrar
        </button>
        <button
          onClick={handleActualizar}
          className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600"
        >
          Actualizar
        </button>
      </div>
    </div>
  );
}

export default ClienteFormulario;
