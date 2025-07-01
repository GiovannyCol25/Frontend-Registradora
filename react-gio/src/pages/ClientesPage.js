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

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const [busqueda, setBusqueda] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [clientes, setClientes] = useState([]);

  const API_URL = 'http://localhost:8080/clientes'; 

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
        const data = await response.json();
        console.log('Cliente registrado:', data);
        setClientes((prevClientes) => [...prevClientes, data]); // Agregar el nuevo cliente a la lista
        setMensaje('Cliente registrado exitosamente');
        setFormData({ id: null, nombre: '', telefono: '' });
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
  const buscarCliente = async () => {
    if (!busqueda.trim()) {
      setMensaje('⚠️ Por favor, ingrese un ID para buscar');
      return;
    }

    const opcionBusqueda = busqueda.trim();
    let url = '';

    const esId = !isNaN(opcionBusqueda) && opcionBusqueda.length <= 6;
    url = esId 
    ? `${API_URL}/${opcionBusqueda}` 
    : `${API_URL}/nombre/${opcionBusqueda}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        setMensaje('No se encontraron resultados');
        setClientes([]);
        return;
      }

      const data = await response.json();
      console.log('Datos obtenidos:', data);
      console.log('Respuesta del servidor:', response);
      // Verificar si la respuesta es exitosa
      
      if (esId){
        setFormData({
          id: data.id,
          nombre: data.nombre,
          telefono: data.telefono
        });
        setClientes([]);
        setMensaje(`🔍 Cliente encontrado: ${data.nombre}`);
      } else {
        if (Array.isArray(data) && data.length > 0) {
          setClientes(data);
          setMensaje(`🔍 Se encontraron ${data.length} clientes con el nombre "${opcionBusqueda}"`);
        } else {
          setClientes([]);
          setMensaje('❌ No se encontraron resultados');
        }
      }
    } catch (error) {
      console.error('Error al buscar cliente:', error);
      setMensaje('❌ Error al buscar cliente');
      setClientes([]);
    }
  };

  const actualizarCliente = async () => {
    try {
      const response = await fetch(`${API_URL}/${busqueda}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData)
      });
      // Verificar si la respuesta es exitosa
      if (response.ok) {
        const data = await response.json();
        console.log('Cliente actualizado:', data);
        // Actualizar el cliente en la lista de clientes
        setClientes((prevClientes) => [...prevClientes, data]);
        setMensaje('Cliente actualizado exitosamente');
        setFormData({ id: null, nombre: '', telefono: '' });
      } else {
        setMensaje('❌ Error al actualizar cliente');
      }
    } catch (error) {
      console.error('Error al actualizar cliente:', error);
      setMensaje('❌ Error al actualizar cliente');
    }
  };  

  const eliminarCliente = async (e) => {
    try {
      await fetch(`${API_URL}/${busqueda}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      setMensaje('Cliente eliminado exitosamente');
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

      {/* Componente de formulario para registrar o actualizar clientes */}
      <FormularioClientes
        formData={formData}
        onChange={onChange}
        onRegistrar={registrarCliente}
        onBuscar={buscarCliente}
        onActualizar={actualizarCliente}
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        mensaje={mensaje}
        setMensaje={setMensaje}
        setCliente={setFormData}
      />

      {/* Tabla para mostrar los clientes registrados */}
      {clientes.length > 0 && (
        <TablaClientes
        clientes={clientes}
        eliminarCliente={eliminarCliente}
        editarCliente={handleEditar}
        registrarCliente={registrarCliente}
        onRegistrar={buscarCliente}
        />
      )}
      {/* Mensaje de estado */}
      {mensaje && <div className="text-center text-info mt-3">{mensaje}</div>}
    </div>
  );
}
export default ClientesPage;
