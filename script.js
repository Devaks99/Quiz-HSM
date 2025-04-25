const questions = [
    {
        question: "O que é o 'código invisível' mencionado na palestra?",
        options: [
            "Ferramentas de debug", 
            "As decisões e valores por trás de projetos bem-sucedidos", 
            "Códigos de programação complexos" 
        ],
        correct: 1 
    },
    {
        question: "Qual é o primeiro passo para 'hackear a mente' segundo as dicas?",
        options: [
            "Usar a técnica do 'E se...?' para simular cenários", 
            "Copiar projetos famosos", 
            "Contratar um mentor" 
        ],
        correct: 0 
    },
    {
        question: "Qual caso foi citado como exemplo de projeto que começou pequeno?",
        options: [
            "Google", 
            "Tesla", 
            "GitHub" 
        ],
        correct: 2 
    },
    {
        question: "O que NÃO faz parte dos elementos de projetos marcantes?",
        options: [
            "Execução perfeita desde o início", 
            "Clareza de propósito", 
            "Visibilidade + Narrativa" 
        ],
        correct: 0 
    },
    {
        question: "Qual frase resume o mindset proposto?",
        options: [
            "Espere a inspiração perfeita", 
            "Só publique projetos completos", 
            "Comece pequeno, mas comece hoje!" 
        ],
        correct: 2 
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

function loadQuestion() {
    answered = false;
    const q = questions[currentQuestion];
    document.getElementById('question').textContent = q.question;
    
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = q.options.map((opt, idx) => `
        <div class="option" data-index="${idx}">${opt}</div>
    `).join('');
    
    // Atualizar barra de progresso
    document.getElementById('progress-bar').style.width = 
        `${((currentQuestion + 1) / questions.length) * 100}%`;
    
    // Adicionar event listeners para as opções
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', function() {
            if (answered) return;
            answered = true;
            selectOption(parseInt(this.dataset.index));
        });
    });
}

function selectOption(selectedIdx) {
    const correct = questions[currentQuestion].correct;
    const options = document.querySelectorAll('.option');
    
    options.forEach((opt, idx) => {
        if (idx === correct) {
            opt.classList.add('option-correct');
        } else {
            opt.classList.add('option-disabled');
        }
        
        if (idx === selectedIdx && idx !== correct) {
            opt.classList.add('option-incorrect');
        }
    });

    if (selectedIdx === correct) {
        score++;
    }
    
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
    
    if (score === questions.length) {
        resultText.innerHTML = "🏆 Mente Hackeada! 🏆";
        actionStep.innerHTML = "Você dominou os códigos invisíveis! Que tal criar um projeto que una <em>Clareza + Narrativa</em> hoje?";
    } else if (score >= questions.length * 0.6) {
        resultText.innerHTML = "Muito bom! 🚀";
        actionStep.innerHTML = `Você acertou ${score}/${questions.length}. Está no caminho certo! Lembre-se: <em>Todo grande projeto começa pequeno</em>.`;
    } else {
        resultText.innerHTML = "Quase lá! 🔍";
        actionStep.innerHTML = `Você acertou ${score}/${questions.length}. Revise as dicas e lembre-se: <em>Falhar rápido é aprender mais rápido</em>!`;
    }

    // Efeito de confetti dinâmico
    const confetti = ['✨', '🚀', '💡', '🎯', '🧠', '💻'];
    
    function updateConfetti() {
        document.getElementById('confetti').textContent = 
            confetti[Math.floor(Math.random() * confetti.length)];
    }
    
    setInterval(updateConfetti, 300);
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('feedback').style.display = 'none';
    document.getElementById('options').style.display = 'grid';
    document.getElementById('question').style.display = 'block';
    loadQuestion();
}

// Iniciar quiz
document.addEventListener('DOMContentLoaded', loadQuestion);