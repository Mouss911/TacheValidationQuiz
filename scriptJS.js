let tempsRestant = document.querySelector(".temps-restant");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let nbreQuestion = document.querySelector(".nombre-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let acCueil = document.querySelector(".accueil");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countDown;

// Tableau de 10 questions avec les réponses
const quizArray = [
    {
        id: "0",
        question: "Quelle est la méthode spécifiée dans le DOM-2 pour l'ajout des gestionnaires d'événements ?",
        options: [
            "addEventListener",
            "attachEvent",
            "attachEventListener",
            "listen"
        ],
        correct: "addEventListener"
    },
    {
        id: "1",
        question: "Quel est le résultat de parseInt('010',8) ?",
        options: ["1", "2", "8", "18"],
        correct: "8"
    },
    {
        id: "2",
        question: "Comment faire appelle à une fonction nommée « sum » ?",
        options: [
            "sum()", 
            "call function sum()", 
            "call sum()", 
            "Aucune de ces réponses n’est vraie"
        ],
        correct: "sum()"
    },
    {
        id: "3",
        question: "Depuis quand sont disponibles les arrow functions ?",
        options: ["JavaScript 1.7", "ECMAScript 6", "ECMAScript 7", "ECMAScript 2018"],
        correct: "ECMAScript 6"
    },
    {
        id: "4",
        question: "Comment créer une fonction en JavaScript ?",
        options: ["function f()", "function = f()", "function:f()", "Aucune de ces réponses n’est vraie"],
        correct: "function f()"
    },
    {
        id: "5",
        question: "Lequel de ces paramètres n’est pas valide ?",
        options: ["texte", "une variable", "un opérateur", "un nombre"],
        correct: "un opérateur"
    },
    {
        id: "6",
        question: "Quel événement est spécifique au clavier ?",
        options: [
            "onkeypress",
            "onkeydown",
            "onclick",
            "onfocus"
        ],
        correct: "onkeypress"
    },
    {
        id: "7",
        question: "Quelle déclaration fournit la valeur d’une fonction ?",
        options: [
            "return",
            "cancel",
            "continue",
            "valueOf"
        ],
        correct: "return"
    },
    {
        id: "8",
        question: "Combien de paramètres peuvent être passés à une fonction ?",
        options: ["Aucune", "Autant que vous voulez", "Un pour chaque argument", "Un"],
        correct: "Un pour chaque argument"
    },
    {
        id: "9",
        question: "Quelle propriété est orienté objet ?",
        options: [
            "une fonction",
            "une déclaration if",
            "une variable",
            "un mot réservé"
        ],
        correct: "une variable"
    }
];


// Retour à la page d'accueil
restart.addEventListener("click", () => {
    //initial();
    //displayContainer.classList.remove("hide");
    //scoreContainer.classList.add("hide");
    window.location = "index.html";
});

nextBtn.addEventListener("click", (displayNext = () => {
    questionCount += 1;

    if(questionCount == quizArray.length){
        displayContainer.classList.add("hide");
        scoreContainer.classList.remove("hide");
        userScore.innerHTML = "Votre score est : " + scoreCount + " / " + questionCount;
    } else{
        nbreQuestion.innerHTML = questionCount + 1 + " des " + quizArray.length + " Questions";
        quizDisplay(questionCount);
        count = 11;
        clearInterval(countDown);
        timerDisplay();
    }
})
);


// Compte à rebours de 10 secondes
const timerDisplay = () => {
    countDown = setInterval(() => {
        count--;
        tempsRestant.innerHTML = `${count}s`;
        if (count == 0){
            clearInterval(countDown);
            displayNext();
        }
    }, 1000);
};

const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    quizCards[questionCount].classList.remove("hide");
};


// A chaque RESTART, l'ordre des questions change de manière aléatoire
function quizCreater() {
    quizArray.sort(() => Math.random - 0.5);
    
    for (let i of quizArray) {
        i.options.sort(() => Math.random - 0.5);
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");

        nbreQuestion.innerHTML = 1 + " des " + quizArray.length + " Question";

        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);

        div.innerHTML += `
        <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
        `;

        quizContainer.appendChild(div);
    }
}

function checker(userOption) {
    let userSolution = userOption.innerText;
    let question = document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");

        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    clearInterval(countDown);
    options.forEach((element) => {
        element.disabled = true;
    });
}


function initial(){
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countDown);
    timerDisplay();
    quizCreater();
    quizDisplay(questionCount);
}

startButton.addEventListener("click", () => {
    acCueil.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

window.onload = () => {
    acCueil.classList.remove("hide");
    displayContainer.classList.add("hide");
};