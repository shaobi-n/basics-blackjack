// functions - start
// function to create deck
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
};
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};
// function to shuffle deck
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};
// Function to sum score array
function sumArray(array) {
  for (
    var index = 0, // The iterator
      length = array.length, // Cache the array length
      sum = 0; // The total amount
    index < length; // The "for"-loop condition
    sum += array[index++] // Add number on each iteration
  );
  return sum;
}
// Function to check for blackjack and bust
var checkConditions = function (scorePlayer, scoreComputer) {
  // Player instant bust condition
  if (scorePlayer > 21) {
    return `Player Bust!`;
  }
  // Computer instant bust condition
  if (scoreComputer > 21) {
    return `Computer Bust!`;
  }
  // Player blackjack condition
  if (scorePlayer == 21) {
    return `Player Blackjack! <br> Player: ${playerCardArray[0].name} of ${playerCardArray[0].suit} and ${playerCardArray[1].name} of ${playerCardArray[1].suit}
    </br>
    Computer: ${computerCardArray[0].name} of ${computerCardArray[0].suit} and ${computerCardArray[1].name} of ${computerCardArray[1].suit}
    </br>
    `;
  }
  // Computer blackjack condition
  if (scoreComputer == 21) {
    return `Player Blackjack! <br> Player: ${playerCardArray[0].name} of ${playerCardArray[0].suit} and ${playerCardArray[1].name} of ${playerCardArray[1].suit}
    </br>
    Computer: ${computerCardArray[0].name} of ${computerCardArray[0].suit} and ${computerCardArray[1].name} of ${computerCardArray[1].suit}
    </br>`;
  }
  // First draw message
  if (scorePlayer < 21 && scoreComputer < 21 && gameTurn == "firstDraw") {
    return `This is the first draw <br> Player: ${playerCardArray[0].name} of ${playerCardArray[0].suit} and ${playerCardArray[1].name} of ${playerCardArray[1].suit}<br> Computer: ${computerCardArray[0].name} of ${computerCardArray[0].suit} and ${computerCardArray[1].name} of ${computerCardArray[1].suit} <br> Player please decide to hit or stand!`;
  }
  // Player second draw hit
  if (gameTurn == "secondDrawHit" && scorePlayer < 21 && scoreComputer < 21) {
    return `Player drew a ${playerCardArray[2].name} of ${playerCardArray[2].suit}, their total score is now ${playerScore} <br> Please enter hit or stand to continue`;
  }
  // Player second draw stand
  if (gameTurn == "secondDrawStand" && scorePlayer < 21 && scoreComputer < 21) {
    return `Player chose to stand! Their score remains at ${playerScore} <br> Computer's turn to hit!`;
  }
};
// functions - end
// Main function - start
var main = function (input) {
  //On submit the deck will be shuffled, and both players will be dealt two cards
  if (gameTurn == "firstDraw" && input == "") {
    shuffledDeck = shuffleCards(makeDeck());
    console.log(shuffledDeck, "shuffledDeck"); // check
    // Each player will be popped two cards from deck and store into array
    playerCardArray.push(shuffledDeck.pop());
    playerCardArray.push(shuffledDeck.pop());
    computerCardArray.push(shuffledDeck.pop());
    computerCardArray.push(shuffledDeck.pop());
    console.log(playerCardArray, "PCA");
    console.log(computerCardArray, "CCA");
    // Retrieve Card Ranks from Player and CPU array & update into scoreArray
    playerScoreArray[0] = playerCardArray[0].rank;
    playerScoreArray[1] = playerCardArray[1].rank;
    computerScoreArray[0] = computerCardArray[0].rank;
    computerScoreArray[1] = computerCardArray[1].rank;
    // Sum Player Score and Computer Score and store in global variable
    playerScore = sumArray(playerScoreArray);
    computerScore = sumArray(computerScoreArray);
    console.log(playerScore, computerScore);
    // Display message for computer and player draw
    return checkConditions(playerScore, computerScore);
    // End of Draw Phase
  }
  // If player chooses to hit after firstDraw
  if (gameTurn == "firstDraw" && input == "hit") {
    gameTurn = "secondDrawHit";
    // Pop additional card into player array
    playerCardArray.push(shuffledDeck.pop());
    // Retrieve card rank from new card and update into score arrray
    playerScoreArray[2] = playerCardArray[2].rank;
    // Sum player score after first hit, and update global variable.
    playerScore = sumArray(playerScoreArray);
    console.log(playerScore);
    // Check player and computer score for blackjack/bust
    return checkConditions(playerScore, computerScore);
  }
  // if player chooses to stand after firstDraw
  if (gameTurn == "firstDraw" && input == "stand") {
    gameTurn = "secondDrawStand";
    return checkConditions(playerScore, computerScore);
  }
};
// Main function - end
// If dealer <17 immediate hit.
// If hand total higher than 21, immediate bust

// //Global Variables // //
// deckArray
var shuffledDeck = [];
var gameTurn = "firstDraw";
// These two are array of objects
var playerCardArray = [];
var computerCardArray = [];
// These two are array of integers
var playerScoreArray = [];
var computerScoreArray = [];
// Two global variables for computer and player score
var playerScore = "";
var computerScore = "";
// Global Variables - End //
