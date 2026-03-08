export function drawWave({ ctx, analyser, width, height }) {
  const bufferLength = analyser.fftSize;
  const dataArray = new Uint8Array(bufferLength);

  analyser.getByteTimeDomainData(dataArray);

  ctx.lineWidth = 2;

  const gradient = ctx.createLinearGradient(0, 0, width, 0);
  gradient.addColorStop(0, "#ff4ecd");
  gradient.addColorStop(0.5, "#8a6cff");
  gradient.addColorStop(1, "#3a86ff");

  ctx.strokeStyle = gradient;
  ctx.shadowBlur = 20;
  ctx.shadowColor = "#8a6cff";

  ctx.beginPath();

  const sliceWidth = width / bufferLength;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    const v = dataArray[i] / 128.0; // normaliza 0–255 a 0–2
    const y = (v * height) / 2;

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }

    x += sliceWidth;
  }

  ctx.lineTo(width, height / 2);
  ctx.stroke();
}