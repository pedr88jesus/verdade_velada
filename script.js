const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const fala = document.getElementById("fala");
const opcoes = document.getElementById("opcoes");
const ambiente = document.getElementById("ambiente");

let personagem = { x: 300, y: 150 };
let dialogoAtivo = false;

function iniciarJogo() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("jogo").style.display = "block";
  ambiente.play();
  mostrarCenaInicial();
}

function mostrarCreditos() {
  alert("Demo criada por Pedro. Inspirado em Undertale e Tails Noir.");
}

function mostrarCenaInicial() {
  dialogoAtivo = true;
  mostrarFala("Você acorda em um lugar escuro. Há uma voz distante...");
  setTimeout(() => {
    mostrarFala("LIA: Você... você lembra de mim?");
    mostrarOpcoes(["Sim. Eu lembro.", "Não. Me deixe em paz."], (escolha) => {
      if (escolha === 0) {
        mostrarFala("LIA: Eu sabia que você voltaria...");
      } else {
        mostrarFala("LIA: Então... talvez seja melhor esquecer.");
      }
      dialogoAtivo = false;
    });
  }, 3000);
}

function mostrarFala(texto) {
  fala.textContent = texto;
  opcoes.innerHTML = "";
}

function mostrarOpcoes(lista, callback) {
  opcoes.innerHTML = "";
  lista.forEach((opcao, i) => {
    const btn = document.createElement("button");
    btn.textContent = opcao;
    btn.onclick = () => callback(i);
    opcoes.appendChild(btn);
  });
}

document.addEventListener("keydown", (e) => {
  if (dialogoAtivo) return;
  switch (e.key) {
    case "ArrowUp": personagem.y -= 10; break;
    case "ArrowDown": personagem.y += 10; break;
    case "ArrowLeft": personagem.x -= 10; break;
    case "ArrowRight": personagem.x += 10; break;
  }
  desenhar();
});

function desenhar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  ctx.fillRect(personagem.x, personagem.y, 32, 32); // sprite provisório
}
