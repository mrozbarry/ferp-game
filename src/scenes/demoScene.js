const mostlyClear = ctx => () => {
  ctx.fillStyle = 'rgba(255, 200, 200, 0.3)';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

const dotSize = 20;
const halfDotSize = dotSize / 2;

const drawPoint = ctx => (entity) => {
  ctx.fillStyle = 'black';
  ctx.fillRect(entity.position[0] - halfDotSize, entity.position[1] - halfDotSize, dotSize, dotSize);
};

export const demoScene = (canvas, world) => {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  mostlyClear(ctx)();

  world.points.forEach(drawPoint(ctx));
};
