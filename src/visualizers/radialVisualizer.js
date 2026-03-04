export function drawRadial({
  ctx,
  dataArray,
  width,
  height,
  peaks
}) {
  const centerX = width / 2;
  const centerY = height / 2;

  const radius = Math.min(width, height) * 0.25;
  const bars = 128;

  const angleStep = (Math.PI * 2) / bars;

  ctx.save();
  ctx.translate(centerX, centerY);

  for (let i = 0; i < bars; i++) {
    const percent = dataArray[i] / 255;
    const targetHeight = percent * 150;

    if (!peaks[i]) peaks[i] = 0;

    peaks[i] =
      targetHeight > peaks[i]
        ? targetHeight
        : peaks[i] * 0.9;

    const barHeight = peaks[i];

    const angle = i * angleStep;

    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    const xEnd = Math.cos(angle) * (radius + barHeight);
    const yEnd = Math.sin(angle) * (radius + barHeight);

    const gradient = ctx.createLinearGradient(x, y, xEnd, yEnd);
    gradient.addColorStop(0, "#ff4ecd");
    gradient.addColorStop(1, "#3a86ff");

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 3;
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#8a6cff";

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(xEnd, yEnd);
    ctx.stroke();
  }

  ctx.restore();
}