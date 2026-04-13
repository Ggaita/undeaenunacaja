const audio = document.getElementById("audio");
const opcionesDiv = document.getElementById("opciones");

// 🌳 Árbol de decisiones
const historia = {
  inicio: {
    audio: "./src/inicio.mp3",
    opciones: [
      { texto: "No", siguiente: "final" }, // bucle
      { texto: "Sí", siguiente: "parte2" }
    ]
  },

  parte2: {
    audio: "./src/semiautomatico.mp3",
    opciones: [
      { texto: "No", siguiente: "inicio" },
      { texto: "Sí", siguiente: "final" }
    ]
  },

  final: {
    audio: "./src/tililili.mp3",
    opciones: []
  }
};

let estadoActual = "inicio";

// 🔊 reproducir audio
function reproducir(src) {
  audio.src = src;
  audio.currentTime = 0;
  audio.play();
}

// 🔄 cambiar de estado
function cambiarEstado(nuevoEstado) {
  estadoActual = nuevoEstado;

  const nodo = historia[estadoActual];

  // reproducir audio
  reproducir(nodo.audio);

  // mostrar botones
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
  cambiarEstado("inicio");
}