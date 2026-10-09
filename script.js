const perguntas = [
    {
        pergunta: "Qual linguagem adiciona interatividade a um site?",
        alternativas: ["HTML", "CSS", "JavaScript", "SQL"],
        respostaCorreta: 2
    },
    {
        pergunta: "Qual linguagem define a estrutura de uma página web?",
        alternativas: ["Java", "HTML", "Python", "PHP"],
        respostaCorreta: 1
    },
    {
        pergunta: "Para que serve o CSS?",
        alternativas: [
            "Guardar informações",
            "Criar tabelas no banco",
            "Estilizar páginas",
            "Enviar mensagens"
        ],
        respostaCorreta: 2
    },
    {
        pergunta: "O que significa DOM?",
        alternativas: [
            "Document Object Model",
            "Data Online Method",
            "Digital Object Machine",
            "Document Order Mode"
        ],
        respostaCorreta: 0
    },
    {
        pergunta: "Qual método seleciona um elemento pelo ID?",
        alternativas: [
            "document.getElementById()",
            "document.createElement()",
            "console.log()",
            "alert()"
        ],
        respostaCorreta: 0
    }
];

let indicePerguntaAtual = 0;
let pontuacao = 0;
let respondeu = false;

const telaQuiz = document.querySelector("#tela-quiz");
const telaResultado = document.querySelector("#tela-resultado");

const numeroPergunta = document.querySelector("#numero-pergunta");
const pontuacaoAtual = document.querySelector("#pontuacao-atual");
const barraProgresso = document.querySelector("#barra-progresso");
const textoPergunta = document.querySelector("#texto-pergunta");
const alternativas = document.querySelector("#alternativas");
const feedback = document.querySelector("#feedback");

const botaoProximo = document.querySelector("#botao-proximo");
const botaoReiniciar = document.querySelector("#botao-reiniciar");

// Exibe a pergunta atual
function mostrarPergunta() {
    respondeu = false;

    const pergunta = perguntas[indicePerguntaAtual];

    numeroPergunta.textContent =
        `Pergunta ${indicePerguntaAtual + 1} de ${perguntas.length}`;

    pontuacaoAtual.textContent = `Pontos: ${pontuacao}`;

    barraProgresso.style.width =
        `${(indicePerguntaAtual / perguntas.length) * 100}%`;

    textoPergunta.textContent = pergunta.pergunta;
    alternativas.innerHTML = "";
    feedback.textContent = "";
    feedback.className = "feedback";

    botaoProximo.disabled = true;
    botaoProximo.textContent = "Próxima pergunta →";

    const letras = ["A", "B", "C", "D"];

    pergunta.alternativas.forEach((texto, indice) => {
        const botao = document.createElement("button");
        botao.type = "button";
        botao.className = "alternativa";

        const letra = document.createElement("span");
        letra.className = "letra";
        letra.textContent = letras[indice];

        const resposta = document.createElement("span");
        resposta.textContent = texto;

        botao.append(letra, resposta);

        botao.addEventListener("click", () => {
            verificarResposta(indice);
        });

        alternativas.appendChild(botao);
    });
}

// Verifica se a resposta está correta
function verificarResposta(indiceEscolhido) {
    if (respondeu) return;

    respondeu = true;

    const pergunta = perguntas[indicePerguntaAtual];
    const botoes = alternativas.querySelectorAll(".alternativa");

    const acertou = indiceEscolhido === pergunta.respostaCorreta;

    botoes.forEach((botao, indice) => {
        botao.disabled = true;

        if (indice === pergunta.respostaCorreta) {
            botao.classList.add("correta");
        }
    });

    if (acertou) {
        pontuacao++;

        feedback.textContent = "Resposta correta! Parabéns!";
        feedback.classList.add("certo");
    } else {
        botoes[indiceEscolhido].classList.add("errada");

        feedback.textContent =
            "Resposta incorreta! A alternativa correta está em verde.";

        feedback.classList.add("errado");
    }

    pontuacaoAtual.textContent = `Pontos: ${pontuacao}`;

    botaoProximo.disabled = false;

    if (indicePerguntaAtual === perguntas.length - 1) {
        botaoProximo.textContent = "Ver resultado →";
    }
}

// Avança para a próxima pergunta
function proximaPergunta() {
    if (!respondeu) return;

    indicePerguntaAtual++;

    if (indicePerguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
}

// Mostra a pontuação final
function mostrarResultado() {
    telaQuiz.hidden = true;
    telaResultado.hidden = false;

    const porcentagem = (pontuacao / perguntas.length) * 100;

    document.querySelector("#pontuacao-final").textContent =
        `${pontuacao}/${perguntas.length}`;

    const titulo = document.querySelector("#titulo-resultado");
    const mensagem = document.querySelector("#mensagem-resultado");

    if (porcentagem === 100) {
        titulo.textContent = "Perfeito!";
        mensagem.textContent =
            "Você acertou todas as perguntas. Parabéns!";
    } else if (porcentagem >= 60) {
        titulo.textContent = "Muito bem!";
        mensagem.textContent =
            "Você foi bem! Continue estudando para melhorar.";
    } else {
        titulo.textContent = "Continue praticando!";
        mensagem.textContent =
            "Estude mais um pouco e tente novamente!";
    }

    barraProgresso.style.width = "100%";
}

// Reinicia o quiz
function reiniciarQuiz() {
    indicePerguntaAtual = 0;
    pontuacao = 0;

    telaResultado.hidden = true;
    telaQuiz.hidden = false;

    mostrarPergunta();
}

// Eventos dos botões
botaoProximo.addEventListener("click", proximaPergunta);
botaoReiniciar.addEventListener("click", reiniciarQuiz);

// Inicia o site
mostrarPergunta();