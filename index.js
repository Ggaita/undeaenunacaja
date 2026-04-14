const audio = document.getElementById("audio");
const opcionesDiv = document.getElementById("opciones");
const btnInicio = document.getElementById("btnInicio");
const btnReiniciar = document.getElementById("btnReiniciar");

// COMIENZO Spech Synthesis
const historia = {
  inicio: {
    audio: "./src/inicio.mp3",
    opciones: [
      { texto: "Comenzar", siguiente: "inicioOpciones" }
    ]
  },


//INICIO -- Modos de Simulacion (Automatico o Semiautomatico) Pahts para cada uno de los modos

  inicioOpciones: {
    opciones: [
      { texto: "Automatico", siguiente: "automatico" },
      { texto: "Semiautomatico", siguiente: "semiautomatico" }
    ]
  },

//FIN -- Opciones para cada uno de los modos (Automatico o Semiautomatico) Pahts para cada uno de los modos


//INICIO -- Modo Automatico
  automatico: {
    audio: "./src/automatico.mp3",
    opciones: [
      { texto: "Comenzar", siguiente: "etapaparches" }
    ]
  },

//FIN -- Modo Automatico

//INICIO -- Modo Semiautomatico

  semiautomatico: {
    audio: "./src/semiautomatico.mp3",
    opciones: [
      { texto: "Comenzar", siguiente: "etapaParches" }
    ]
  },

//FIN -- Modo Semiautomatico


//INICIO -- Modos Compartidos (Automatico y Semiautomatico)

  etapaParches: {
    audio: "./src/comienzo.mp3",
    opciones: [
      { texto: "No", siguiente: "etapaParches", clase: "btn-rojo" },
      { texto: "Sí", siguiente: "analisisRitmo", clase:"btn-verde" }
    ]
  },

  analisisRitmo: {
    audio: "./src/analizandoRitmo.mp3",
    opciones: [
      { texto: "No Desfibrilable", siguiente: "ritmoNoDesfibrilable"},
      { texto: "Desfibrilable", siguiente: "ritmoDesfibrilable"}
    ]
  },

  ritmoDesfibrilable: {
    audio: "./src/descargaNecesaria.mp3",
    opciones: [
      { texto: "NO Siguen Indicaciones", siguiente: "ritmoDesfibrilable", clase: "btn-rojo" },
      { texto: "Siguen Indicaciones", siguiente: "continuaRcp", clase:"btn-verde" }
    ]
  },

  continuaRcp: {
    audio: "./src/descargaRealizada.mp3",
    opciones: [
      { texto: "No Siguen la RCP", siguiente: "continuaRcp", clase: "btn-rojo" },
      { texto: "Síguen la RCP", siguiente: "metronomo", clase:"btn-verde" }
    ]
  },

  ritmoNoDesfibrilable: {
    audio: "./src/ritmoNoDesfibrilable.mp3",
    opciones: [
      { texto: "No Siguen la RCP", siguiente: "ritmoNoDesfibrilable", clase: "btn-rojo" },
      { texto: "Síguen la RCP", siguiente: "metronomo", clase:"btn-verde" }
    ]
  },  

  metronomo: {
    audio: "./src/metronomo120min2.mp3",
    opciones: [
      { texto: "Siguen el Ritmo", siguiente: "final", clase:"btn-verde" }
    ]
  },


//FIN -- Modos Compartidos (Automatico y Semiautomatico)


  final: {
    audio: "./src/final.mp3",
    opciones: []
  }
};

let estadoActual = "inicioOpciones";

// 🔊 reproducir
function reproducir(src) {
  audio.src = src;
  audio.currentTime = 0;
  audio.play();
}

// 🔄 cambiar estado
function cambiarEstado(estado) {
  estadoActual = estado;
  const nodo = historia[estado];

  reproducir(nodo.audio);

  opcionesDiv.innerHTML = "";

  // 👉 SOLO para metronomo
  if (estado === "metronomo") {
    audio.onended = () => {
      cambiarEstado("analisisRitmo");
    };
  } else {
    audio.onended = null; // limpiar para otros estados
  }

nodo.opciones.forEach(op => {
  const btn = document.createElement("button");
  btn.textContent = op.texto;

  // 👉 agregar clase si está definida
  if (op.clase) {
    btn.classList.add(op.clase);
  }

  btn.onclick = () => cambiarEstado(op.siguiente);
  opcionesDiv.appendChild(btn);
});
}

// ▶️ iniciar
function empezar() {
  btnInicio.style.display = "none";
  opcionesDiv.style.display = "block";
  btnReiniciar.style.display = "block";

  cambiarEstado("inicio");
}

// 🔁 reiniciar (NO vuelve al botón inicial)
function reiniciar() {
  cambiarEstado("inicioOpciones");
}