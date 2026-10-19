import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CloudUpload, Save, BookOpen, User, Tag, ChevronDown, Pencil, Trash2, AlertTriangle } from 'lucide-react';
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

export default function Testimonios() {
  const [autora, setAutora] = useState('Cami');
  const [categoria, setCategoria] = useState('Testimonio');
  const [contenido, setContenido] = useState('');
  const [guardadosLocal, setGuardadosLocal] = useState([]);
  const [estadoSync, setEstadoSync] = useState('');
  const [testimonioABorrar, setTestimonioABorrar] = useState(null);

  useEffect(() => {
    const notasGuardadas = JSON.parse(localStorage.getItem('testimoniosLocales')) || [];
    setGuardadosLocal(notasGuardadas);
  }, []);

  const guardarLocalmente = () => {
    if (contenido.trim() === '') return;
    const nuevoTestimonio = {
      autora,
      categoria,
      contenido,
      fechaLocal: new Date().toLocaleString()
    };
    const nuevosGuardados = [nuevoTestimonio, ...guardadosLocal];
    setGuardadosLocal(nuevosGuardados);
    localStorage.setItem('testimoniosLocales', JSON.stringify(nuevosGuardados));
    setContenido('');
    setEstadoSync('¡Guardado en el celular! 📱');
    setTimeout(() => setEstadoSync(''), 3000);
  };

  // Función base que elimina silenciosamente de la memoria
  const eliminarNotaSilenciosa = (indexParaBorrar) => {
    const nuevosGuardados = guardadosLocal.filter((_, index) => index !== indexParaBorrar);
    setGuardadosLocal(nuevosGuardados);
    localStorage.setItem('testimoniosLocales', JSON.stringify(nuevosGuardados));
  };

  // Cuando tocan el tachito, mostramos nuestro cartel
  const solicitarBorrado = (index) => {
    setTestimonioABorrar(index);
  };

  // Si en el cartel tocan "Sí, borrar"
  const confirmarBorrado = () => {
    if (testimonioABorrar !== null) {
      eliminarNotaSilenciosa(testimonioABorrar);
      setTestimonioABorrar(null);
    }
  };

  // Cuando tocan "Editar" (Manda al texto arriba y borra el de abajo sin preguntar)
  const editarLocalmente = (indexParaEditar) => {
    const testimonio = guardadosLocal[indexParaEditar];
    setAutora(testimonio.autora);
    setCategoria(testimonio.categoria);
    setContenido(testimonio.contenido);
    
    eliminarNotaSilenciosa(indexParaEditar);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sincronizarNube = async () => {
    if (guardadosLocal.length === 0) return;
    setEstadoSync('Sincronizando... ⏳');
    try {
      await axios.post('http://localhost:8080/api/testimonios/sync', guardadosLocal);
      setGuardadosLocal([]);
      localStorage.removeItem('testimoniosLocales');
      setEstadoSync('¡Sincronización exitosa! ☁️✅');
    } catch (error) {
      setEstadoSync('Error de conexión. Intenten más tarde.');
    }
    setTimeout(() => setEstadoSync(''), 4000);
  };

  return (
    <div className="testimonios-container">
      <div className="testimonios-header">
        <h1>Testimonios</h1>
        <p>Cuenten a las naciones su gloria, sus maravillas a todos los pueblos.</p>
        <Link to="/historial" className="btn-ir-historial">
          <BookOpen size={18} />
          Ver nuestros testimonios guardados
        </Link>
      </div>

      <div className="formulario-card">
        <div className="fila-selectores-modernos">
          <SelectorCustom 
            icono={User} valor={autora} alCambiar={setAutora}
            opciones={[{ valor: 'Cami', etiqueta: 'Soy Cami' }, { valor: 'Mili', etiqueta: 'Soy Mili' }]} 
          />
          <SelectorCustom 
            icono={Tag} valor={categoria} alCambiar={setCategoria}
            opciones={[{ valor: 'Testimonio', etiqueta: 'Testimonio' }, { valor: 'Oración', etiqueta: 'Oración' }, { valor: 'Historia', etiqueta: 'Historia' }]} 
          />
        </div>

        <textarea 
          placeholder="¿Qué vivieron hoy? ¿Por quién oraron?..."
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
        />

        <button className="btn-guardar" onClick={guardarLocalmente}>
          <Save size={18} /> Guardar
        </button>
      </div>

      <div className="seccion-sincronizacion">
        <div className="sincronizacion-header">
          <h3>Por subir a la nube ({guardadosLocal.length})</h3>
          <button 
            className={`btn-sync ${guardadosLocal.length === 0 ? 'disabled' : ''}`}
            onClick={sincronizarNube}
            disabled={guardadosLocal.length === 0}
          >
            <CloudUpload size={18} /> Sincronizar
          </button>
        </div>

        <div className="lista-locales">
          {guardadosLocal.map((item, index) => (
            <div key={index} className="nota-local">
              <div className="nota-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className={`badge ${item.categoria.toLowerCase()}`}>{item.categoria}</span>
                  <span className="nota-autora">Escrito por {item.autora}</span>
                </div>
                
                <div className="nota-acciones">
                  <button onClick={() => editarLocalmente(index)} className="btn-icono editar"><Pencil size={14} /></button>
                  <button onClick={() => solicitarBorrado(index)} className="btn-icono borrar"><Trash2 size={14} /></button>
                </div>
              </div>
              <p>{item.contenido}</p>
              <span className="nota-fecha">{item.fechaLocal}</span>
            </div>
          ))}
        </div>
      </div>

      {testimonioABorrar !== null && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-icono">
              <AlertTriangle size={32} color="#c2185b" />
            </div>
            <h3>¿Borrar testimonio?</h3>
            <p>Esta acción no se puede deshacer. Se perderá todo lo que escribiste en esta nota.</p>
            <div className="modal-botones">
              <button className="btn-modal-cancelar" onClick={() => setTestimonioABorrar(null)}>
                Cancelar
              </button>
              <button className="btn-modal-borrar" onClick={confirmarBorrado}>
                Sí, borrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}