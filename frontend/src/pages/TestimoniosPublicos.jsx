import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter, Calendar, Tag, ChevronDown, ArrowUpDown } from 'lucide-react';
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

export default function TestimoniosPublicos({ nombreAutora }) {
  const [testimonios, setTestimonios] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState('Todas');
  const [filtroFecha, setFiltroFecha] = useState('Todas');
  const [orden, setOrden] = useState('recientes');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    axios.get('https://backend-sudafrica.onrender.com/api/testimonios')
      .then(response => {
        const datosAutor = response.data.reverse().filter(t => t.autora === nombreAutora);
        setTestimonios(datosAutor); 
        setCargando(false);
      })
      .catch(error => {
        console.error("Error al cargar testimonios.");
        setCargando(false);
      });
  }, [nombreAutora]);

  const fechasUnicas = ['Todas', ...new Set(testimonios.map(t => t.fechaLocal.split(',')[0].trim()))];
  const opcionesFecha = fechasUnicas.map(f => ({ valor: f, etiqueta: f === 'Todas' ? 'Fecha: Todas' : f }));

  const testimoniosFiltrados = testimonios.filter(t => {
    const pasaCategoria = filtroCategoria === 'Todas' || t.categoria === filtroCategoria;
    const pasaFecha = filtroFecha === 'Todas' || t.fechaLocal.includes(filtroFecha);
    return pasaCategoria && pasaFecha;
  });

  const testimoniosOrdenados = orden === 'recientes' 
    ? testimoniosFiltrados 
    : [...testimoniosFiltrados].reverse();

  return (
    <div className="testimonios-container" style={{ paddingBottom: '20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px', marginTop: '20px' }}>
        <h1 style={{ color: '#c06c33', fontSize: '26px', margin: 0 }}>Diario de Viaje</h1>
        <p style={{ color: '#666', marginTop: '5px' }}>Sudáfrica - Escrito por {nombreAutora}</p>
      </div>

      <div className="panel-filtros">
        <div className="titulo-filtros"><Filter size={16} /> Filtros de búsqueda</div>
        
        <div className="fila-selectores-modernos">
          <SelectorCustom 
            icono={Tag} valor={filtroCategoria} alCambiar={setFiltroCategoria}
            opciones={[
              { valor: 'Todas', etiqueta: 'Cat: Todas' },
              { valor: 'Testimonio', etiqueta: 'Testimonios' },
              { valor: 'Oración', etiqueta: 'Oraciones' },
              { valor: 'Historia', etiqueta: 'Historias' }
            ]} 
          />
          <SelectorCustom 
            icono={Calendar} valor={filtroFecha} alCambiar={setFiltroFecha}
            opciones={opcionesFecha} 
          />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <button 
          style={{ 
            backgroundColor: '#ffffff', 
            color: '#c06c33', 
            border: '1px solid #f0d8c8', 
            borderRadius: '20px', 
            padding: '8px 16px', 
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
          }}
          onClick={() => setOrden(orden === 'recientes' ? 'antiguos' : 'recientes')}
        >
          <ArrowUpDown size={16} />
          {orden === 'recientes' ? 'Orden: Más recientes' : 'Orden: Más antiguos'}
        </button>
      </div>

      <div className="lista-locales">
        {cargando ? (
          <p className="lista-vacia">Cargando historias...</p>
        ) : testimoniosOrdenados.length === 0 ? (
          <div className="lista-vacia">
            <Search size={40} color="#ccc" style={{ marginBottom: '10px' }} />
            <p>No hay historias publicadas con estos filtros.</p>
          </div>
        ) : (
          testimoniosOrdenados.map((item) => (
            <div key={item.id} className={`nota-local borde-${nombreAutora.toLowerCase()}`}>
              <div className="nota-header">
                <span className={`badge ${item.categoria.toLowerCase()}`}>{item.categoria}</span>
                <span className="nota-autora">{item.fechaLocal}</span>
              </div>
              <p>{item.contenido}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}