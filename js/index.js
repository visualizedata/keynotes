import { sketch } from './sketch.web.js';

window.addEventListener("load", () => {
  const deptEl = document.getElementById("config-department");
  const titleEl = document.getElementById("config-title");
  const dateEl = document.getElementById("config-date");
  const schoolEl = document.getElementById("config-school");

  const day = moment(config.date).format('ddd').toUpperCase();
  const date = moment(config.date).format('M/DD');

  deptEl.innerHTML = `${config.department}`;
  titleEl.innerHTML = `${config.title}`;
  dateEl.innerHTML = `${day} ${date} ${config.time}<br>${config.location}`;
  schoolEl.innerHTML = `${config.school}`;
});

const winW = () => window.innerWidth;
const winH = () => window.innerHeight;

const poster = new p5(sketch);

window.addEventListener('resize', () => {
  poster.updateCanvasSize(winW(), winH());
});
