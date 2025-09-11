const doorLeft = document.getElementById("doorLeft");
const doorRight = document.getElementById("doorRight");
const btnDoorLeft = document.getElementById("btnDoorLeft");
const btnDoorRight = document.getElementById("btnDoorRight");

// Estados
let isLeftClosed = false;
let isRightClosed = false;

// Controle da porta esquerda
btnDoorLeft.addEventListener("click", () => {
  if (!isLeftClosed) {
    doorLeft.src = "assets/doors/door_left_closed.png";
    isLeftClosed = true;
  } else {
    doorLeft.src = "assets/doors/door_left_open.png";
    isLeftClosed = false;
  }
});

// Controle da porta direita
btnDoorRight.addEventListener("click", () => {
  if (!isRightClosed) {
    doorRight.src = "assets/doors/door_right_closed.png";
    isRightClosed = true;
  } else {
    doorRight.src = "assets/doors/door_right_open.png";
    isRightClosed = false;
  }
});
