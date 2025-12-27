let recordePontos = 0;
let recordeTecla = "---";

function modo4Teclas() {
    // Esconde as teclas 5, 6, 7 e 8
    document.getElementById("box-5").style.display = "none";
    document.getElementById("box-6").style.display = "none";
    document.getElementById("box-7").style.display = "none";
    document.getElementById("box-8").style.display = "none";
}

function modo8Teclas() {
    // Mostra todas
    document.getElementById("box-5").style.display = "flex";
    document.getElementById("box-6").style.display = "flex";
    document.getElementById("box-7").style.display = "flex";
    document.getElementById("box-8").style.display = "flex";
}

let contadores = {
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
    '6': 0,
    '7': 0,
    '8': 0
};

let jogoAtivo = false;
let tempoRestante = 30;

const displayTimer = document.getElementById("timer");
const displayRes = document.getElementById("resultado");
const btnStart = document.getElementById("btnStart");

document.addEventListener("keydown", (event) => {
    if (!jogoAtivo) return;

    if (contadores.hasOwnProperty(event.key)) {
        contadores[event.key]++;
        document.getElementById("count" + event.key).innerText = contadores[event.key];
    }
});

function iniciarJogo() {
    contadores = {'1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0};
    document.getElementById("count1").innerText = 0;
    document.getElementById("count2").innerText = 0;
    document.getElementById("count3").innerText = 0;
    document.getElementById("count4").innerText = 0;
    document.getElementById("count5").innerText = 0;
    document.getElementById("count6").innerText = 0;
    document.getElementById("count7").innerText = 0;
    document.getElementById("count8").innerText = 0;
    displayRes.innerText = "";

    jogoAtivo = true;
    tempoRestante = 30;
    btnStart.disabled = true;
    displayTimer.innerText = `Tempo: ${tempoRestante}s`;

    const intervalo = setInterval(() => {
        tempoRestante--;
        displayTimer.innerText = `Tempo: ${tempoRestante}s`;

        if (tempoRestante <= 0) {
            clearInterval(intervalo);
            finalizarJogo();
        }
    }, 1000);
}

function finalizarJogo() {
    jogoAtivo = false;
    btnStart.disabled = false;
    btnStart.innerText = "JOGAR NOVAMENTE";
    displayTimer.innerText = "TIME: 00:00";

    let entradas = Object.entries(contadores);
    const placar2Visivel = document.getElementById("box-5").style.display !== "none";
    
    if (!placar2Visivel) {
        entradas = entradas.filter(entry => parseInt(entry[0]) <= 4);
    }

    entradas.sort((a, b) => b[1] - a[1]);

    let vencedor = entradas[0];

    if (vencedor[1] === 0) {
        displayRes.innerText = "NENHUM CLIQUE FOI DETECTACO";
        displayRes.style.color = "#888";
    } else {
        displayRes.innerText = `VENCEDOR: JOGADOR ${vencedor[0]}  (${vencedor[1]} CLIQUES)`;
        displayRes.style.color = "#fff";
    }

    if (vencedor[1] > recordePontos) {
        recordePontos = vencedor[1];
        recordeTecla = vencedor[0];
        
        const highScoreEl = document.getElementById("high-score");
        highScoreEl.innerText = `HIGH SCORE: JOGADOR ${recordeTecla} - ${recordePontos}`;
        
        highScoreEl.style.color = "#4dff88"; 
        setTimeout(() => { highScoreEl.style.color = "#888"; }, 2000);
    }
}
