
  //Array of 6 sets of objects each with a name and image
  const cardArray = [
    {
      name: 'fries',
      img: 'images/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: 'images/ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png'
    },
    {
      name: 'fries',
      img: 'images/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: 'images/ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png'
    }
  ]

//randomly shuffles an array
cardArray.sort(() => 0.5 - Math.random())

const gridDisplay = document.querySelector('.grid')
const resultDisplay = document.querySelector('#result')

//empty array to be filled with flipped card images
let cardsChosen = []
//empty array used when checking matches
let cardsChosenIds = []
//array to keep track of score
const cardsWon = []

//create the card grid
const createBoard = () => {
  for (i=0; i< cardArray.length; i++) {
    //generate 10 image tags in html
    const card = document.createElement('img')
    
    //set the images to what I want
    card.setAttribute('src', 'images/blank.png')
    
    //assign the images an id tag
    card.setAttribute('data-id', i)
    
    //calls flipCard function when image is clicked. flipcard is a callback. (has no () )
    card.addEventListener('click', flipCard)
    
    //add the cards onto the div with the grid class
    gridDisplay.appendChild(card)
  }
}
createBoard()

function checkMatch(){
  //searches for all images within the grid class
  const cards = document.querySelectorAll('.grid img')
  const optionOneId = cardsChosenIds[0]
  const optionTwoId = cardsChosenIds[1]

    //alert if same image is clicked
    if (optionOneId == optionTwoId) {
      alert('Please choose a different image')
    }
  
    //if a match is found
    if (cardsChosen[0] == cardsChosen[1]) {
      alert('You found a match!')
      //change the cards to white
      cards[optionOneId].setAttribute('src', 'images/white.png')
      cards[optionTwoId].setAttribute('src', 'images/white.png')

      //remove the event listener so they can't be clicked
      cards[optionOneId].removeEventListener('click' , flipCard)
      cards[optionTwoId].removeEventListener('click' , flipCard)

      //fills array with completed flipped cards
      cardsWon.push(cardsChosen)
  } else {
    cards[optionOneId].setAttribute('src', 'images/blank.png')
    cards[optionTwoId].setAttribute('src', 'images/blank.png')
  }

  resultDisplay.textContent = cardsWon.length
  cardsChosen = []
  cardsChosenIds = []

  if (cardsWon.length == cardArray.length/2)
    resultDisplay.innerHTML = " Congratulations, you've won!!!"
}

//flips card when clicked

function flipCard() {
  //gets the id of whatever card is clicked.
  const cardId = this.getAttribute('data-id')
    
  //adds the clicked card to an array
  cardsChosen.push(cardArray[cardId].name)
  cardsChosenIds.push(cardId)
  //
  console.log(cardsChosen)
  console.log(cardsChosenIds)
  //sets the image to the correct image for the card id
  this.setAttribute('src', cardArray[cardId].img)

  if(cardsChosen.length === 2) {
    setTimeout( checkMatch, 500)
  }

}