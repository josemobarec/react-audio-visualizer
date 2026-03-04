export function drawBars({
  ctx,
  dataArray,
  width,
  height,
  peaks
}) {
  const visibleBars = 64;
  const barWidth = width / (visibleBars * 2);
  const center = width / 2;

  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, "#ff4ecd");
  gradient.addColorStop(0.5, "#8a6cff");
  gradient.addColorStop(1, "#3a86ff");

  ctx.fillStyle = gradient;
  ctx.shadowBlur = 25;
  ctx.shadowColor = "#8a6cff";

  for (let i = 0; i < visibleBars; i++) {
    const percent = dataArray[i] / 255;
    const targetHeight = height * percent;

    if (!peaks[i]) peaks[i] = 0;

    peaks[i] =
      targetHeight > peaks[i]
        ? targetHeight
        : peaks[i] * 0.92;

    const barHeight = peaks[i];

    ctx.fillRect(
      center + i * barWidth,
      height - barHeight,
      barWidth * 0.9,
      barHeight
    );

    ctx.fillRect(
      center - (i + 1) * barWidth,
      height - barHeight,
      barWidth * 0.9,
      barHeight
    );
  }
}