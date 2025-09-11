const doorLeft = document.getElementById("doorLeft");
const doorRight = document.getElementById("doorRight");
const btnDoorLeft = document.getElementById("btnDoorLeft");
const btnDoorRight = document.getElementById("btnDoorRight");

const btnCamera = document.getElementById("btnCamera");
const cameraScreen = document.getElementById("cameraScreen");
const btnExitCamera = document.getElementById("btnExitCamera");
const cameraFlash = document.getElementById("cameraFlash");

// Estados
let isLeftClosed = false;
let isRightClosed = false;

// Controle da porta esquerda
btnDoorLeft.addEventListener("click", () => {
  doorLeft.src = isLeftClosed ? "assets/doors/door_left_open.png" : "assets/doors/door_left_closed.png";
  isLeftClosed = !isLeftClosed;
});

// Controle da porta direita
btnDoorRight.addEventListener("click", () => {
  doorRight.src = isRightClosed ? "assets/doors/door_right_open.png" : "assets/doors/door_right_closed.png";
  isRightClosed = !isRightClosed;
});

// Abrir câmeras
btnCamera.addEventListener("click", () => {
  playCameraFlash(() => {
    cameraScreen.style.display = "block";
  });
});

// Sair das câmeras
btnExitCamera.addEventListener("click", () => {
  playCameraFlash(() => {
    cameraScreen.style.display = "none";
  });
});

// Função de flash de transição
function playCameraFlash(callback) {
  cameraFlash.style.display = "block";
  cameraFlash.style.opacity = "1";

  setTimeout(() => {
    cameraFlash.style.opacity = "0";
  }, 200);

  setTimeout(() => {
    cameraFlash.style.display = "none";
    if (callback) callback();
  }, 400);
}
