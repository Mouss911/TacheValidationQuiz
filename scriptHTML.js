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
        question: "Que signifie HTML ?",
        options: [
            "HighText Machine Language",
            "HyperText and links Markup Language",
            "HyperText Markup Language",
            "Aucune de ces réponses"
        ],
        correct: "HyperText Markup Language"
    },
    {
        id: "1",
        question: "Quel est parmis ces éléments HTML, celui qui nous permet de mettre un texte en gras ?",
        options: ["pre", "a", "b", "br"],
        correct: "b"
    },
    {
        id: "2",
        question: "HTML est considéré comme ______ ?",
        options: [
            "Langage de programmation", 
            "Langage POO", 
            "Langage de haut niveau", 
            "Langage de balisage"
        ],
        correct: "Langage de balisage"
    },
    {
        id: "3",
        question: "Qui est l’auteur principal du HTML ?",
        options: ["Brendan Eich", "Tim Berners-Lee", "Développeur web", "Google Inc"],
        correct: "Tim Berners-Lee"
    },
    {
        id: "4",
        question: "Si nous souhaitons définir le style d’un seule élément, quel sélecteur css utiliserons-nous ?",
        options: ["text", "id", "class", "name"],
        correct: "id"
    },
    {
        id: "5",
        question: "La balise HTML qui spécifie un style CSS intégré dans un élément est appelée ____?",
        options: ["Design", "Style", "Modify", "Define"],
        correct: "Style"
    },
    {
        id: "6",
        question: "Un type de document HTML plus strict est connu sous ___ ?",
        options: [
            "DHTML",
            "XHTML",
            "XML",
            "HTML"
        ],
        correct: "XHTML"
    },
    {
        id: "7",
        question: "Une page conçue en HTML s’appelle ?",
        options: [
            "Application",
            "Page de garde",
            "Front-end",
            "Page Web"
        ],
        correct: "Page Web"
    },
    {
        id: "8",
        question: "Le document HTML contient une balise racine appelée __",
        options: ["HEAD", "Title", "Body", "HTML"],
        correct: "HTML"
    },
    {
        id: "9",
        question: "Un document HTML peut contenir ___",
        options: [
            "Des attributs",
            "Des balises",
            "Texte brut",
            "Toutes les réponses sont vraies"
        ],
        correct: "Toutes les réponses sont vraies"
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