const playerWrapper = document.getElementById("player-wrapper");
const player = document.getElementById("player");
const game = document.getElementById("game");
const finJuego = document.getElementById("fin-juego");

let x = window.innerWidth * 0.1;
let y = window.innerHeight * 0.1;
const speed = 10;

let enemigosDerrotados = 0;
const enemigosParaGanar = 5;

document.addEventListener("keydown", (e) => {
  let newX = x;
  let newY = y;

  if (e.key === "ArrowLeft") newX -= speed;
  if (e.key === "ArrowRight") newX += speed;
  if (e.key === "ArrowUp") newY -= speed;
  if (e.key === "ArrowDown") newY += speed;
  if (e.code === "Space") disparar();

  if (!colisionaConObstaculo(newX, newY)) {
    x = newX;
    y = newY;
    moverJugador();
  }
});

function moverJugador() {
  playerWrapper.style.left = x + "px";
  playerWrapper.style.top = y + "px";
}

function disparar() {
  const bullet = document.createElement("div");
  bullet.className = "bullet";
  bullet.style.left = (x + player.offsetWidth) + "px";
  bullet.style.top = (y + player.offsetHeight / 2) + "px";
  game.appendChild(bullet);

  let bulletX = x + player.offsetWidth;

  const interval = setInterval(() => {
    bulletX += 15;
    bullet.style.left = bulletX + "px";

    const enemigo = document.querySelector(".enemigo");
    if (enemigo) {
      const bRect = bullet.getBoundingClientRect();
      const eRect = enemigo.getBoundingClientRect();

      if (
        bRect.left < eRect.right &&
        bRect.right > eRect.left &&
        bRect.top < eRect.bottom &&
        bRect.bottom > eRect.top
      ) {
        enemigo.remove();
        bullet.remove();
        clearInterval(interval);

        enemigosDerrotados++;
        if (enemigosDerrotados >= enemigosParaGanar) {
          mostrarFinJuego();
        } else {
          setTimeout(crearEnemigo, 1500);
        }
        return;
      }
    }

    if (bulletX > window.innerWidth) {
      bullet.remove();
      clearInterval(interval);
    }
  }, 30);
}

function crearEnemigo() {
  const enemigo = document.createElement("img");
  enemigo.src = "enemigo.png";
  enemigo.className = "enemigo";
  enemigo.style.top = Math.floor(Math.random() * window.innerHeight * 0.6) + "px";
  game.appendChild(enemigo);
}

function colisionaConObstaculo(nuevaX, nuevaY) {
  const jugadorRect = {
    left: nuevaX,
    right: nuevaX + player.offsetWidth,
    top: nuevaY,
    bottom: nuevaY + player.offsetHeight
  };

  const obstaculos = document.querySelectorAll(".obstaculo");
  for (let obstaculo of obstaculos) {
    const rect = obstaculo.getBoundingClientRect();
    const oLeft = rect.left;
    const oRight = rect.left + rect.width;
    const oTop = rect.top;
    const oBottom = rect.top + rect.height;

    if (
      jugadorRect.right > oLeft &&
      jugadorRect.left < oRight &&
      jugadorRect.bottom > oTop &&
      jugadorRect.top < oBottom
    ) {
      return true;
    }
  }

  return false;
}

function mostrarFinJuego() {
  finJuego.classList.remove("oculto");
}

crearEnemigo();

function iniciarJuego() {
    document.getElementById("pantalla-inicio").classList.add("oculto");
    document.getElementById("player-wrapper").classList.remove("oculto");
    document.getElementById("titulo-juego").classList.remove("oculto");
    crearEnemigo();
  }
  
  function mover(direccion) {
  switch(direccion) {
    case 'left': x -= speed; break;
    case 'right': x += speed; break;
    case 'up': y -= speed; break;
    case 'down': y += speed; break;
  }
  moverJugador();
}
