const computerChoiceDisplay = document.getElementById('computer-choice')
const userChoiceDisplay = document.getElementById('user-choice')
const resuultDisplay = document.getElementById('result')
const possibleChoices = document.querySelectorAll('button')
let userChoice
let computerChoice
let result

possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => {
    userChoice = e.target.id
    userChoiceDisplay.innerHTML = userChoice
    generateComputerChoice()
    getResult()

}))

//generate a random computer choice and map it to rock/paper/scissors
//picks a random ID from the array of buttons.
//this wouldn't work if there were additional buttons on the page. probably wouldn't use querySelectorAll
function generateComputerChoice() {
    const randomNumber = Math.floor(Math.random() * possibleChoices.length)
    computerChoice = possibleChoices[randomNumber].id
    computerChoiceDisplay.innerHTML = computerChoice

}

function getResult() {

    if (userChoice === computerChoice) {
        result = "It's a draw."
    }
    if (userChoice === "Rock" && computerChoice === "Scissors") {
        result = "You win!"
    }
    if (userChoice === "Rock" && computerChoice === "Paper") {
        result = "You lose!"
    }
    if (userChoice === "Paper" && computerChoice === "Rock") {
        result = "You win!"
    }
    if (userChoice === "Paper" && computerChoice === "Scissors") {
        result = "You lose!"
    }
    if (userChoice === "Scissors" && computerChoice === "Paper") {
        result = "You win!"
    }
    if (userChoice === "Scissors" && computerChoice === "Rock") {
        result = "You lose!"
    }
    resuultDisplay.innerHTML = result
}


