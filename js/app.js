'use strict';
/*
 * Create a list that holds all of your cards
 */

const cards = 
	[
	  'fa-diamond', 'fa-diamond',
	 	'fa-paper-plane-o', 'fa-paper-plane-o',
	 	'fa-anchor', 'fa-anchor',
	 	'fa-bolt', 'fa-bolt',
	 	'fa-leaf', 'fa-leaf',
	 	'fa-bicycle', 'fa-bicycle',
	 	'fa-bomb', 'fa-bomb',
	 	'fa-cube', 'fa-cube'
	];

const generateCard = (card) => {
  return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
};

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Clicked Cards (Show)
const clickedCards = (card) => {
  openedCards.push(card);
  card.classList.add('open', 'show');
}

// MATCH
// Function to use when cards are matched to stay open
const matchedCards = () => {

  // Clicked 1st card
  openedCards[0].classList.add('match', 'open', 'show');
  // Clicked 2nd card
  openedCards[1].classList.add('match', 'open', 'show');
  // Empty out opened cards so user can go click again
  numberMatches += 1;
  openedCards = [];
  counter += 1;
  // Counter for every 2 flip
	

  // If total 8 matches than this alert will show
  if (numberMatches == 2){

    // 
    setTimeout(() => {
      // Gets the end time after matching all
      const totalTime = document.querySelector('.timer').textContent;
      document.querySelector('.totalTime').textContent = totalTime;

      // Stars left
      const starsLeft = document.querySelectorAll('.star').length;
      document.querySelector('.totalStars').textContent = starsLeft;

      // Total Movies
      const totalMoves = document.querySelector('.moves').textContent;
      document.querySelector('.totalMoves').textContent = totalMoves;

      // Resets the time
      clearTimeout(seconds);

      //** Start of Modal **//
      // Get the modal
      const modal = document.getElementById('myModal');

      // Get the span element that closes the modal
      const close = document.getElementsByClassName("close")[0];

      // Open the Modal
			modal.style.display = "block";
			
			// Play again button
			const playAgain = document.getElementById('playAgain');
			playAgain.addEventListener('click', () => {
				location.reload();
			});
	
      // When the user clicks on <span> (x), close the modal
      close.onclick = function() {
    	modal.style.display = "none";
      }

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
    	}
      } // End of Modal	


    }, 1000);
  }
};

// NOT MATCH
// Function to use when cards are NOT matched
const notMatchCards = () => {
  setTimeout(() => {
    openedCards.forEach((card) => {
      card.classList.remove('open', 'show');
    });
    // Empty out opened cards so user can go click again
    openedCards = [];

    // Counter for every 2 flip
  }, 500);
  counter += 1;
};

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

const initGame = () => {
  const deck = document.querySelector('.deck');
  const cardHTML = shuffle(cards).map((card) => {
    return generateCard(card);
  });
  deck.innerHTML = cardHTML.join('');
};

initGame();

// Will select a class card and add event handler 'click'
const allCards = document.querySelectorAll('.card');
// Number of moves
const moves = document.querySelector('.moves');

// Placing opened cards by click into an array
let openedCards = [];
let numberMatches = 0;
let counter = 0;

// Looping through all the class list cards to add show, open, match classes.
allCards.forEach((card) => {
  // Adding the click event listener to all cards
  card.addEventListener('click', () => {
    if (!card.classList.contains('open', 'show', 'open')){

      // When cards are clicked, this function will be used
      clickedCards(card);

      // After 2 card clicks
      if (openedCards.length == 2){

        // Check if the two cards clicked, matches by the data in the class
        if (openedCards[0].dataset.card == openedCards[1].dataset.card){
          // When cards are matched, this function will be used
          matchedCards();
        } else {
          // When cards are not matched, this function will be used
          notMatchCards();
        } 
        // Changes the score moves +1
        moves.textContent = counter;

        // Removes a star after every # of moves
        starRating(counter);
      } // END : if (openedCards.length == 2){
    } // END : if (!card.classList.contains('open', 'show', 'open'))
  }); // END : card.addEventListener('click', () => {
}); // END : allCards.forEach((card) =>

// When clicked on restart, resets the game
const restart = document.querySelector('.restart');

restart.addEventListener('click', () => {
  location.reload();
});

// Star Rating Function
const stars = document.querySelector('.stars');
const star = document.querySelectorAll('.star');

const starRating = (counter) => {
  if (counter == 8){
    stars.removeChild(star[0]);
  }

  if (counter == 12){
    stars.removeChild(star[1]);
  }

  if (counter == 16){
    stars.removeChild(star[2]);
  }
};

// Timer Start
let start = 0;
let seconds;

let timer = () => {
  document.querySelector('.timer').textContent = start;
  start += 1;
  seconds = setTimeout(timer, 1000);
};

timer();
