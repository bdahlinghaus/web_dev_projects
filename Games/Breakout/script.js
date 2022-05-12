
//set number of rows
const blocksPerRow = 5 //can't be modified yet
const blockRows = 5


const grid = document.querySelector('.grid')
let scoreDisplay = document.querySelector('#score')
const startButton = document.getElementById('#start-button')
let score = 0
scoreDisplay.innerHTML = score

const blockWidth = 100
const blockHeight = 20
const boardWidth = 560
const boardHeight = 300
const ballDiameter = 20

let timerId
let xDirection = 2
let yDirection = 2

const userStart = [230,10]
let currentPosition = userStart

const ballStart = [270, 40]
let ballCurrentPosition = ballStart


//create block
class Block {
    constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis]
    this.bottomRight = [xAxis + blockWidth, yAxis]
    this.topLeft = [xAxis, yAxis + blockHeight]
    this.topRight = [xAxis = blockWidth, yAxis + blockHeight]
    }
}

//all my blocks
//fill with a loop if you're smart
const blocks = []

function fillBlockArray (x,y) {
    for (i = 0; i < blockRows; i++) {
        for (j = 0; j < blocksPerRow; j++) {
            blocks.push(new Block(x,y))
            x = x + (blockWidth + 10)
        
        }
        y = y - (blockHeight + 10)
        x = x - (blocksPerRow * (blockWidth + 10))
    }
}

//draw my block
function addBlocks () {
    for (let i=0; i < blocks.length; i++) {
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block)
    }
}

fillBlockArray(10,270)
addBlocks()

//add user
const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)


//draw user
function drawUser() {
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}

//draw ball
function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'
}

//move user
function moveUser(e) {
    switch(e.key) {
        case 'ArrowLeft':
            if(currentPosition[0] > 0) { //stops paddle from moving off the screen
            currentPosition[0] -= 10
            drawUser()
            }
            break;    
        case 'ArrowRight':
            if(currentPosition[0] < boardWidth - blockWidth) { //stops paddle from moving off the screen
                currentPosition[0] += 10
                drawUser()
                }
                break; 
    }
}

document.addEventListener('keydown', moveUser)

//add ball
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

//move ball
function moveBall() {
    ballCurrentPosition [0] += xDirection
    ballCurrentPosition [1] += yDirection
    drawBall()
    checkForCollisions()
}

timerId = setInterval(moveBall, 30)


//check for collisions
function checkForCollisions() {

    //check for block collisions
    for (let i = 0; i < blocks.length; i++) {
        //if the ball is within the perimeter of a block
        if (
            (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
            ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])
        ) {
            //get all the blocks and remove their class. 
            //remove from the array of blocks
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i, 1)
            changeDirection()
            score ++
            scoreDisplay.innerHTML = score

            //check for win and speed up ball
            if (blocks.length === 0) {
                scoreDisplay.innerHTML = 'Congratulations! You win!'
                clearInterval(timerId)
                removeEventListener('keydown', moveUser)
            }



        }
    }
    //check for wall collisions
    if (ballCurrentPosition[0] >= (boardWidth - ballDiameter) || 
        ballCurrentPosition[1] >= (boardHeight - ballDiameter) ||
        ballCurrentPosition[0] <= 0 
        ){
        changeDirection()
    }

    //check for user collisions
    if (
        (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) &&
        (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight)
        ) {
            changeDirection()
        }

    //check for game over
    if (ballCurrentPosition[1] < 0) {
        clearInterval(timerId)
        scoreDisplay.innerHTML = 'Game Over'
        document.removeEventListener('keydown' , moveUser)
    }
}

function changeDirection() {
    if(xDirection === 2 && yDirection === 2) {
        yDirection = -2
        return
    }
    if(xDirection === 2 && yDirection === -2) {
        xDirection = -2
        return
    }
    if(xDirection === -2 && yDirection === -2) {
        yDirection = 2
        return
    }
    if(xDirection === -2 && yDirection === 2) {
        xDirection = 2
        return
    }
   }
