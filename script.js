let currentHour = 0;
let clockElement = null;
let cameraText = null;
let animatronicPosition = 1; // começa na cam 1
let clockInterval;

document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  const menu = document.getElementById("menu");
  const game = document.getElementById("game");
  const jumpscare = document.getElementById("jumpscare");

  clockElement = document.getElementById("clock");
  cameraText = document.getElementById("camera-text");

  // Iniciar jogo
  startBtn.addEventListener("click", () => {
    menu.classList.add("hidden");
    game.classList.remove("hidden");
    startNight();
  });

  // Botões de câmera
  document.querySelectorAll(".cam-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const cam = btn.dataset.cam;
      cameraText.textContent = `Você está vendo a Câmera ${cam}`;

      // Sons de troca de câmera
      playSound("assets/sounds/camera.mp3");

      // Checar se animatronic está nessa câmera
      if (parseInt(cam) === animatronicPosition) {
        cameraText.textContent += " 👀 (Animatrônico aqui!)";
      }
    });
  });
});

function startNight() {
  currentHour = 0;
  updateClock();

  clockInterval = setInterval(() => {
    currentHour++;
    if (currentHour >= 6) {
      clearInterval(clockInterval);
      alert("Você sobreviveu até as 6 AM! 🎉");
    } else {
      updateClock();
      moveAnimatronic();
    }
  }, 5000); // avança 1 hora a cada 5 segundos
}

function updateClock() {
  const hours = ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM"];
  clockElement.textContent = hours[currentHour];
}

function moveAnimatronic() {
  animatronicPosition = Math.floor(Math.random() * 3) + 1;

  if (animatronicPosition === 3) {
    triggerJumpscare();
  }
}

function triggerJumpscare() {
  clearInterval(clockInterval);
  document.getElementById("jumpscare").classList.remove("hidden");
  playSound("assets/sounds/jumpscare.mp3");

  setTimeout(() => {
    alert("Você perdeu! O animatrônico te pegou.");
    location.reload();
  }, 2000);
}

function playSound(src) {
  const audio = new Audio(src);
  audio.play();
}
