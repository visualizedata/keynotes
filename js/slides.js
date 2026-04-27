import { sketch } from './sketch.slides.js';

const winW = () => window.innerWidth;
const winH = () => window.innerHeight;

const poster = new p5(sketch);

window.addEventListener('resize', () => {
  poster.updateCanvasSize(winW(), winH());
});
