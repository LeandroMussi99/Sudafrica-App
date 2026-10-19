import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeft, Search, Filter, Calendar, User, Tag, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Testimonios.css'; 

const SelectorCustom = ({ valor, opciones, alCambiar, icono: Icono }) => {
  const [abierto, setAbierto] = useState(false);
  return (
    <div className="dropdown-pro" onMouseLeave={() => setAbierto(false)}>
      <div className="dropdown-pro-header" onClick={() => setAbierto(!abierto)}>
        {Icono && <Icono size={16} className="icono-input" />}
        <span>{opciones.find(op => op.valor === valor)?.etiqueta}</span>
        <ChevronDown size={16} className="icono-flecha" style={{ transform: abierto ? 'rotate(180deg)' : 'none' }} />
      </div>
      {abierto && (
        <div className="dropdown-pro-lista">
          {opciones.map(op => (
            <div 
              key={op.valor} 
              className={`dropdown-pro-item ${valor === op.valor ? 'seleccionado' : ''}`}
              onClick={() => { alCambiar(op.valor); setAbierto(false); }}
            >
              {op.etiqueta}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Historial() {
  const [testimonios, setTestimonios] = useState([]);
  const [filtroAutora, setFiltroAutora] = useState('Todas');
  const [filtroCategoria, setFiltroCategoria] = useState('Todas');
  const [filtroFecha, setFiltroFecha] = useState('Todas');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // 1. Apenas entran, buscamos si hay un backup viejo guardado en el celu
    const backupLocal = JSON.parse(localStorage.getItem('historialBackup')) || [];
    if (backupLocal.length > 0) {
      setTestimonios(backupLocal);
      setCargando(false);
    }

    // 2. Intentamos conectarnos a tu base de datos para traer lo más nuevo
    axios.get('https://backend-sudafrica.onrender.com/api/testimonios')
      .then(response => {
        const datosNuevos = response.data.reverse();
        setTestimonios(datosNuevos); 
        localStorage.setItem('historialBackup', JSON.stringify(datosNuevos));
        setCargando(false);
      })
      .catch(error => {
        console.error("No hay internet. Mostrando el backup local.");
        setCargando(false);
      });
  }, []);

  // Extraemos las fechas únicas que existen en la base de datos
  const fechasUnicas = ['Todas', ...new Set(testimonios.map(t => t.fechaLocal.split(',')[0].trim()))];
  const opcionesFecha = fechasUnicas.map(f => ({ valor: f, etiqueta: f === 'Todas' ? 'Fecha: Todas' : f }));

  const testimoniosFiltrados = testimonios.filter(t => {
    const pasaAutora = filtroAutora === 'Todas' || t.autora === filtroAutora;
    const pasaCategoria = filtroCategoria === 'Todas' || t.categoria === filtroCategoria;
    const pasaFecha = filtroFecha === 'Todas' || t.fechaLocal.includes(filtroFecha);
    return pasaAutora && pasaCategoria && pasaFecha;
  });

  return (
    <div className="testimonios-container">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <Link to="/testimonios" style={{ color: '#c06c33', marginRight: '15px' }}>
          <ArrowLeft size={28} />
        </Link>
        <h1 style={{ color: '#c06c33', fontSize: '22px', margin: 0 }}>Nuestros Recuerdos</h1>
      </div>

      <div className="panel-filtros">
        <div className="titulo-filtros"><Filter size={16} /> Filtros de búsqueda</div>
        
        <div className="fila-selectores-modernos">
          <SelectorCustom 
            icono={User} valor={filtroAutora} alCambiar={setFiltroAutora}
            opciones={[
              { valor: 'Todas', etiqueta: 'Autor: Todas' },
              { valor: 'Cami', etiqueta: 'Cami' },
              { valor: 'Mili', etiqueta: 'Mili' }
            ]} 
          />
          <SelectorCustom 
            icono={Tag} valor={filtroCategoria} alCambiar={setFiltroCategoria}
            opciones={[
              { valor: 'Todas', etiqueta: 'Cat: Todas' },
              { valor: 'Testimonio', etiqueta: 'Testimonios' },
              { valor: 'Oración', etiqueta: 'Oraciones' },
              { valor: 'Historia', etiqueta: 'Historias' }
            ]} 
          />
        </div>

        <SelectorCustom 
          icono={Calendar} valor={filtroFecha} alCambiar={setFiltroFecha}
          opciones={opcionesFecha} 
        />
      </div>

      <div className="lista-locales">
        {cargando ? (
          <p className="lista-vacia">Buscando en la nube...</p>
        ) : testimoniosFiltrados.length === 0 ? (
          <div className="lista-vacia">
            <Search size={40} color="#ccc" style={{ marginBottom: '10px' }} />
            <p>No hay testimonios con estos filtros.</p>
          </div>
        ) : (
          testimoniosFiltrados.map((item) => (
            <div key={item.id} className="nota-local" style={{ borderColor: '#6b705c' }}>
              <div className="nota-header">
                <span className={`badge ${item.categoria.toLowerCase()}`}>{item.categoria}</span>
                <span className="nota-autora">Escrito por {item.autora}</span>
              </div>
              <p>{item.contenido}</p>
              <span className="nota-fecha">Fecha: {item.fechaLocal}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}