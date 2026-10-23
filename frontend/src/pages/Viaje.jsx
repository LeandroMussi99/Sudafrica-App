import React, { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';
import './Viaje.css';

export default function Viaje() {
  const [diaActualViaje, setDiaActualViaje] = useState(0);
  const [mediaAmpliada, setMediaAmpliada] = useState(null); 
  
  const fechaInicioViaje = new Date("2026-10-22T00:00:00").getTime();

  useEffect(() => {
    const calcularDia = () => {
      const hoy = new Date().getTime();
      const diferenciaDias = Math.floor((hoy - fechaInicioViaje) / (1000 * 60 * 60 * 24));
      
      if (diferenciaDias < 1) setDiaActualViaje(0);
      else if (diferenciaDias > 10) setDiaActualViaje(10);
      else setDiaActualViaje(diferenciaDias);
    };

    calcularDia();
    const intervalo = setInterval(calcularDia, 3600000); 
    return () => clearInterval(intervalo);
  }, []);

  const diasViaje = [
    { dia: 1, autor: "Mia", mensaje: "¡Espero que hayan disfrutado el viaje de ida! No tengo dudas que Su luz ya está resplandeciendo. Las amo! Disfruten esta travesía con el señor y cuéntenos con lujo de detalles cada testimonio✨", archivo: "sorpresas/foto1.webp", tipo: "imagen" },
    { dia: 2, autor: "Magui",archivo: "sorpresas/video2.mp4", tipo: "video" },
    { dia: 3, autor: "Lean", mensaje: "Otra vez yo probablemente no se cargo la sorpresa conectense a internet y recargueen. ¡Fuerza hoy!", archivo: "sorpresas/foto3.webp", tipo: "imagen" },
    { dia: 4, autor: "Lean", mensaje: "Hola mi nombre es Lean me conoceran como en videos de hoy no se cargo la sorpresa", archivo: "sorpresas/video4.mp4", tipo: "video" },
    { dia: 5, autor: "Lean", mensaje: "Dia 5 no hay señales de la sorpresa soy otra vez yo, estas imagenes nunca debieron salir a la luz", archivo: "sorpresas/foto5.webp", tipo: "imagen" },
    { dia: 6, autor: "Lean", mensaje: "Creo que en el video le erre al dia nose ya me canse de grabar espero que esten cargadas las sorpresas reales adiooos.", archivo: "sorpresas/video6.mp4", tipo: "video" },
    { dia: 7, autor: "Lean", mensaje: "Adicto a la tiiiiiiintaaaaaaaa.", archivo: "sorpresas/foto7.webp", tipo: "imagen" },
    { dia: 8, autor: "Lean", mensaje: "Bueno estas ultimas son fotos de cosas que le gustan a ustedes, para Mili foto de un bebe tierno, la que sigue es para Cami", archivo: "sorpresas/foto8.webp", tipo: "imagen" },
    { dia: 9, autor: "Lean", mensaje: "Esta es para Cami, BTS en Argentinaaaaaaaaaa.", archivo: "sorpresas/foto9.webp", tipo: "imagen" },
    { dia: 10,autor: "Lean", mensaje: "Y algo que le guste a las dos Jesus.", archivo: "sorpresas/foto10.webp", tipo: "imagen" }
  ];

  return (
    <div className="viaje-container">
      <div className="viaje-header">
        <h1>Abrazos a la distancia</h1>
        <p className="subtitulo-viaje">A UN OCÉANO DE DISTANCIA, UNA SORPRESA CADA DÍA</p>
        <div className="contador-dias">
          {diaActualViaje === 0 ? "Faltan días para arrancar" : `Día ${diaActualViaje} de 10`}
        </div>
      </div>

      <div className="timeline-horizontal">
        <div className="espaciador-inicial"></div>
        {diasViaje.map((item) => {
          const estaDesbloqueado = item.dia <= diaActualViaje;

          return (
            <div key={item.dia} className={`tarjeta-dia ${estaDesbloqueado ? 'desbloqueada' : 'bloqueada'}`}>
              <div className="tarjeta-numero">Día {item.dia}</div>
              
              {estaDesbloqueado ? (
                <div className="tarjeta-contenido">
                  {item.tipo === 'video' ? (
                    <video 
                      className="tarjeta-video" 
                      controls 
                      playsInline
                      onClick={() => setMediaAmpliada(item)}
                      style={{ cursor: 'zoom-in' }}
                    >
                      <source src={`/${item.archivo}`} type="video/mp4" />
                    </video>
                  ) : (
                    <div 
                      className="tarjeta-imagen" 
                      style={{ backgroundImage: `url(/${item.archivo})`, cursor: 'zoom-in' }}
                      onClick={() => setMediaAmpliada(item)} 
                    ></div>
                  )}
                  
                  <div className="tarjeta-texto">
                    <h3>{item.autor}{item.mensaje ? " dice:" : ""}</h3>
                     {item.mensaje && <p>"{item.mensaje}"</p>}
                  </div>
                </div>
              ) : (
                <div className="tarjeta-secreta">
                  <Lock size={40} color="#c06c33" strokeWidth={1.5} />
                  <p>Disponible el día {item.dia}</p>
                </div>
              )}
            </div>
          );
        })}
        <div className="espaciador-final"></div>
      </div>

      {/* --- MODAL DE PANTALLA COMPLETA --- */}
      {mediaAmpliada && (
        <div 
          onClick={() => setMediaAmpliada(null)} 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            cursor: 'zoom-out',
            padding: '20px'
          }}
        >
          {mediaAmpliada.tipo === 'video' ? (
            <video 
              src={`/${mediaAmpliada.archivo}`} 
              controls 
              autoPlay 
              style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '10px' }} 
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <img 
              src={`/${mediaAmpliada.archivo}`} 
              alt="Sorpresa Ampliada" 
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '10px' }}
            />
          )}
        </div>
      )}
    </div>
  );
}