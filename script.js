let recordePontos = 0;
let recordeTecla = "---";
let tempoInicial = 30;
let jogoAtivo = false;
let tempoRestante = tempoInicial;
let intervalo;

const displayTimer = document.getElementById("timer");
const displayRes = document.getElementById("resultado");
const btnStart = document.getElementById("btnStart");

atualizarTimerDisplay();

let contadores = {
    '1': 0, '2': 0, '3': 0, '4': 0,
    '5': 0, '6': 0, '7': 0, '8': 0
};

function modo4Teclas() {
    document.getElementById("box-5").style.display = "none";
    document.getElementById("box-6").style.display = "none";
    document.getElementById("box-7").style.display = "none";
    document.getElementById("box-8").style.display = "none";
}

function modo8Teclas() {
    document.getElementById("box-5").style.display = "flex";
    document.getElementById("box-6").style.display = "flex";
    document.getElementById("box-7").style.display = "flex";
    document.getElementById("box-8").style.display = "flex";
}

document.addEventListener("keydown", (event) => {
    
    if (event.key === 'ArrowUp') {
        event.preventDefault();
        ajustarTempo(1);
    }
    if (event.key === 'ArrowDown') {
        event.preventDefault();
        ajustarTempo(-1);
    }

    if (event.key === 'F3') {
        event.preventDefault();
        if (!jogoAtivo) iniciarJogo();
    }

    if (!jogoAtivo) return;

    if (contadores.hasOwnProperty(event.key)) {
        contadores[event.key]++;
        document.getElementById("count" + event.key).innerText = contadores[event.key];
    }
});

function ajustarTempo(valor) {
    if (jogoAtivo) {
        tempoRestante += valor;
        if (tempoRestante <= 0) finalizarJogo();
    } else {
        tempoInicial += valor;
        if (tempoInicial < 1) tempoInicial = 1;
        tempoRestante = tempoInicial;
    }
    atualizarTimerDisplay();
}

function iniciarJogo() {
    contadores = {'1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0};
    for(let i=1; i<=8; i++) {
        document.getElementById("count"+i).innerText = 0;
    }
    displayRes.innerText = "";

    jogoAtivo = true;
    tempoRestante = tempoInicial;
    btnStart.disabled = true;
    
    atualizarTimerDisplay();

    clearInterval(intervalo);
    intervalo = setInterval(() => {
        tempoRestante--;
        atualizarTimerDisplay();

        if (tempoRestante <= 0) {
            clearInterval(intervalo);
            finalizarJogo();
        }
    }, 1000);
}

function atualizarTimerDisplay() {
    let minutos = Math.floor(tempoRestante / 60);
    let segundos = tempoRestante % 60;

    let minStr = minutos < 10 ? '0' + minutos : minutos;
    let secStr = segundos < 10 ? '0' + segundos : segundos;

    displayTimer.innerText = `TEMPO: ${minStr}:${secStr}`;
}

function finalizarJogo() {
    jogoAtivo = false;
    clearInterval(intervalo);
    btnStart.disabled = false;
    btnStart.innerText = "JOGAR NOVAMENTE";
    
    displayTimer.innerText = "TEMPO: 00:00";

    let entradas = Object.entries(contadores);
    const placar2Visivel = document.getElementById("box-5").style.display !== "none";
    
    if (!placar2Visivel) {
        entradas = entradas.filter(entry => parseInt(entry[0]) <= 4);
    }

    entradas.sort((a, b) => b[1] - a[1]);

    let vencedor = entradas[0];

    if (vencedor[1] === 0) {
        displayRes.innerText = "NENHUM CLIQUE FOI DETECTADO";
        displayRes.style.color = "#888";
    } else {
        displayRes.innerText = `VENCEDOR: JOGADOR ${vencedor[0]}  (${vencedor[1]} CLIQUES)`;
        displayRes.style.color = "#fff";
    }

    if (vencedor[1] > recordePontos) {
        recordePontos = vencedor[1];
        recordeTecla = vencedor[0];
        
        const highScoreEl = document.getElementById("high-score");
        if(highScoreEl) {
            highScoreEl.innerText = `HIGH SCORE: JOGADOR ${recordeTecla} - ${recordePontos}`;
            highScoreEl.style.color = "#4dff88"; 
            setTimeout(() => { highScoreEl.style.color = "#888"; }, 2000);
        }
    }
}
