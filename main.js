const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
let canvasSize;
window.addEventListener("load", startGame);
window.addEventListener("resize", ajustar);
window.addEventListener("keydown", movimiento);
document.querySelector(".btns").addEventListener("click", botonPresionado);
const playerPosition = {
  x: undefined,
  y: undefined,
};
const giftPosition = {
  x: undefined,
  y: undefined,
};
let enemysPosition = [];
let flasg = true;
let nivel = 0;
let vidas = 3;
let startTime;
let contadorIniciado = false;

function startGame() {
  ajustar();
}
function ajustar() {
  canvasSize = window.innerHeight > window.innerWidth ? window.innerWidth * 0.9 : (canvasSize = window.innerHeight * 0.7);
  canvas.setAttribute("height", canvasSize);
  canvas.setAttribute("width", canvasSize);
  reiniciar();
}
function render() {
  const elementSize = canvasSize / 10;
  ctx.textAlign = "end";
  ctx.font = elementSize + "px Arial";

  const map = maps[nivel];
  if (!map) {
    gameWin();
    return;
  }
  const mapRows = map
    .trim()
    .split("\n")
    .map((a) => a.trim().split(""));

  mapRows.forEach((j, jI) => {
    j.forEach((i, iI) => {
      ctx.fillText(emojis[i], elementSize * (iI + 1), elementSize * (jI + 1));
      if (i == "X" && flasg) {
        enemysPosition.push({ x: Math.round(elementSize * (iI + 1)), y: Math.round(elementSize * (jI + 1)) });
      }
      if (i == "I") {
        giftPosition.x = elementSize * (iI + 1);
        giftPosition.y = elementSize * (jI + 1);
      }
      if (i == "O" && playerPosition.x == undefined) {
        playerPosition.x = elementSize * (iI + 1);
        playerPosition.y = elementSize * (jI + 1);
        renderJugador();
      } else {
        renderJugador();
      }
    });
  });
  flasg = false;
  MostrarVidas();
}
function movimiento(e) {
  switch (e.key) {
    case "ArrowUp":
      if (!(playerPosition.y - canvasSize / 10 <= 0)) {
        playerPosition.y -= canvasSize / 10;
        actualizarJugador();
        contadorIniciado = true;
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
  if (startTime == undefined) {
    startTime = Date.now();
    contador();
  }
  comprobarGift();
  comprobarEnemy();
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
  comprobarGift();
  comprobarEnemy();
}
function renderJugador() {
  ctx.fillText(emojis.PLAYER, playerPosition.x, playerPosition.y);
}
function actualizarJugador() {
  ctx.clearRect(0, 0, canvasSize, canvasSize);
  render();
  renderJugador();
}
function comprobarGift() {
  if (Math.round(playerPosition.x) == Math.round(giftPosition.x) && Math.round(playerPosition.y) == Math.round(giftPosition.y)) {
    nivel++;
    flasg = true;
    enemysPosition = [];
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    render();
    console.log("Nivel siguiente");
  }
}
function comprobarEnemy() {
  if (enemysPosition.find((e) => e.x == Math.round(playerPosition.x) && e.y == Math.round(playerPosition.y))) {
    vidas--;
    reiniciar();
  }
}
function reiniciar() {
  if (vidas == 0) {
    nivel = 0;
    vidas = 3;
    startTime = undefined;
  }
  flasg = true;
  enemysPosition = [];
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  actualizarJugador();
}
function gameWin() {
  clearInterval(inervalo);
  ctx.textAlign = "center";
  ctx.font = canvasSize * 0.09 + "pt Arial";
  ctx.fillStyle = "red";
  ctx.fillText("GANASTE", canvasSize / 2, canvasSize / 2);
  window.removeEventListener("keydown", movimiento);
  document.querySelector(".btns").removeEventListener("click", botonPresionado);
}
function MostrarVidas() {
  document.getElementById("lives").innerHTML = "❤️".repeat(vidas);
}
function contador() {
  inervalo = setInterval(function () {
    let elapsedTime = Date.now() - startTime;
    document.getElementById("timer").innerHTML = (elapsedTime / 1000).toFixed(2);
  }, 100);
}
