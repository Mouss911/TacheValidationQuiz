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
        question: "Quelle balise utilisera-t-on de préférence pour le titre principal d'une page html:",
        options: [
            "h1",
            "head",
            "heading",
            "h6"
        ],
        correct: "h1"
    },
    {
        id: "1",
        question: "Quelle propriété CSS est utilisée pour contrôler la taille du texte d’un élément ?",
        options: ["font-style", "text-size", "font-size", "text-style"],
        correct: "font-size"
    },
    {
        id: "2",
        question: "Que veut dire CSS ?",
        options: [
            "Cascading Style Shape", 
            "Cascade Science Sheets", 
            "Cascading Style Sheets", 
            "Cascading Style Sharp"
        ],
        correct: "Cascade Science Sheets"
    },
    {
        id: "3",
        question: "QUne liste ordonnée peut être représentée par _",
        options: ["ol", "ul", "li", "el"],
        correct: "ol"
    },
    {
        id: "4",
        question: "En css, qu’est-ce que h1 peut être appelé comme :",
        options: ["Selecteur", "Attribut", "Valeur", "Label"],
        correct: "Selecteur"
    },
    {
        id: "5",
        question: "Quelle est la dernière version du CSS disponible ?",
        options: ["CSS2", "CSS3", "CSS3.1", "CSS4"],
        correct: "CSS3"
    },
    {
        id: "6",
        question: "Les pages Web HTML peuvent être lues et rendues par le :",
        options: [
            "Compilateur",
            "Serveur",
            "Navigateur Web",
            "Interpréteur"
        ],
        correct: "Navigateur Web"
    },
    {
        id: "7",
        question: "Quelle propriété nous permet de créer des bordures arrondies ?",
        options: [
            "Border-style",
            "Border-radius",
            "Radius",
            "Border"
        ],
        correct: "Border-radius"
    },
    {
        id: "8",
        question: "Que représente le padding d'un élément ?",
        options: ["La marge intérieure", "La marge extérieure", "Le contenu de l'élément", "Toutes les réponses"],
        correct: "La marge intérieure"
    },
    {
        id: "9",
        question: "A quoi sert le langage CSS ?",
        options: [
            "A réaliser des pages dynamiques",
            "A ajouter du style aux documents web",
            "A insérer du contenu dans une page internet",
            "Pour se compliquer la vie bien sûr"
        ],
        correct: "A ajouter du style aux documents web"
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