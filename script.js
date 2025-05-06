const questions = [
    {
        question: "Qual é o planeta mais próximo do Sol?",
        alterns: [
            { id: 1, text: "Vênus", correct: false },
            { id: 2, text: "Terra", correct: false },
            { id: 3, text: "Marte", correct: false },
            { id: 4, text: "Mercúrio", correct: true }
        ]
    },
    {
        question: "Quem escreveu o romance Dom Casmurro?",
        alterns: [
            { id: 1, text: "José de Alencar", correct: false },
            { id: 2, text: "Machado de Assis", correct: true },
            { id: 3, text: "Clarice Lispector", correct: false },
            { id: 4, text: "Jorge Amado", correct: false }
        ]
    },
    {
        question: "Qual foi o nome do tratado que pôs fim à Guerra da Sucessão Espanhola em 1713?",
        alterns: [
            { id: 1, text: "Tratado de Versalhes", correct: false },
            { id: 2, text: "Tratado de Tordesilhas", correct: false },
            { id: 3, text: "Tratado de Paris", correct: false },
            { id: 4, text: "Tratado de Utrecht", correct: true }
        ]
    },
    {
        question: "Qual é o nome do manuscrito medieval, escrito em um idioma desconhecido, que intriga linguistas e criptógrafos até hoje?",
        alterns: [
            { id: 1, text: "Manuscrito Voynich", correct: true },
            { id: 2, text: "Manuscrito de Rosetta", correct: false },
            { id: 3, text: "Manuscrito de Alexandria", correct: false },
            { id: 4, text: "Manuscrito de Toledo", correct: false }
        ]
    }
];
const questionElement = document.getElementById("question");
const btnAlt = document.getElementById("btn-alt");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Próxima";
    showQuestion();
}

function resetState() {
    nextBtn.style.display = "none";
    while (btnAlt.firstChild) {
        btnAlt.removeChild(btnAlt.firstChild);
    }
}
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.alterns.forEach((altern) => {
        const button = document.createElement("button");
        button.innerHTML = altern.text.trim();
        button.dataset.id = altern.id;
        button.classList.add("btn");
        button.addEventListener("click", selectaltern);
        btnAlt.appendChild(button);
    });
}

function selectaltern(e) {
    const alterns = questions[currentQuestionIndex].alterns;
    const correctAltern = alterns.find((altern) => altern.correct);

    const selectedBtn = e.target;
    const isCorrect = parseInt(selectedBtn.dataset.id) === correctAltern.id;

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
        Array.from(btnAlt.children).forEach((button) => {
            button.disabled = true;
        });
        nextBtn.style.display = "block";
    } else {
        selectedBtn.classList.add("incorrect");

        window.location.href = "gameover.html"; 

    }
}

function showScore() {
    resetState();
    questionElement.innerHTML = Parabéns! Você acertou todas: ${score} de ${questions.length}!;
    nextBtn.innerHTML = "Jogar Novamente";
    nextBtn.style.display = "block";
}

function handleNextBtn() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextBtn();
    } else {
        startQuiz();
    }
});

startQuiz();

Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
  }
});