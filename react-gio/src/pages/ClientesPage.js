import React, { useState } from 'react';
import TablaClientes from '../components/TablaClientes';
import FormularioClientes from '../components/FormularioClientes';

function ClientesPage() {
  // Estado para manejar los datos del formulario, búsqueda, mensaje y clientes
  const [formData, setFormData] = useState({
    id: null,
    nombre: '',
    telefono: ''
  });
  
  const [busqueda, setBusqueda] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [clientes, setClientes] = useState([]);

  const API_URL = 'http://localhost:8080/clientes'; 

  const fetchClientes = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error('Error al cargar clientes:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({      ...prev,
      [name]: value
    }));
  };

  // Maneja el cambio en el campo de búsqueda
  const registrarCliente = async () => {

    const { nombre, telefono } = formData;
    // Validar que los campos no estén vacíos
    if (!nombre || !telefono) {
      setMensaje('⚠️ Todos los campos son obligatorios');
      return;
    }
    // Validar que el teléfono tenga 10 dígitos
    if (telefono.length !== 10 || isNaN(telefono)) {
      setMensaje('⚠️ El teléfono debe tener 10 dígitos');
      return;
    }

    try {
      // Preparar los datos del formulario
      const registro = {
        nombre: formData.nombre,
        telefono: formData.telefono
      };

      // Validar que los campos no estén vacíos
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
        // Enviar los datos del formulario al servidor
        body: JSON.stringify(registro)
      });
      // Verificar si la respuesta es exitosa
      if (response.ok) {
        setMensaje('Cliente registrado exitosamente');
        setFormData({ id: null, nombre: '', telefono: '' });
        fetchClientes();
      } else {
        setMensaje('Error al registrar cliente');
      }
      // Limpiar el campo de búsqueda
    } catch (error) {
      console.error('Error al registrar cliente:', error);
      setMensaje('Error al registrar cliente');
    }
  };

  // Maneja el cambio en el campo de búsqueda
  const handleBuscar = async () => {
    try {
      const response = await fetch(`${API_URL}/id/${busqueda}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      // Verificar si la respuesta es exitosa
      if (response.ok) {
        const data = await response.json();
        setClientes(data);
        setMensaje(`🔍 ${data.length} resultado(s) encontrado(s)`);
      } else {
        setMensaje('❌ Error al buscar clientes');
      }
    } catch (error) {
      console.error('Error al buscar clientes:', error);
      setMensaje('❌ Error al buscar clientes');
    }
  };

  const handleActualizar = async () => {
    try {
      const response = await fetch(`${API_URL}/id/${busqueda}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData)
      });
      // Verificar si la respuesta es exitosa
      if (response.ok) {
        setMensaje('Cliente actualizado exitosamente');
        setFormData({ id: null, nombre: '', telefono: '' });
        fetchClientes();
      } else {
        setMensaje('❌ Error al actualizar cliente');
      }
    } catch (error) {
      console.error('Error al actualizar cliente:', error);
      setMensaje('❌ Error al actualizar cliente');
    }
  };  

  const handleEliminar = async (e) => {
    try {
      await fetch(`${API_URL}/id/${e}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      setMensaje('Cliente eliminado exitosamente');
      fetchClientes();
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
      setMensaje('❌ Error al eliminar cliente');
    }
  };
  
  const handleEditar = (cliente) => {
    setFormData({
      id: cliente.id,
      nombre: cliente.nombre,
      telefono: cliente.telefono
    });
    setBusqueda(cliente.id); // Actualiza el campo de búsqueda con el ID del cliente
  }

  return (
    <div className="p-4 max-w-md mx-auto rounded-xl shadow-md space-y-4">
      <h2 className="text-xl text-withe font-bold text-black-800">Gestión de Clientes</h2>

      <FormularioClientes
        formData={formData}
        onChange={handleChange}
        onRegistrar={registrarCliente}
        onBuscar={handleBuscar}
        onActualizar={handleActualizar}
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        mensaje={mensaje}
      />

      <TablaClientes
        clientes={clientes}
        eliminarCliente={handleEliminar}
        editarCliente={handleEditar}
        />
    </div>
  );
}
export default ClientesPage;
