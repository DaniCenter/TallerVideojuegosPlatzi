const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
let canvasSize;
window.addEventListener("load", startGame);
window.addEventListener("resize", ajustar);

function startGame() {
  ajustar();
  render();
}
function ajustar() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.9;
  } else {
    canvasSize = window.innerHeight * 0.7;
  }
  canvas.setAttribute("height", canvasSize);
  canvas.setAttribute("width", canvasSize);
  render();
}
function render() {
  const elementSize = canvasSize / 10;
  ctx.textAlign = "end";
  ctx.font = elementSize + "px Arial";
  for (let j = 1; j <= 10; j++) {
    for (let i = 1; i <= 10; i++) {
      ctx.fillText(emojis["X"], elementSize * i, elementSize * j);
    }
  }
}
