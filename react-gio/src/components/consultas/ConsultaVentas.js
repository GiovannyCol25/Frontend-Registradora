import React, { useState, useEffect } from "react";
import TablaConsultaVentas from "../TablaConsultaVentas";

const ConsultaVentas = () => {
  const API_VENTAS = "http://localhost:8080/ventas";

  const [ventas, setVentas] = useState([]);
  const [pagina, setPagina] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [tipoConsulta, setTipoConsulta] = useState("todas");

  // ✅ Para card de total ventas
  const [totalVentasCard, setTotalVentasCard] = useState(null);

  // ✅ Para card de detalle individual
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);

  // --- Métodos Backend ---
  const listarVentas = async (paginaActual = 0) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_VENTAS}?page=${paginaActual}&size=10`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      if (!res.ok) throw new Error("Error al listar ventas");
      const data = await res.json();
      setVentas(data.contenido || []);
      setPagina(data.paginaActual || 0);
      setTotalPaginas(data.totalPaginas || 1);
    } catch (error) {
      setMensaje(error.message);
    } finally {
      setLoading(false);
    }
  };

  const filtrarVentas = async (paginaActual = 0) => {
    try {
      setLoading(true);
      const url = `${API_VENTAS}/filtroVentas?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&page=${paginaActual}&size=10`;
      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      if (!res.ok) throw new Error("Error al filtrar ventas");
      const data = await res.json();
      setVentas(data.contenido || []);
      setPagina(data.paginaActual || 0);
      setTotalPaginas(data.totalPaginas || 1);
    } catch (error) {
      setMensaje(error.message);
    } finally {
      setLoading(false);
    }
  };

  const obtenerTotalVentasPorFecha = async () => {
    if (!fechaInicio) {
      setMensaje("Selecciona una fecha");
      return;
    }
    try {
      const url = `${API_VENTAS}/ventas-diarias/total/${fechaInicio}`;
      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      if (!res.ok) throw new Error("No hay datos para esta fecha");
      const data = await res.json();
      setTotalVentasCard(data);
    } catch (error) {
      setMensaje(error.message);
    }
  };

  // --- General ---
  const ejecutarConsulta = (paginaActual = 0) => {
    if (tipoConsulta === "todas") {
      listarVentas(paginaActual);
    } else {
      filtrarVentas(paginaActual);
    }
  };

  useEffect(() => {
    listarVentas(0);
  }, []);

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 0 && nuevaPagina < totalPaginas) {
      ejecutarConsulta(nuevaPagina);
    }
  };

  return (
    <div className="container">
      <h4>Consulta de Ventas</h4>

      {/* Selector de tipo de consulta */}
      <div className="mb-3">
        <label>Tipo de Consulta</label>
        <select
          className="form-select"
          value={tipoConsulta}
          onChange={(e) => setTipoConsulta(e.target.value)}
        >
          <option value="todas">Todas</option>
          <option value="fechas">Por Fechas</option>
        </select>
      </div>

      {/* Filtros */}
      {tipoConsulta === "fechas" && (
        <div className="mb-3 d-flex gap-2">
          <input
            type="date"
            className="form-control"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
          <input
            type="date"
            className="form-control"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
          <button
            className="btn btn-primary"
            onClick={() => ejecutarConsulta(0)}
            disabled={loading}
          >
            {loading ? "Cargando..." : "Buscar Ventas"}
          </button>
          <button
            className="btn btn-secondary"
            onClick={obtenerTotalVentasPorFecha}
          >
            Ver Total
          </button>
        </div>
      )}

      {mensaje && <div className="alert alert-danger">{mensaje}</div>}

      {/* ✅ Tabla con botón Ver */}
      <TablaConsultaVentas
        ventas={ventas}
        paginaActual={pagina}
        totalPaginas={totalPaginas}
        cambiarPagina={cambiarPagina}
        onSeleccionar={(venta) => setVentaSeleccionada(venta)}
      />

      {/* ✅ Card: Total Ventas */}
      {totalVentasCard && (
        <div className="card mt-3 p-3">
          <h5>Total Ventas - Fecha: {totalVentasCard.fechaVenta}</h5>
          <p>💰 Total: ${totalVentasCard.totalVentas}</p>
          <p>🛒 Cantidad de Ventas: {totalVentasCard.cantidadVentas}</p>
        </div>
      )}

      {/* ✅ Card: Detalle Venta */}
      {ventaSeleccionada && (
        <div className="card mt-3 p-3">
          <h5>Detalles de la Venta #{ventaSeleccionada.id}</h5>
          <p>Fecha: {ventaSeleccionada.fechaVenta}</p>
          <p>Total: ${ventaSeleccionada.totalVenta}</p>
          <p>Forma de Pago: {ventaSeleccionada.formaDePago}</p>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => setVentaSeleccionada(null)}
          >
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
};

export default ConsultaVentas;


/*import React, { useState, useEffect } from "react";
import TablaConsultaVentas from "../TablaConsultaVentas";

const ConsultaVentas = () => {
  const API_VENTAS = "http://localhost:8080/ventas";

  const [ventas, setVentas] = useState([]);
  const [pagina, setPagina] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [tipoConsulta, setTipoConsulta] = useState("todas"); // 'todas' o 'fechas'

  // ✅ Método: Listar todas las ventas (con paginación)
  const listarVentas = async (paginaActual = 0) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_VENTAS}?page=${paginaActual}&size=10`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      if (!res.ok) throw new Error("Error al listar ventas");
      const data = await res.json();
      setVentas(data.contenido || []);
      setPagina(data.paginaActual || 0);
      setTotalPaginas(data.totalPaginas || 1);
    } catch (error) {
      setMensaje(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Método: Filtrar ventas por fechas
  const filtrarVentas = async (paginaActual = 0) => {
    if (!fechaInicio || !fechaFin) {
      setMensaje("Debes seleccionar fecha de inicio y fin");
      return;
    }
    try {
      setLoading(true);
      const url = `${API_VENTAS}/filtroVentas?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&page=${paginaActual}&size=10`;
      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      if (!res.ok) throw new Error("Error al filtrar ventas");
      const data = await res.json();
      setVentas(data.contenido || []);
      setPagina(data.paginaActual || 0);
      setTotalPaginas(data.totalPaginas || 1);
    } catch (error) {
      setMensaje(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Método general que decide qué consulta ejecutar
  const ejecutarConsulta = (paginaActual = 0) => {
    if (tipoConsulta === "todas") {
      listarVentas(paginaActual);
    } else {
      filtrarVentas(paginaActual);
    }
  };

  // ✅ Cargar lista inicial
  useEffect(() => {
    listarVentas(0);
  }, []);

  // ✅ Cambio de página
  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 0 && nuevaPagina < totalPaginas) {
      ejecutarConsulta(nuevaPagina);
    }
  };

  return (
    <div className="container">
      <h4>Consulta de Ventas</h4>

      <div className="mb-3">
        <label>Tipo de Consulta</label>
        <select
          className="form-select"
          value={tipoConsulta}
          onChange={(e) => setTipoConsulta(e.target.value)}
        >
          <option value="todas">Todas</option>
          <option value="fechas">Por Fechas</option>
        </select>
      </div>

      {tipoConsulta === "fechas" && (
        <div className="mb-3 d-flex gap-2">
          <input
            type="date"
            className="form-control"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
          <input
            type="date"
            className="form-control"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
          <button
            className="btn btn-secondary"
            onClick={() => ejecutarConsulta(0)}
            disabled={loading}
          >
            {loading ? "Cargando..." : "Buscar Ventas"}
          </button>
        </div>
      )}

      {mensaje && <div className="alert alert-danger">{mensaje}</div>}

      <TablaConsultaVentas
        ventas={ventas}
        paginaActual={pagina}
        totalPaginas={totalPaginas}
        cambiarPagina={cambiarPagina}
        onSeleccionar={(venta) => console.log("Venta seleccionada:", venta)}
      />
    </div>
  );
};

export default ConsultaVentas;*/