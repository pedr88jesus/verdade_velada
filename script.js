// 🎵 Áudio e elementos da interface
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const fala = document.getElementById("fala");
const opcoes = document.getElementById("opcoes");
const ambiente = document.getElementById("ambiente");

// 🎮 Personagens e objetos
let personagem = { x: 300, y: 150 };
let lia = { x: 200, y: 150 };
let noah = { x: 500, y: 150 };
let porta = { x: 600, y: 300 };
let portaLiberada = false;
let dialogoAtivo = false;

// 🖼️ Sprite da Lia
const spriteLia = new Image();
spriteLia.src = "assets/lia.png";

// 🎬 Iniciar o jogo
function iniciarJogo() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("jogo").style.display = "block";
  ambiente.play();
  mostrarCenaInicial();
}

// 📜 Créditos
function mostrarCreditos() {
  alert("Demo criada por Pedro. Inspirado em Undertale e Tails Noir.");
}

// 🎭 Cena inicial com Lia
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

// 💬 Mostrar fala
function mostrarFala(texto) {
  fala.textContent = texto;
  opcoes.innerHTML = "";
}

// 🔘 Mostrar opções
function mostrarOpcoes(lista, callback) {
  opcoes.innerHTML = "";
  lista.forEach((opcao, i) => {
    const btn = document.createElement("button");
    btn.textContent = opcao;
    btn.onclick = () => callback(i);
    opcoes.appendChild(btn);
  });
}

// 🧠 Interação com Noah
function interagirComNoah() {
  const dx = personagem.x - noah.x;
  const dy = personagem.y - noah.y;
  const distancia = Math.sqrt(dx * dx + dy * dy);

  if (distancia < 40 && !dialogoAtivo) {
    mostrarFala("NOAH: Você não devia estar aqui... Mas talvez eu possa ajudar.");
    mostrarOpcoes(["Me ajude a sair", "Não confio em você"], (escolha) => {
      if (escolha === 0) {
        mostrarFala("NOAH: Há um código escondido atrás da maca. Use-o na porta.");
        portaLiberada = true;
      } else {
        mostrarFala("NOAH: Então você está por conta própria...");
      }
      dialogoAtivo = false;
    });
  }
}

// 🚪 Verificar porta
function verificarPorta() {
  const dx = personagem.x - porta.x;
  const dy = personagem.y - porta.y;
  const distancia = Math.sqrt(dx * dx + dy * dy);

  if (distancia < 40 && portaLiberada && !dialogoAtivo) {
    mostrarFala("Você abriu a porta. Algo te observa do outro lado...");
    setTimeout(() => {
      mostrarFinal();
    }, 3000);
  }
}

// 🎬 Final da demo
function mostrarFinal() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fala.textContent = "A Entidade desperta... Isso é só o começo.";
  opcoes.innerHTML = "";
  ambiente.pause();
}

// 🎨 Desenhar tudo
function desenhar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Personagem principal
  ctx.fillStyle = "#fff";
  ctx.fillRect(personagem.x, personagem.y, 32, 32);

  // Lia
  ctx.drawImage(spriteLia, lia.x, lia.y, 32, 32);

  // Noah
  ctx.fillStyle = "#0ff";
  ctx.fillRect(noah.x, noah.y, 32, 32);

  // Porta
  ctx.fillStyle = portaLiberada ? "#0f0" : "#f00";
  ctx.fillRect(porta.x, porta.y, 32, 32);
}

// ⌨️ Controles do jogador
document.addEventListener("keydown", (e) => {
  if (dialogoAtivo) return;

  switch (e.key) {
    case "ArrowUp": personagem.y -= 10; break;
    case "ArrowDown": personagem.y += 10; break;
    case "ArrowLeft": personagem.x -= 10; break;
    case "ArrowRight": personagem.x += 10; break;
  }

  interagirComNoah();
  verificarPorta();
  desenhar();
});
