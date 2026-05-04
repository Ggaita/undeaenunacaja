const audio = document.getElementById("audio");
const opcionesDiv = document.getElementById("opciones");
const btnInicio = document.getElementById("btnInicio");
const btnReiniciar = document.getElementById("btnReiniciar");
const textoEstado = document.getElementById("textoEstado");

// COMIENZO Spech Synthesis
const historia = {
  inicio: {
    audio: "./src/inicio.mp3",
    texto: "Dale click a comenzar para iniciar la simulación",
    opciones: [
      { texto: "Comenzar", siguiente: "inicioOpciones", clase: "btn-opciones" }
    ]
  },


//INICIO -- Modos de Simulacion (Automatico o Semiautomatico) Pahts para cada uno de los modos

  inicioOpciones: {
    texto: "Opciones de simulación:",
    audio: "./src/opcionesdesimulacion.mp3",
    opciones: [
      { texto: "Automatico", siguiente: "automatico", clase: "btn-opciones"},
      { texto: "Semiautomatico", siguiente: "semiautomatico", clase: "btn-opciones"}
    ]
  },

//FIN -- Opciones para cada uno de los modos (Automatico o Semiautomatico) Pahts para cada uno de los modos


//INICIO -- Modo Automatico
  automatico: {
    audio: "./src/modoAutomatico.mp3",
    texto: "Has seleccionado el modo automático. En este modo, la simulación se desarrollará de manera fluida. Siga la práctica y observa cómo se desarrolla la situación seleccione las opciones necesarias.",
    opciones: [
      { texto: "Comenzar", siguiente: "etapaParchesautomatico", clase: "btn-opciones" }
    ]
  },

  etapaParchesautomatico: {
    audio: "./src/comienzo.mp3",
    texto: "¿Colocan los parches correctamente?",
    opciones: [
      { texto: "No", siguiente: "etapaParches2Automatico", clase: "btn-rojo" },
      { texto: "Sí", siguiente: "analisisRitmoAutomatico", clase: "btn-verde" }
    ]
  },

  etapaParches2Automatico: {
    audio: "./src/colocarParches2.mp3",
    texto: "¿Colocan los parches correctamente?",
    opciones: [
      { texto: "No", siguiente: "etapaParches2Automatico", clase: "btn-rojo" },
      { texto: "Sí", siguiente: "analisisRitmoAutomatico", clase: "btn-verde" }
    ]
  },


  analisisRitmoAutomatico: {
    audio: "./src/analizandoRitmo.mp3",
    texto: "Seleccione Ritmo:",
    opciones: [
      { texto: "No Desfibrilable", siguiente: "ritmoNoDesfibrilableAutomatico", clase: "btn-verde"},
      { texto: "Desfibrilable", siguiente: "ritmoDesfibrilableAutomaico", clase: "btn-verde"}
    ]
  },

  ritmoDesfibrilableAutomaico: {
    audio: "./src/ritmoDesfibrilableAutomatico.mp3",
    texto: "¿Siguen las indicaciones luego de la descarga?",
    opciones: [
      { texto: "NO Siguen Indicaciones", siguiente: "ritmoDesfibrilableAutomaico", clase: "btn-rojo" },
      { texto: "Siguen Indicaciones", siguiente: "metronomoAutomatico", clase:"btn-verde" }
    ]
  },

  ritmoNoDesfibrilableAutomatico: {
    audio: "./src/ritmoNoDesfibrilable.mp3",
    texto: "¿Siguen la RCP después de la descarga?",
    opciones: [
      { texto: "No Siguen la RCP", siguiente: "ritmoNoDesfibrilableAutomatico", clase: "btn-rojo" },
      { texto: "Síguen la RCP", siguiente: "metronomoAutomatico", clase:"btn-verde" }
    ]
  },  

  metronomoAutomatico: {
    audio: "./src/metronomo.mp3",
    texto: "Espere los 2 minutos para analizar el ritmo nuevamente",
    opciones: [ ]
  },



//FIN -- Modo Automatico

//INICIO -- Modo Semiautomatico

  semiautomatico: {
    audio: "./src/modoSemiautomático.mp3",
    texto: "Has seleccionado el modo semiautomático. En este modo, tendrás la oportunidad de tomar decisiones en momentos clave de la simulación. Presta atención a las indicaciones y elige la opción adecuada para avanzar en la situación.",
    opciones: [
      { texto: "Comenzar", siguiente: "etapaParches", clase: "btn-opciones" }
    ]
  },

    etapaParches: {
    audio: "./src/comienzo.mp3",
    texto: "¿Colocan los parches correctamente?",
    opciones: [
      { texto: "No", siguiente: "etapaParches2", clase: "btn-rojo" },
      { texto: "Sí", siguiente: "analisisRitmo", clase: "btn-verde" }
    ]
  },

  etapaParches2: {
    audio: "./src/colocarParches2.mp3",
    texto: "¿Colocan los parches correctamente?",
    opciones: [
      { texto: "No", siguiente: "etapaParches2", clase: "btn-rojo" },
      { texto: "Sí", siguiente: "analisisRitmo", clase: "btn-verde" }
    ]
  },

  analisisRitmo: {
    audio: "./src/analizandoRitmo.mp3",
    texto: "Seleccione Ritmo:",
    opciones: [
      { texto: "No Desfibrilable", siguiente: "ritmoNoDesfibrilable", clase: "btn-verde"},
      { texto: "Desfibrilable", siguiente: "ritmoDesfibrilable", clase: "btn-verde"}
    ]
  },

  ritmoDesfibrilable: {
    audio: "./src/descargaNecesaria.mp3",
    texto: "¿Siguen las indicaciones para la descarga?",
    opciones: [
      { texto: "NO Siguen Indicaciones", siguiente: "ritmoDesfibrilable", clase: "btn-rojo" },
      { texto: "Siguen Indicaciones", siguiente: "continuaRcp", clase:"btn-verde" }
    ]
  },

  continuaRcp: {
    audio: "./src/descargaRealizada.mp3",
    texto: "¿Siguen la RCP después de la descarga?",
    opciones: [
      { texto: "No Siguen la RCP", siguiente: "continuaRcp", clase: "btn-rojo" },
      { texto: "Síguen la RCP", siguiente: "metronomo", clase:"btn-verde" }
    ]
  },

  ritmoNoDesfibrilable: {
    audio: "./src/ritmoNoDesfibrilable.mp3",
    texto: "¿Siguen la RCP después de la descarga?",
    opciones: [
      { texto: "No Siguen la RCP", siguiente: "ritmoNoDesfibrilable", clase: "btn-rojo" },
      { texto: "Síguen la RCP", siguiente: "metronomo", clase:"btn-verde" }
    ]
  },  

   metronomo: {
    audio: "./src/metronomo.mp3",
    texto: "Espere los 2 minutos para analizar el ritmo nuevamente",
    opciones: [ ]
  },


};

