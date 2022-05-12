

const squares = document.querySelectorAll('.square')
const mole = document.querySelector('.mole')
let timeLeft = document.getElementById('time-left')
let score = document.getElementById('score')
let startButton = document.getElementById('start-button')

let result = 0
let hitPosition
let currentTime = 60
let countDownTimerId
let timerId = null //used to start the mole randomizer. use clearInterval(timerId) to stop the function

//cycles through random squares
function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole')
    })

    let randomSquare = squares[Math.floor(Math.random() * 9)]
    console.log(randomSquare)
    randomSquare.classList.add('mole')
    hitPosition = randomSquare.id
}

squares.forEach(square => {
    square.addEventListener('mousedown' ,() => {
        if (square.id == hitPosition) {
            result++
            score.textContent = result
            hitPosition = null
        }
    })
})

function moveMole() {
    timerId = setInterval(randomSquare, 700)
}






//set this to a start button

function countDown () {
    currentTime--
    timeLeft.textContent = currentTime

    if(currentTime == 0) {
        clearInterval(countDownTimerId)
        clearInterval(timerId)
        alert("GAME OVER! Your final score is " + result)
    }
}

//moveMole()
//countDownTimerId = setInterval(countDown, 1000)

startButton.addEventListener('click' , startGame)

function startGame () {
    moveMole()
    countDownTimerId = setInterval(countDown, 1000)
    startButton.removeEventListener('click' , startGame)
}
