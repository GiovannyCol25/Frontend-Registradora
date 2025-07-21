import React, { useState } from 'react';
import TablaProductosVenta from '../TablaProductosVenta';

const ConsultaVentas = () => {

    const [ventaId, setVentaId] = useState('');
    const [ventaEncontrada, setVentaEncontrada] = useState(null);
    const [ventas, setVentas] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const API_VENTAS = 'http://localhost:8080/ventas';
    const [pagina, setPagina] = useState(0);
    const [totalPaginas, setTotalPaginas] = useState(1);

    const cargarVentas = async (pagina = 0) => {
    try {
      const res = await fetch(`${API_VENTAS}?page=${pagina}&size=20`);
      if (!res.ok) throw new Error('Error al cargar ventas');
      const data = await res.json();
      setVentas(data.content);
      setPagina(data.paginaActual || 0);
      setTotalPaginas(data.totalPaginas || 1);
      setMensaje('');
    } catch (error) {
      setMensaje(error.message);
    }
  };

  return (
    <div>
      <h5>Consulta de Ventas</h5>

      <div className="d-flex gap-2 mb-3">
        <input
          htmlFor="ventaId"
          name='ventaId'
          id="ventaId"
          type="text"
          className="form-control"
          placeholder="ID de Venta"
          value={ventaId}
          onChange={(e) => setVentaId(e.target.value)}
        />
        <button
          className="btn btn-primary"
          onClick={() => cargarVentas()}
        >
          Cargar Ventas
        </button>
      </div>

      {mensaje && <div className="alert alert-info">{mensaje}</div>}

      <TablaProductosVenta ventas={ventas} pagina={pagina} totalPaginas={totalPaginas} setPagina={setPagina} />
    </div>
  );

}

export default ConsultaVentas;