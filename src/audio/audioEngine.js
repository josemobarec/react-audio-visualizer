let audioContext = null;
let audioElement = null;
let sourceNode = null;
let analyserNode = null;
let gainNode = null;

export function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}

export function initializeAudio(file) {
  const context = getAudioContext();

  if (!audioElement) {
    audioElement = new Audio();
    audioElement.crossOrigin = "anonymous";
  }

  if (file) {
    const fileURL = URL.createObjectURL(file);
    audioElement.src = fileURL;
  }

  if (!sourceNode) {
    sourceNode = context.createMediaElementSource(audioElement);

    gainNode = context.createGain();
    analyserNode = context.createAnalyser();

    // ⚙️ Configuración clave
    analyserNode.fftSize = 256; // resolución
    analyserNode.smoothingTimeConstant = 0.8;

    // 🔗 Conexiones
    sourceNode.connect(gainNode);
    gainNode.connect(analyserNode);
    analyserNode.connect(context.destination);
  }

  return audioElement;
}

export function getAnalyser() {
  return analyserNode;
}

export function playAudio() {
  if (audioElement) {
    audioElement.play();
  }
}

export function pauseAudio() {
  if (audioElement) {
    audioElement.pause();
  }
}

export function isPlaying() {
  return audioElement ? !audioElement.paused : false;
}

export function setVolume(value) {
  if (audioElement) {
    audioElement.volume = value;
  }
}