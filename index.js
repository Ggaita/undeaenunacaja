const audio = document.getElementById("audio");
const opcionesDiv = document.getElementById("opciones");
const btnInicio = document.getElementById("btnInicio");
const btnReiniciar = document.getElementById("btnReiniciar");

// 🌳 estados
const historia = {
  inicioOpciones: {
    audio: "./src/inicio.mp3",
    opciones: [
      { texto: "No", siguiente: "inicioOpciones" },
      { texto: "Sí", siguiente: "parte2" }
    ]
  },

  parte2: {
    audio: "./src/semiautomatico.mp3",
    opciones: [
      { texto: "No", siguiente: "inicioOpciones" },
      { texto: "Sí", siguiente: "final" }
    ]
  },

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

  nodo.opciones.forEach(op => {
    const btn = document.createElement("button");
    btn.textContent = op.texto;
    btn.onclick = () => cambiarEstado(op.siguiente);
    opcionesDiv.appendChild(btn);
  });
}

// ▶️ iniciar
function empezar() {
  btnInicio.style.display = "none";
  opcionesDiv.style.display = "block";
  btnReiniciar.style.display = "block";

  cambiarEstado("inicioOpciones");
}

// 🔁 reiniciar (NO vuelve al botón inicial)
function reiniciar() {
  cambiarEstado("inicioOpciones");
}