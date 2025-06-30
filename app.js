const html = document.querySelector("html");
const title = document.querySelector(".app__title");
const image = document.querySelector(".app__image");
const audio = new Audio("./sons/luna-rise-part-one.mp3");
const audioPlay = new Audio("./sons/play.wav");
const audioStop = new Audio("./sons/pause.mp3");

let minutes = 25;
let intervalId = null;
let isClicked = 0;

//Função para remover classe ativa
function removeActive() {
  document.querySelector(".active").classList.remove("active");
}

//Função para construir o novo conteúdo
function contentPattern(content, src, min) {
  title.innerHTML = content;
  image.src = src;
  minutes = min;
}

//Função para alterar o conteúdo de acordo com o dataset do html
function changeContent() {
  switch (html.dataset.contexto) {
    case "foco":
      contentPattern(
        "Otimize sua produtividade,<br /><strong class='app__title-strong'>mergulhe no que importa.</strong>",
        "./imagens/foco.png",
        25
      );
      break;
    case "descanso-curto":
      contentPattern(
        "Que tal dar uma respirada?<br /><strong class='app__title-strong'>Faça uma pausa curta!</strong>",
        "./imagens/descanso-curto.png",
        5
      );
      break;
    case "descanso-longo":
      contentPattern(
        "Hora de voltar à superfície.<br /><strong class='app__title-strong'>Faça uma pausa longa.</strong>",
        "./imagens/descanso-longo.png",
        15
      );
      break;
    case "default":
      break;
  }
}

//Função para mudar o dataset do html
function changeContext(newContext) {
  html.dataset.contexto = newContext;
  changeContent(newContext);
}

//Função para mudar o conteúdo do botão
function changeTimerButton(element, src, text) {
  element[0].src = src;
  element[1].textContent = text;
}

//Função para controlar o comportamento do timer
function countDown() {
  if (minutes <= 0) {
    return;
  }
  start();
  minutes -= 1;
  console.log(minutes);
}

//Função que ativa o timer
function start() {
  intervalId = setTimeout(countDown, 1000);
}

//Handler de cliques
function clickHandlerContext(e) {
  removeActive();
  changeContext(e.currentTarget.dataset.contexto);
  e.currentTarget.classList.add("active");
}

function clickHandlerMusic(e) {
  if (e.currentTarget.checked === true) {
    audio.loop = true;
    audio.play();
  } else {
    audio.pause();
  }
}

function clickHandlerTimer(e) {
  if (!isClicked) {
    changeTimerButton(
      e.currentTarget.children,
      "./imagens/pause.png",
      "Pausar"
    );
    audioStop.play();
    start();
    isClicked = 1;
  } else {
    changeTimerButton(
      e.currentTarget.children,
      "./imagens/play_arrow.png",
      "Começar"
    );
    audioPlay.play();
    isClicked = 0;
  }
}

//Listeners
document.querySelectorAll(".app__card-button").forEach((button) => {
  button.addEventListener("click", clickHandlerContext);
});

document
  .getElementById("alternar-musica")
  .addEventListener("click", clickHandlerMusic);

document
  .getElementById("start-pause")
  .addEventListener("click", clickHandlerTimer);
