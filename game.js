const dialogText = document.getElementById('dialog-text');
const dialogLines = [
  "Você acorda em um lugar escuro...",
  "O chão está frio. Há um silêncio estranho.",
  "Uma porta... ou pelo menos o que parece ser uma porta.",
  "Você quer continuar?",
];

let lineIndex = 0;
let charIndex = 0;

function typeLine() {
  if (charIndex < dialogLines[lineIndex].length) {
    dialogText.textContent += dialogLines[lineIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeLine, 40);
  } else {
    setTimeout(() => {
      if (lineIndex < dialogLines.length - 1) {
        lineIndex++;
        charIndex = 0;
        dialogText.textContent = '';
        setTimeout(typeLine, 500);
      }
    }, 1000);
  }
}

// Início automático
typeLine();
