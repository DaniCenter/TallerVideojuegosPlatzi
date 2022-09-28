const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
let canvasSize;
window.addEventListener("load", startGame);
window.addEventListener("resize", ajustar);
window.addEventListener("keydown", movimiento);
document.querySelector(".btns").addEventListener("click", botonPresionado);
let playerPosition = {
  x: undefined,
  y: undefined,
};

function startGame() {
  ajustar();
}
function ajustar() {
  canvasSize = window.innerHeight > window.innerWidth ? window.innerWidth * 0.9 : (canvasSize = window.innerHeight * 0.7);
  canvas.setAttribute("height", canvasSize);
  canvas.setAttribute("width", canvasSize);
  playerPosition.x = undefined;
  playerPosition.y = undefined;
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

  mapRows.forEach((j, jI) => {
    j.forEach((i, iI) => {
      ctx.fillText(emojis[i], elementSize * (iI + 1), elementSize * (jI + 1));
      if (i == "O" && playerPosition.x == undefined) {
        playerPosition.x = elementSize * (iI + 1);
        playerPosition.y = elementSize * (jI + 1);
        renderJugador();
      } else {
        renderJugador();
      }
    });
  });
}
function movimiento(e) {
  switch (e.key) {
    case "ArrowUp":
      if (!(playerPosition.y - canvasSize / 10 <= 0)) {
        playerPosition.y -= canvasSize / 10;
        actualizarJugador();
      }
      break;
    case "ArrowDown":
      if (!(playerPosition.y + canvasSize / 10 > canvasSize)) {
        playerPosition.y += canvasSize / 10;
        actualizarJugador();
      }
      break;
    case "ArrowLeft":
      if (!(playerPosition.x - canvasSize / 10 <= 0)) {
        playerPosition.x -= canvasSize / 10;
        actualizarJugador();
      }
      break;
    case "ArrowRight":
      if (!(playerPosition.x + canvasSize / 10 > canvasSize)) {
        playerPosition.x += canvasSize / 10;
        actualizarJugador();
      }
      break;
  }
}
function botonPresionado(e) {
  if (e.path[0].className != "btns") {
    switch (e.path[0].id) {
      case "up":
        if (!(playerPosition.y - canvasSize / 10 <= 0)) {
          playerPosition.y -= canvasSize / 10;
          actualizarJugador();
        }
        break;
      case "left":
        if (!(playerPosition.x - canvasSize / 10 <= 0)) {
          playerPosition.x -= canvasSize / 10;
          actualizarJugador();
        }
        break;
      case "right":
        if (!(playerPosition.x + canvasSize / 10 > canvasSize)) {
          playerPosition.x += canvasSize / 10;
          actualizarJugador();
        }
        break;
      case "down":
        if (!(playerPosition.y + canvasSize / 10 > canvasSize)) {
          playerPosition.y += canvasSize / 10;
          actualizarJugador();
        }
        break;
    }
  }
}
function renderJugador() {
  ctx.fillText(emojis.PLAYER, playerPosition.x, playerPosition.y);
}
function actualizarJugador() {
  ctx.clearRect(0, 0, canvasSize, canvasSize);
  render();
  renderJugador();
}
