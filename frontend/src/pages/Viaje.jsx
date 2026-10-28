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
    { dia: 2, autor: "Magui", archivo: "sorpresas/video2.mp4", tipo: "video" },
    { dia: 3, autor: "Ro", mensaje: "Saben que no quería grabar asi que mas les vale apreciarlo mas", archivo: "sorpresas/video3.mp4", tipo: "video" },
    { dia: 4, autor: "Sofi y Emma", archivo: "sorpresas/video4.mp4", tipo: "video" },
    { dia: 5, autor: "Santi, Agus y Fabi", archivo: "sorpresas/video5.mp4", tipo: "video" },
    { dia: 6, autor: "Lean y Eze", mensaje: "Porque el Espíritu de Dios no nos hace cobardes. Al contrario, nos da poder para amar a los demás, y nos fortalece para que podamos vivir una buena vida cristiana. Timoteo 1:7", archivo: "sorpresas/video6.mp4", tipo: "video" },
    { dia: 7, autor: "Diame", archivo: "sorpresas/video7.mp4", tipo: "video" },
    { dia: 8, autor: "Jorge y Vivi", archivo: "sorpresas/video8.mp4", tipo: "video" },
    { dia: 9, autor: "Dami y Gabi", archivo: "sorpresas/video9.mp4", tipo: "video" },
    { dia: 10, autor: "Los Bondiola", mensaje: "Y algo que le guste a las dos Jesus.", archivo: "sorpresas/foto10.webp", tipo: "imagen" }
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
                    <h3>
                      {item.autor}
                      {item.mensaje ? (item.autor.includes(" y ") ? " dicen:" : " dice:") : ""}
                    </h3>
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