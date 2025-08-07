
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = {
  x: 50,
  y: 50,
  width: 32,
  height: 32,
  speed: 2,
  sprite: null
};

const keys = {};

document.addEventListener("keydown", (e) => {
  keys[e.key.toLowerCase()] = true;
});

document.addEventListener("keyup", (e) => {
  keys[e.key.toLowerCase()] = false;
});

function loadAssets() {
  player.sprite = new Image();
  player.sprite.src = "player.png";
}

function update() {
  if (keys["w"]) player.y -= player.speed;
  if (keys["s"]) player.y += player.speed;
  if (keys["a"]) player.x -= player.speed;
  if (keys["d"]) player.x += player.speed;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (player.sprite.complete) {
    ctx.drawImage(player.sprite, player.x, player.y, player.width, player.height);
  } else {
    ctx.fillStyle = "white";
    ctx.fillRect(player.x, player.y, player.width, player.height);
  }
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

loadAssets();
gameLoop();
