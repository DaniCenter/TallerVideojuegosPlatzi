const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
let canvasSize;
window.addEventListener("load", startGame);
window.addEventListener("resize", ajustar);

function startGame() {
  ajustar();
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

  const map = maps[0];
  const mapRows = map
    .trim()
    .split("\n")
    .map((a) => a.trim().split(""));
  console.log(mapRows);

  mapRows.forEach((j, jI) => {
    j.forEach((i, iI) => {
      ctx.fillText(emojis[i], elementSize * (iI + 1), elementSize * (jI + 1));
    });
  });
}
