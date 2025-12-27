let contadores = {
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0
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
    contadores = {'1': 0, '2': 0, '3': 0, '4': 0};
    document.getElementById("count1").innerText = 0;
    document.getElementById("count2").innerText = 0;
    document.getElementById("count3").innerText = 0;
    document.getElementById("count4").innerText = 0;
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
    displayTimer.innerText = "Tempo Esgotado!";

    let entradas = Object.entries(contadores);

    entradas.sort((a, b) => b[1] - a[1]);

    let vencedor = entradas[0];

    if (vencedor[1] === 0) {
        displayRes.innerText = "Você não apertou nada!";
    } else {
        displayRes.innerText = `A tecla mais clicada foi "${vencedor[0]}" com ${vencedor[1]} cliques!`;
        displayRes.style.color = "green";
    }
}