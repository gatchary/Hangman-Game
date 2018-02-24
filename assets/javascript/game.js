
//dom elements
var winsHtml = document.getElementById("pwins");
var lossesHtml = document.getElementById("plosses");
var gameStartHtml = document.getElementById("gameStart");
var spaceHolderHtml = document.getElementById("spaceHolder");
var guessLeftHtml = document.getElementById("guessesLeftHolder");
var lettersGuessedHtml = document.getElementById("letterGuessedHolder");
var startGame = document.getElementById("gameStart");







// category of words to be spelt
var presidents = [
  "Donald Trump",
  "Barack Obama",
  "Bill Clinton",
  "Ronald Reagan",
  "Jimmy Carter",
  "Richard Nixon",
  "Harry Truman",
  "Herbert Hoover"
];

//my variables
var gameStarted = false;
var wins = 0;
var losses = 0;
var guessLeft = 8;
var spaceHolder = [];
var pickedWord = " ";
var lettersGuessed = [];
var wrongLetterGuessed = [];







function newGame() {
 
    gameStarted = true;
    guessLeft = 8;
    spaceHolder = [];
    lettersGuessed = [];
    wrongLetterGuessed = [];

//new word picked
    pickedWord = presidents[Math.floor(Math.random() * presidents.length)];
    for (i = 0; i < pickedWord.length; i++) {
      if (pickedWord[i] === " ") {
        spaceHolder.push(" ");
      } else {
        spaceHolder.push("_ ");
      }
    }
    guessLeftHtml.textContent = guessLeft;
    spaceHolderHtml.textContent = spaceHolder.join(" ");
    lettersGuessedHtml.textContent = wrongLetterGuessed;
 
 
}

function letterGuess(word) {
  

  if (gameStarted === true && lettersGuessed.indexOf(word) === -1) {
    // Run Game Logic
    lettersGuessed.push(word);

    // Check if guessed letter is in my picked word
    for (var i = 0; i < pickedWord.length; i++) {
      // Convert both values to lower case so I can compare them correctly
      if (pickedWord[i].toLowerCase() === word.toLowerCase()) {
        // If a match, swap out that character in the placeholder with the actual letter
        spaceHolder[i] = pickedWord[i];
      }
    }
    spaceHolderHtml.textContent = spaceHolder.join('');
    // Pass letter into our checkIncorrect function
    checkIncorrect(word);

  }
  else {
    if (!gameStarted) {
      alert("Click New Game to BEgin");
    } else {
      alert("already guessed");
    }
  }
}




// checkIncorrect(letter)
function checkIncorrect(word) {
 
  // Check to see if letter DIDN'T make it into our pickedWordPlaceHolder (therefore, incorrect guess)
  if (spaceHolder.indexOf(word.toLowerCase()) === -1 && 
  spaceHolder.indexOf(word.toUpperCase()) === -1) {
    // Decrement guesses 
    guessLeft--;
    // Add incorrect letter to incorrectLetterBank
    wrongLetterGuessed.push(word);
    // Write new bank of incorrect letters guessed to DOM
    lettersGuessedHtml.textContent = wrongLetterGuessed.join(" ");
    // Write new amount of guesses left to DOM
    guessLeftHtml.textContent = guessLeft;
  }
  checkLoss();
}




// checkLoss
function checkLoss() {
  
  if (guessLeft === 0) {
    //decrement losses
    losses++;
    //stop the game
    gameStarted = false;
    //write losses to html
    lossesHtml.textContent = losses;
    // show the picked word
    spaceHolderHtml.textContent = pickedWord;
    // make an alert that you lost
    alert("you hang me!!!");
    
    
  }
  
  checkWin();
 
}

// checkWin
function checkWin() {
  
  if (pickedWord.toLowerCase() === spaceHolder.join('').toLowerCase()) {
    wins++;
    gameStarted = false;
    winsHtml.textContent = wins;
     
  }
  
  }






startGame.addEventListener("click", newGame);

document.onkeyup = function(event) {
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    letterGuess(event.key);
  }
}
