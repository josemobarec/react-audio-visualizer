# 🎵 React Audio Visualizer

Visualizador de música en tiempo real desarrollado con **React**, **Web Audio API** y **HTML5 Canvas**.  
El proyecto permite analizar frecuencias de audio en vivo y representarlas mediante diferentes modos de visualización dinámicos y reactivos.

🔗 **Demo en vivo:**  
https://josemobarec.github.io/react-audio-visualizer/

---

## 🚀 Propósito del Proyecto

El objetivo de este proyecto es demostrar:

- Dominio de la Web Audio API.
- Manipulación avanzada de Canvas 2D.
- Arquitectura modular en React.
- Sincronización en tiempo real entre audio y renderizado.
- Optimización de animaciones mediante `requestAnimationFrame`.
- Deploy profesional con GitHub Pages.

---

## 🧠 Tecnologías Utilizadas

- React
- Vite
- Web Audio API
- HTML5 Canvas
- JavaScript (ES Modules)
- GitHub Pages

---

## 🎛 Modos de Visualización

### 🔹 Bars
Representación simétrica del espectro de frecuencias con efecto de “peak hold”.

### 🔹 Radial
Visualización circular basada en energía espectral.

### 🔹 Wave
Representación temporal de la forma de onda en tiempo real.

---

## 🎮 Cómo Usarlo

1. Presionar **Choose File** y cargar un archivo de audio.
2. Presionar **Play** para iniciar reproducción.
3. Seleccionar el modo de visualización.
4. Ajustar volumen según necesidad.

El sistema analiza los datos de audio en cada frame y actualiza el canvas dinámicamente.

---

## 🏗 Arquitectura del Proyecto
src/<br>
├── audio/<br>
│ └── audioEngine.js<br>
├── components/<br>
│ ├── Layout.jsx<br>
│ ├── ControlPanel.jsx<br>
│ └── VisualizerContainer.jsx<br>
├── visualizers/<br>
│ ├── barsVisualizer.js<br>
│ ├── radialVisualizer.js<br>
│ └── waveVisualizer.js<br>


La arquitectura separa:

- Motor de audio
- Lógica de render
- Componentes de interfaz
- Modos de visualización

Esto permite escalabilidad y fácil extensión del sistema.

---

## ⚡ Rendimiento

- Uso de `requestAnimationFrame`
- Renderizado optimizado
- Reutilización de buffers
- Escalado según `devicePixelRatio`

---

## 📈 Posibles Mejoras Futuras

- Visualizador con partículas dinámicas
- Modo fullscreen
- Exportación de grabación visual
- Ajuste dinámico de sensibilidad
- Soporte para entrada de micrófono
- Control de colores personalizados
- Modo 3D con WebGL

---

## 👨‍💻 Autor

Desarrollado por **JLMB**  

---

## 📄 Licencia

Este proyecto se distribuye bajo licencia MIT.
