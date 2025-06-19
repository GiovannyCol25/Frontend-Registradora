import React, { useState } from 'react';

function ProveedoresFormulario() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    nit: '',
    responsable: '',
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
      setMensaje('Proveedor registrado exitosamente.');
    } else {
      setMensaje('Por favor, completa todos los campos.');
    }
  };

  const handleBuscar = () => {
    if (busqueda.toLowerCase() === 'alpina' || busqueda === '1') {
      setFormData({
        nombre: 'Alpina',
        correo: 'juan@Alpina.com',
        nit: '123456789',
        responsable: 'Juan Pérez',
        telefono: '3123456789',
      });
      setMensaje('Proveedor encontrado.');
    } else {
      setMensaje('Proveedor no encontrado.');
      setFormData({
        nombre: '',
        correo: '',
        nit: '',
        responsable: '',
        telefono: '',
      });
    }
  };

  const handleActualizar = () => {
    if (formData.nombre && formData.correo && formData.telefono) {
      setMensaje('Proveedor modificado exitosamente.');
    } else {
      setMensaje('Por favor, completa todos los campos para actualizar.');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl text-black font-bold text-black-800">Gestión de Proveedores</h2>

      {mensaje && <div className="text-green-600 text-black font-medium">{mensaje}</div>}

      <div className="space-y-2">
        <input
          type="text"
          placeholder="Buscar Proveedor por ID o nombre"
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
          type="text"
          name="nit"
          placeholder="NIT"
          value={formData.nit}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
        />
        <input
          type="text"
          name="responsable"
          placeholder="Responsable"
          value={formData.responsable}
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

export default ProveedoresFormulario;
