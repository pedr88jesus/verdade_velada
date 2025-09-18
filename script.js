// Seletores
const clockEl = document.getElementById("clock");
const batteryEl = document.getElementById("battery");
const btnDoorLeft = document.getElementById("btnDoorLeft");
const btnDoorRight = document.getElementById("btnDoorRight");
const btnCamera = document.getElementById("btnCamera");
const overlay = document.getElementById("camera-overlay");
const closeCamera = document.getElementById("close-camera");
const flash = document.getElementById("cameraFlash");

// Estados
let battery = 100;
let hour = 0; // começa 12 AM
let doors = { left: false, right: false };

// Relógio (avança de hora em hora)
setInterval(() => {
  hour++;
  if (hour > 6) hour = 6;
  clockEl.textContent = `${hour === 0 ? 12 : hour} ${hour < 6 ? "AM" : "AM (VENCEU!)"}`;
}, 60000); // 1 min = 1 hora (ajuste para testar)

// Bateria
setInterval(() => {
  let drain = 0.1; // base
  if (doors.left) drain += 0.3;
  if (doors.right) drain += 0.3;
  if (!overlay.classList.contains("hidden")) drain += 0.5;
  battery -= drain;
  if (battery < 0) battery = 0;
  batteryEl.textContent = `Bateria: ${battery.toFixed(0)}%`;
}, 1000);

// Portas
btnDoorLeft.addEventListener("click", () => {
  doors.left = !doors.left;
  btnDoorLeft.textContent = doors.left ? "Abrir Esquerda" : "Fechar Esquerda";
});
btnDoorRight.addEventListener("click", () => {
  doors.right = !doors.right;
  btnDoorRight.textContent = doors.right ? "Abrir Direita" : "Fechar Direita";
});

// Câmera
btnCamera.addEventListener("click", () => {
  overlay.classList.remove("hidden");
  flash.classList.add("active");
  setTimeout(() => flash.classList.remove("active"), 300);
});
closeCamera.addEventListener("click", () => {
  overlay.classList.add("hidden");
  flash.classList.add("active");
  setTimeout(() => flash.classList.remove("active"), 300);
});
