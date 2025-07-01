import React, { useState } from 'react';

import FormularioProveedor from '../components/FormularioProveedor';
import TablaProveedores from '../components/TablaProveedores';

function ProveedoresPage() {
  const [formData, setFormData] = useState({
    id: null,
    razonSocial: '',
    nit: '',
    telefono: '',
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const [mensaje, setMensaje] = useState('');
  const [proveedores, setProveedores] = useState([]);
  const [busquedaProveedor, setBusquedaProveedor] = useState('');
  const API_URL = 'http://localhost:8080/proveedores';

  const registrarProveedor = async () => {
    const {razonSocial, nit, telefono} = formData;
    // validar que los campos no están vacíos
    if(!razonSocial || !nit || !telefono) {
      setMensaje('⚠️ Todos los campos son obligatorios');
      return;
    }

    try{
      const registro = {
        razonSocial: formData.razonSocial,
        nit: formData.nit,
        telefono: formData.telefono
      };

      console.log("Datos actuales del formulario:", formData);
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
        // Envía los datos del formulario al servidos
        body: JSON.stringify(registro)
      });

      //Verificar respuesta exitosa
      console.log("datos enviados al servidor: ", registro)
      if(response.ok){
        const data = await response.json();
        console.log("Cliente registrado:", data);
        setMensaje('Proveedor registrado exitosamente');
      }else{
        setMensaje('Error al registrar proveedor');
      }
      
    }catch(error){
      setMensaje('Error al registrar proveedor');
    }
  };

  const consultarProveedor = async () => {
    if(!busquedaProveedor.trim()){
      setMensaje('⚠️ Por favor, ingrese un ID o nombre de Proveedor');
      return;
    }

/*    const proveedorBuscado = busquedaProveedor.trim(); */
    let url = ''; 

    try{
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
      });

      if(!response.ok){
        setMensaje('No se encontraron resultados');
        setProveedores([]);
        return;
      }

      const data = await response.json();
      setProveedores(data)
    } catch(error){
      setMensaje("❌ No se encontró el proveedor");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto rounded-xl shadow-md space-y-4">
      <h2 className="text-xl text-white font-bold text-black-800">Gestión de Proveedores</h2>

      { /* Componente de formulario para registrar o actualizar proveedores */ }
      <FormularioProveedor
        formData={formData}
        onChange={onChange}
        mensaje={mensaje}
        onRegistrar={registrarProveedor}
        onBuscar={consultarProveedor}
        busquedaProveedor={busquedaProveedor}
        setBusquedaProveedor={setBusquedaProveedor}
        //setProveedores{setFormData}
      />

      {/*Tabla para mostrar proveedores registrados*/}
      {proveedores.length > 0 && (
        <TablaProveedores
        proveedores={proveedores}
        />
      )}

    </div>
  );
}

export default ProveedoresPage;