// src/pages/ClientesPage.js
import React, { useState } from 'react';
import FormularioCliente from '../components/FormularioCliente';

function ClientesPage() {
  const [cliente, setCliente] = useState({ nombre: '', telefono: '' });
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente({ ...cliente, [name]: value });
  };

  const registrarCliente = async (e) => {
    e.preventDefault();

    if (!cliente.nombre || !cliente.telefono) {
      setMensaje('⚠️ Todos los campos son obligatorios');
      return;
    }

    try {
      const res = await fetch('http://localhost:8080/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente),
      });

      const data = await res.json();
      console.log('Cliente registrado:', data);
      setMensaje('✅ Cliente registrado exitosamente');
      setCliente({ nombre: '', telefono: '' });
    } catch (error) {
      console.error('Error al registrar cliente:', error);
      setMensaje('❌ Error al registrar cliente');
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="text-center text-white mb-3">Registro de Clientes</h4>

      <FormularioCliente
        cliente={cliente}
        onChange={handleChange}
        onSubmit={registrarCliente}
      />

      {mensaje && <div className="text-center mt-3 text-info">{mensaje}</div>}
    </div>
  );
}

export default ClientesPage;
