import { sketch } from './sketch.slides.js';

const poster = new p5(sketch);

poster.updateCanvas16x9 = () => {
  const winW = window.innerWidth;
  const winH = window.innerHeight;

  const hByW = 9 * winW / 16;

  const minH = Math.max(winH, hByW);
  const minW = 16 * minH / 9;

  console.log('resize canvas', minW, minH);
  poster.resizeCanvas(minW, minH);
}

window.addEventListener('resize', () => {
  poster.updateCanvas16x9();
});