//FIN -- Modo Semiautomatico

// LOGICA

let estadoActual = "inicioOpciones";

// reproducir
function reproducir(src) {
  audio.src = src;
  audio.currentTime = 0;
  audio.play();
}

// cambiar estado
function cambiarEstado(estado) {
  estadoActual = estado;
  const nodo = historia[estado];

  reproducir(nodo.audio);

  opcionesDiv.innerHTML = "";

  if (nodo.texto) {
    textoEstado.textContent = nodo.texto;
  } else {
    textoEstado.textContent = "";
  }


  //  SOLO  metronomo
  if (estado === "metronomo") {
    audio.onended = () => {
      cambiarEstado("analisisRitmo");
    };
  } else if (estado === "metronomoAutomatico") {
    audio.onended = () => {
      cambiarEstado("analisisRitmoAutomatico");
    };
  } else {
    audio.onended = null; 
  }

nodo.opciones.forEach(op => {
  const btn = document.createElement("button");
  btn.textContent = op.texto;

  // agregar clase si está definida
  if (op.clase) {
    btn.classList.add(op.clase);
  }

  btn.onclick = () => cambiarEstado(op.siguiente);
  opcionesDiv.appendChild(btn);
});
}

// iniciar
function empezar() {
  btnInicio.style.display = "none";
  opcionesDiv.style.display = "block";
  btnReiniciar.style.display = "block";

  cambiarEstado("inicio");
}


// reiniciar (NO vuelve al botón inicial)
function reiniciar() {
  cambiarEstado("inicio");
}