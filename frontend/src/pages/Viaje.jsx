import React, { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';
import './Viaje.css';

export default function Viaje() {
  const [diaActualViaje, setDiaActualViaje] = useState(0);
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
    { dia: 1, autor: "Bondiolas", mensaje: "¡Llegaron! Que este primer día sea una locura hermosa. Las amo.", archivo: "sorpresas/foto1.jpg", tipo: "imagen" },
    { dia: 2, autor: "Ro", mensaje: "Cuidense mucho y disfruten cada sonrisa de esos nenes.", archivo: "sorpresas/foto2.jpg", tipo: "imagen" },
    { dia: 3, autor: "Agus y Eze", mensaje: "Ya las extraño, pero sé que están haciendo algo increíble. ¡Fuerza hoy!", archivo: "sorpresas/foto3.jpg", tipo: "imagen" },
    { dia: 4, autor: "Mia", mensaje: "¡Acá estamos haciendo el aguante! Rompanla toda.", archivo: "sorpresas/video4.mp4", tipo: "video" },
    { dia: 5, autor: "Sofi y Emma", mensaje: "Mitad de viaje. Tómense un segundo para respirar y mirar el atardecer.", archivo: "sorpresas/foto5.jpg", tipo: "imagen" },
    { dia: 6, autor: "Magui y Diame", mensaje: "No importa si están cansadas, miren lo que lograron hasta ahora.", archivo: "sorpresas/foto6.jpg", tipo: "imagen" },
    { dia: 7, autor: "Santis", mensaje: "Un abrazo gigante desde casa. Estamos muy orgullosos.", archivo: "sorpresas/foto7.jpg", tipo: "imagen" },
    { dia: 8, autor: "Gabi y Dami", mensaje: "Ya casi vuelven, guarden todas las historias para contarnos.", archivo: "sorpresas/video8.mp4", tipo: "video" },
    { dia: 9, autor: "Vivi y Jorge", mensaje: "Últimos días, dejen todo en la cancha que acá las esperamos con mates.", archivo: "sorpresas/foto9.jpg", tipo: "imagen" },
    { dia: 10, autor: "Bondiolas", mensaje: "¡Misión cumplida! Buen viaje de vuelta, prepárense para los abrazos.", archivo: "sorpresas/foto10.jpg", tipo: "imagen" }
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
                    <video className="tarjeta-video" controls playsInline>
                      <source src={`/${item.archivo}`} type="video/mp4" />
                    </video>
                  ) : (
                    <div className="tarjeta-imagen" style={{ backgroundImage: `url(/${item.archivo})` }}></div>
                  )}
                  
                  <div className="tarjeta-texto">
                    <h3>{item.autor} dice:</h3>
                    <p>"{item.mensaje}"</p>
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
    </div>
  );
}