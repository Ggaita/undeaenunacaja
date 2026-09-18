const audio = document.getElementById("audio");
const opcionesDiv = document.getElementById("opciones");
const btnInicio = document.getElementById("btnInicio");
const btnReiniciar = document.getElementById("btnReiniciar");
const textoEstado = document.getElementById("textoEstado");
const contenedorTimer = document.getElementById("contenedorTimer");
const barraProgreso = document.getElementById("barraProgreso");
const tiempoRestante = document.getElementById("tiempoRestante");

let animacionTimer;

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
    audio: "./src/modoSemiautomatico.mp3",
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

function iniciarTemporizador() {

  contenedorTimer.style.display = "block";
  tiempoRestante.style.display = "block";

  cancelAnimationFrame(animacionTimer);

  function actualizar() {

    const duracion = audio.duration || 120;

    const actual = audio.currentTime;

    const restante = duracion - actual;

    const porcentaje = (restante / duracion) * 100;

    barraProgreso.style.width = porcentaje + "%";

    const minutos = Math.floor(restante / 60);
    const segundos = Math.floor(restante % 60);

    tiempoRestante.textContent =
      `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;

    // cambio de color según tiempo
    if (porcentaje > 50) {
      barraProgreso.style.background = "#00c853";
    } else if (porcentaje > 20) {
      barraProgreso.style.background = "#ffd600";
    } else {
      barraProgreso.style.background = "#d50000";
    }

    if (!audio.paused && restante > 0) {
      animacionTimer = requestAnimationFrame(actualizar);
    }
  }

  actualizar();
}

function ocultarTemporizador() {
  contenedorTimer.style.display = "none";
  tiempoRestante.style.display = "none";
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


 // SOLO metrónomo + temporizador
if (estado === "metronomo") {

  iniciarTemporizador();

  audio.onended = () => {

    ocultarTemporizador();

    cambiarEstado("analisisRitmo");
  };

} else if (estado === "metronomoAutomatico") {

  iniciarTemporizador();

  audio.onended = () => {

    ocultarTemporizador();

    cambiarEstado("analisisRitmoAutomatico");
  };

} else {

  ocultarTemporizador();

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


let newWorker;

// registrar service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(reg => {

      reg.addEventListener("updatefound", () => {
        newWorker = reg.installing;

        newWorker.addEventListener("statechange", () => {
          if (
            newWorker.state === "installed" &&
            navigator.serviceWorker.controller
          ) {
            // 👉 mostrar cartel
            document.getElementById("updateBanner").style.display = "block";
          }
        });
      });
    });

  // recargar cuando cambia
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    window.location.reload();
  });
}

// botón actualizar
function actualizarApp() {
  if (newWorker) {
    newWorker.postMessage("SKIP_WAITING");
  }
}