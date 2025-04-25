const questions = [
    {
        question: "O que é o 'código invisível' mencionado na palestra?",
        options: [
            "Ferramentas de debug", // Opção A
            "As decisões e valores por trás de projetos bem-sucedidos", // Opção B (correta)
            "Códigos de programação complexos" // Opção C
        ],
        correct: 1 
    },
    {
        question: "Qual é o primeiro passo para 'hackear a mente' segundo as dicas?",
        options: [
            "Usar a técnica do 'E se...?' para simular cenários", // Opção A (correta)
            "Copiar projetos famosos", // Opção B
            "Contratar um mentor" // Opção C
        ],
        correct: 0 
    },
    {
        question: "Qual caso foi citado como exemplo de projeto que começou pequeno?",
        options: [
            "Google", // Opção A
            "Tesla", // Opção B
            "GitHub" // Opção C (correta)
        ],
        correct: 2 
    },
    {
        question: "O que NÃO faz parte dos elementos de projetos marcantes?",
        options: [
            "Execução perfeita desde o início", // Opção A (correta)
            "Clareza de propósito", // Opção B
            "Visibilidade + Narrativa" // Opção C
        ],
        correct: 0 
    },
    {
        question: "Qual frase resume o mindset proposto?",
        options: [
            "Espere a inspiração perfeita", // Opção A
            "Só publique projetos completos", // Opção B
            "Comece pequeno, mas comece hoje!" // Opção C (correta)
        ],
        correct: 2 
    }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    const q = questions[currentQuestion];
    document.getElementById('question').textContent = q.question;
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = q.options.map((opt, idx) => `
        <div class="option" onclick="selectOption(${idx})">${opt}</div>
    `).join('');
    document.querySelector('.progress').style.width = 
        `${((currentQuestion + 1) / questions.length) * 100}%`;
}

function selectOption(selectedIdx) {
    const correct = questions[currentQuestion].correct;
    const options = document.querySelectorAll('.option');
    
    options.forEach((opt, idx) => {
        opt.style.pointerEvents = 'none';
        if (idx === correct) {
            opt.style.border = '2px solid #2DD4BF';
        } else {
            opt.style.opacity = '0.5';
        }
    });

    if (selectedIdx === correct) score++;
    
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showFeedback();
        }
    }, 1500);
}

function showFeedback() {
    document.getElementById('options').style.display = 'none';
    document.getElementById('question').style.display = 'none';
    document.getElementById('feedback').style.display = 'block';
    
    const resultText = document.getElementById('result-text');
    const actionStep = document.getElementById('action-step');
    
    if (score === 5) {
        resultText.innerHTML = "Mente Hackeada!";
        actionStep.innerHTML = "Você dominou os códigos invisíveis! Que tal criar um projeto que una <em>Clareza + Narrativa</em> hoje?";
    } else {
        resultText.innerHTML = "Quase lá! 🔍";
        actionStep.innerHTML = `Você acertou ${score}/5. Revisite as dicas e lembre-se: <em>Todo projeto começa pequeno</em>!`;
    }

    // Efeito de confetti dinâmico
    const confetti = ['✨', '🚀', '💡', '🎯'];
    setInterval(() => {
        document.querySelector('.confetti').textContent = 
            confetti[Math.floor(Math.random() * confetti.length)];
    }, 300);
}

// Iniciar quiz
loadQuestion();