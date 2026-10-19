import React, { useState, useEffect } from 'react';
import { BookOpen, Heart, Smile } from 'lucide-react';
import './Inicio.css';

export default function Inicio() {
  const [revelado, setRevelado] = useState(false);
  const [palabraHoy, setPalabraHoy] = useState(null);
  const [categoriaActiva, setCategoriaActiva] = useState('saludos');

  const versiculos = [
    { texto: "Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes, porque tu Dios estará contigo.", cita: "Josué 1:9" },
    { texto: "Dejad a los niños venir a mí, y no se lo impidáis; porque de los tales es el reino de Dios.", cita: "Marcos 10:14" },
    { texto: "Todo lo puedo en Cristo que me fortalece.", cita: "Filipenses 4:13" },
    { texto: "El Señor es mi luz y mi salvación; ¿de quién temeré?", cita: "Salmo 27:1" },
    { texto: "Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien.", cita: "Romanos 8:28" },
    { texto: "Vosotros sois la luz del mundo; una ciudad asentada sobre un monte no se puede esconder.", cita: "Mateo 5:14" },
    { texto: "No nos cansemos, pues, de hacer bien; porque a su tiempo segaremos, si no desmayamos.", cita: "Gálatas 6:9" },
    { texto: "Porque donde están dos o tres congregados en mi nombre, allí estoy yo en medio de ellos.", cita: "Mateo 18:20" },
    { texto: "Echando toda vuestra ansiedad sobre él, porque él tiene cuidado de vosotros.", cita: "1 Pedro 5:7" },
    { texto: "El amor es sufrido, es benigno; el amor no tiene envidia, no hace sinrazón, no se envanece.", cita: "1 Corintios 13:4" },
    { texto: "Lámpara es a mis pies tu palabra, y lumbrera a mi camino.", cita: "Salmo 119:105" },
    { texto: "Hagan todo con amor.", cita: "1 Corintios 16:14" },
    { texto: "Pero los que esperan a Jehová tendrán nuevas fuerzas; levantarán alas como las águilas; correrán, y no se cansarán.", cita: "Isaías 40:31" },
    { texto: "Y la paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones y vuestros pensamientos.", cita: "Filipenses 4:7" },
    { texto: "Confía en el Señor de todo corazón, y no en tu propia inteligencia.", cita: "Proverbios 3:5" },
    { texto: "Él responde a los que lo llaman, a los que lo invocan con sinceridad.", cita: "Salmo 145:18" },
    { texto: "Porque yo sé los pensamientos que tengo acerca de vosotros, pensamientos de paz, y no de mal.", cita: "Jeremías 29:11" },
    { texto: "Jesús le dijo: ¿No te he dicho que si crees, verás la gloria de Dios?", cita: "Juan 11:40" },
    { texto: "Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios en toda oración.", cita: "Filipenses 4:6" },
    { texto: "Jehová es mi pastor; nada me faltará.", cita: "Salmo 23:1" }
  ];

  useEffect(() => {
    const diaDelAño = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const indice = diaDelAño % versiculos.length;
    setPalabraHoy(versiculos[indice]);
  }, []);

  // Glosario Misionero con Fonética
  const glosario = {
    saludos: [
      { esp: "Hola (a uno)", loc: "Sawubona", pron: "sa-wu-BÓ-na" },
      { esp: "Hola (a varios)", loc: "Sanibonani", pron: "sa-ni-bo-NÁ-ni" },
      { esp: "¿Cómo están?", loc: "Ninjani?", pron: "nin-YÁ-ni" },
      { esp: "Estamos bien", loc: "Siyaphila", pron: "si-ya-PÍ-la" },
      { esp: "¿Cómo te llamás?", loc: "Ungubani igama lakho?", pron: "un-gu-BÁ-ni i-GÁ-ma LÁ-ko" },
      { esp: "Gracias", loc: "Ngiyabonga", pron: "n-gi-ya-BÓN-ga" }
    ],
    ninos: [
      { esp: "Vamos a jugar", loc: "Asidlale", pron: "a-si-DLÁ-le" },
      { esp: "Vengan acá", loc: "Wozani la", pron: "wo-ZÁ-ni la" },
      { esp: "¡Muy bien!", loc: "Kuhle kakhulu!", pron: "KÚ-kle ka-KÚ-lu" },
      { esp: "Cantemos", loc: "Asicule", pron: "a-si-KÚ-le" },
      { esp: "¡Sonreí!", loc: "Mamatheka!", pron: "ma-ma-TÉ-ka" }
    ],
    fe: [
      { esp: "Dios te ama", loc: "UNkulunkulu uyakuthanda", pron: "un-ku-lun-KÚ-lu u-ya-ku-TÁN-da" },
      { esp: "Jesús es Señor", loc: "UJesu uyiNkosi", pron: "u-YÉ-su u-yin-KÓ-si" },
      { esp: "Dios te bendiga", loc: "Inkosi ikubusise", pron: "in-KÓ-si i-ku-bu-SÍ-se" },
      { esp: "¿Puedo orar por vos?", loc: "Ngingakuthandazela na?", pron: "ngin-ga-ku-tan-da-ZÉ-la na" },
      { esp: "Creé / Tené fe", loc: "Kholwa", pron: "KÓL-wa" }
    ]
  };

  return (
    <div className="inicio-container">
      <div className="inicio-header">
        <h1>El Llamado de Cami y Mili</h1>
        <p>INSTRUMENTOS DE SU GRACIA EN TIERRAS AFRICANAS</p>
      </div>

      <div className="nube-container" onClick={() => setRevelado(!revelado)}>
        {!revelado ? (
          <div className="nube-cerrada">
            <span className="nube-prompt">Toca para revelar la palabra de hoy</span>
          </div>
        ) : (
          <div className="nube-abierta">
            <p className="versiculo-texto">"{palabraHoy?.texto}"</p>
            <p className="versiculo-cita">{palabraHoy?.cita}</p>
          </div>
        )}
      </div>

      {/* Glosario Misionero */}
      <div className="card-glosario">
        <div className="glosario-header">
          <h3>Glosario de Campo</h3>
          <span className="idioma-tag">Zulú / Siswati</span>
        </div>

        <div className="glosario-tabs">
          <button 
            className={`tab-btn ${categoriaActiva === 'saludos' ? 'active' : ''}`}
            onClick={() => setCategoriaActiva('saludos')}
          >
            <Smile size={16} /> Básicas
          </button>
          <button 
            className={`tab-btn ${categoriaActiva === 'ninos' ? 'active' : ''}`}
            onClick={() => setCategoriaActiva('ninos')}
          >
            <Heart size={16} /> Niños
          </button>
          <button 
            className={`tab-btn ${categoriaActiva === 'fe' ? 'active' : ''}`}
            onClick={() => setCategoriaActiva('fe')}
          >
            <BookOpen size={16} /> Misión
          </button>
        </div>

        <div className="glosario-lista">
          {glosario[categoriaActiva].map((item, index) => (
            <div key={index} className="glosario-item">
              <span className="frase-esp">{item.esp}</span>
              <div className="frase-loc-container">
                <span className="frase-loc">{item.loc}</span>
                <span className="frase-pron">"{item.pron}"</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}