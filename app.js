const html = document.querySelector("html");
const title = document.querySelector(".app__title");
const image = document.querySelector(".app__image");
const audio = new Audio("./sons/luna-rise-part-one.mp3");
const audioPlay = new Audio("./sons/play.wav");
const audioStop = new Audio("./sons/pause.mp3");
const audioAlerta = new Audio("./sons/beep.mp3");
const timerScreen = document.getElementById("timer");

let timeInSeconds = 1500;
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
  timeInSeconds = min;
  showTime();
}

//Função para alterar o conteúdo de acordo com o dataset do html
function changeContent() {
  switch (html.dataset.contexto) {
    case "foco":
      contentPattern(
        "Otimize sua produtividade,<br /><strong class='app__title-strong'>mergulhe no que importa.</strong>",
        "./imagens/foco.png",
        1500
      );
      break;
    case "descanso-curto":
      contentPattern(
        "Que tal dar uma respirada?<br /><strong class='app__title-strong'>Faça uma pausa curta!</strong>",
        "./imagens/descanso-curto.png",
        300
      );
      break;
    case "descanso-longo":
      contentPattern(
        "Hora de voltar à superfície.<br /><strong class='app__title-strong'>Faça uma pausa longa.</strong>",
        "./imagens/descanso-longo.png",
        900
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
  if (timeInSeconds <= 0) {
    audioAlerta.play();
    stop();
    return;
  }
  timeInSeconds -= 1;
  showTime();
}

//Função que ativa o timer
function start() {
  intervalId = setInterval(countDown, 1000);
}

//Função para parar o contador
function stop() {
  clearInterval(intervalId);
  intervalId = null;
}

//função para mostrar tempo na tela
function showTime(){
  const timer = new Date(timeInSeconds * 1000);
  const timeFormated = timer.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
  timerScreen.innerHTML = `${timeFormated}`;
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
    changeTimerButton(e.currentTarget.children, "./imagens/pause.png", "Pausar");
    audioPlay.play();
    start();
    isClicked = 1;
  } else {
    changeTimerButton(e.currentTarget.children, "./imagens/play_arrow.png", "Começar");
    audioStop.play();
    stop();
    isClicked = 0;
  }
}

//Listeners
document.querySelectorAll(".app__card-button").forEach((button) => {
  button.addEventListener("click", clickHandlerContext);
});

document.getElementById("alternar-musica").addEventListener("click", clickHandlerMusic);

document.getElementById("start-pause").addEventListener("click", clickHandlerTimer);

showTime();
