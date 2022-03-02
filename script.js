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
// Function to check for blackjack, bust, win and lose
var checkConditions = function (scorePlayer, scoreComputer) {
  // Instant win/bust conditions
  if (scorePlayer > 21) {
    return `Player Bust! Their total score was ${playerScore}`;
  }
  if (scoreComputer > 21) {
    return `Computer Bust!`;
  }
  if (scorePlayer == 21) {
    return `Player Blackjack`;
  }
  if (scoreComputer == 21) {
    return `Computer Blackjack`;
  }
  if (gameTurn == "Deal" && scorePlayer < 21 && scoreComputer < 21) {
    return `These cards were dealt <br>
    Player: ${playerCardArray[0].name} of ${playerCardArray[0].suit} and ${playerCardArray[1].name} of ${playerCardArray[1].suit}
      <br> Computer: ${computerCardArray[0].name} of ${computerCardArray[0].suit} and ${computerCardArray[1].name} of ${computerCardArray[1].suit} 
      <br> Player Score: ${playerScore} 
      <br> Computer Score: ${computerScore}`;
  }
  // draw condition
  if ((scorePlayer == computerScore && gameTurn == "cpuStand") || "cpuHit") {
    `Draw! The scores of both players are equal <br> Player Score: ${playerScore} <br> Computer Score: ${computerScore}`;
  }
  // prettier-ignore
  if (scorePlayer < scoreComputer && gameTurn == "cpuStand" || gameTurn == "cpuHit") {
    return `Computer wins! <br> Player Score: ${playerScore} <br> Computer Score: ${computerScore}`;
  }
  // prettier-ignore
  if (scorePlayer > scoreComputer && gameTurn == "cpuStand" || gameTurn == "cpuHit") {
    return `Player wins! <br> Player Score: ${playerScore} <br> Computer Score: ${computerScore}`;
  }
  // prettier-ignore
};
// Hit function for player
// functions - end
// Main function - start
var main = function (input) {
  //On submit the deck will be shuffled, and both players will be dealt two cards
  if (gameTurn == "Deal" && input == "") {
    shuffledDeck = shuffleCards(makeDeck());
    console.log(shuffledDeck, "shuffledDeck"); // check
    // Each player will be popped two cards from deck and store into array
    playerCardArray.push(shuffledDeck.pop());
    playerCardArray.push(shuffledDeck.pop());
    computerCardArray.push(shuffledDeck.pop());
    computerCardArray.push(shuffledDeck.pop());
    console.log(playerCardArray, "lPCA");
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
    // End of Draw Phase
    return checkConditions(playerScore, computerScore);
  }
  // If player decides to hit after deal
  if (gameTurn == "Deal" && input == "hit") {
    playerHitCounter = playerHitCounter + 1;
    playerCardArray.push(shuffledDeck.pop());
    playerScoreArray[playerHitCounter] = playerCardArray[playerHitCounter].rank;
    console.log(playerCardArray[playerHitCounter].rank), "149";
    playerScore = sumArray(playerScoreArray);
    console.log(playerScore);
    return `Player drew a ${playerCardArray[playerHitCounter].name} of ${
      playerCardArray[playerHitCounter].suit
    }. <br> ${checkConditions(playerScore, computerScore)} `;
  }
  // if player decides to stand after deal and CPU has to hit
  if ((input == "stand") & (computerScore < 17)) {
    gameTurn = "cpuHit";
    computerCardArray.push(shuffledDeck.pop());
    computerScoreArray[2] = computerCardArray[2].rank;
    computerScore = sumArray(playerScoreArray);
    console.log(computerScore, `stand<17`);
    return `Player chose to stand. <br> Computer has to hit, and drew ${
      computerCardArray[2].name
    } of ${computerCardArray[2].suit} <br>
    ${checkConditions(playerScore, computerScore)}`;
  }
  // If player and computer both stands.
  if ((input == "stand") & (computerScore >= 17)) {
    gameTurn = "cpuStand";
    computerScore = sumArray(computerScoreArray);
    playerScore = sumArray(playerScoreArray);
    // prettier-ignore
    return `Player has chosen to stand <br> Computer also stands <br> ${checkConditions(playerScore,computerScore)}`
  }
};
// Main function - end
// If dealer <17 immediate hit.
// If hand total higher than 21, immediate bust

// //Global Variables // //
// deckArray
var shuffledDeck = [];
var gameTurn = "Deal";
// These two are array of objects
var playerCardArray = [];
var computerCardArray = [];
// These two are array of integers
var playerScoreArray = [];
var computerScoreArray = [];
// Two global variables for computer and player score
var playerScore = 0;
var computerScore = 0;
// HitCounter
var playerHitCounter = 1;
var cpuHitCounter = 1;
// Global Variables - End //
