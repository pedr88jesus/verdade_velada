const dialogText = document.getElementById('dialog-text');
const dialogBox = document.getElementById('dialog-box');
const character = document.getElementById('character');
const controls = document.getElementById('controls');

const dialogLines = [
  "Você acorda em um lugar escuro...",
  "O chão está frio. Há um silêncio estranho.",
  "Uma porta... ou pelo menos o que parece ser uma porta.",
  "Você quer continuar?",
];

let lineIndex = 0;
let charIndex = 0;
let isTyping = false;

let posX = 50; // em vw
let posY = 50; // em vh

function updateCharacterPosition() {
  character.style.left = posX + "vw";
  character.style.top = posY + "vh";
}

function typeLine() {
  if (charIndex < dialogLines[lineIndex].length) {
    isTyping = true;
    dialogText.textContent += dialogLines[lineIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeLine, 40);
  } else {
    isTyping = false;
  }
}

function nextLine() {
  if (isTyping) {
    // Termina de mostrar a frase imediatamente
    dialogText.textContent = dialogLines[lineIndex];
    isTyping = false;
    charIndex = dialogLines[lineIndex].length;
  } else {
    if (lineIndex < dialogLines.length - 1) {
      lineIndex++;
      charIndex = 0;
      dialogText.textContent = '';
      typeLine();
    } else {
      dialogText.textContent = "Use as setas ou os botões para se mover.";
      controls.style.display = 'flex';
    }
  }
}

dialogBox.addEventListener('click', nextLine);
window.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    nextLine();
  }
  if (controls.style.display === 'flex') {
    if (e.key === 'ArrowUp') posY = Math.max(0, posY - 2);
    if (e.key === 'ArrowDown') posY = Math.min(90, posY + 2);
    if (e.key === 'ArrowLeft') posX = Math.max(0, posX - 2);
    if (e.key === 'ArrowRight') posX = Math.min(90, posX + 2);
    updateCharacterPosition();
  }
});

// Botões toque:
document.getElementById('up').addEventListener('click', () => {
  posY = Math.max(0, posY - 2);
  updateCharacterPosition();
});
document.getElementById('down').addEventListener('click', () => {
  posY = Math.min(90, posY + 2);
  updateCharacterPosition();
});
document.getElementById('left').addEventListener('click', () => {
  posX = Math.max(0, posX - 2);
  updateCharacterPosition();
});
document.getElementById('right').addEventListener('click', () => {
  posX = Math.min(90, posX + 2);
  updateCharacterPosition();
});

window.onload = () => {
  updateCharacterPosition();
  typeLine();
  controls.style.display = 'none';
};
