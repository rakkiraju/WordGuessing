var pressedLetter = "";
var myShowsList = ["The Wire", 
                    "Game of Thrones", 
                    "Sienfeld", 
                    "Friends", 
                    "Everybody Loves Raymond",
                    "Cheers",
                    "The Sopranos",
                    "Mad Men",
                    "Billions",
                    "American Idol",
                    "Modern Familiy",
                    "The Simpsons",
                    "I Love Lucy",
                    "Breaking Bad",
                    "The Daily Show",
                    "Taxi",
                    "Frasier",
                    "Lost",
                    "Dead Wood",
                    "Star Trek",
                    "The Offie",
                    "Homeland",
                    "Faulty Towers",
                    "Roots",
                    "South Park"];
var iWins = 0;
var iLosses = 0;
var myDashes = "";
var iCountDashes = 0;
var randWord = "";
var iNumDashesLeft = 0;
var iGuessesLeft = 0;
var bGameDone = true;


document.onkeyup = function(event) {
            
  pressedLetter = event.key;
  //alert("Pressed this letter ->" + pressedLetter);
  pressedLetter = pressedLetter.toLowerCase();
  randWord = randWord.toLowerCase();
  iGuessesLeft--;
  $("#GuessedLetters").append(pressedLetter + ", ");
  $("#GuessesLeft").text(iGuessesLeft);
  iNumDashesLeft = 0;
  //logic is if that letter is in the word, replace that
  // dash(es) with that letter
  // then display that letter in 'Guessed Letters' section
  //reduce the 'Guesses left' count
  for(var i = 0; i < randWord.length; i++)
  {
    var myLetter = randWord.charAt(i);
    //alert(myDashes);
    if(pressedLetter ===  myLetter)
    {
      //now replace the dash with that letter
      myDashes = replaceAt(myDashes, i, myLetter);
      $("#wordlist").text(myDashes);
      //iNumDashesLeft--;
    }
  }
  for(var j = 0; j < myDashes.length; j++)
  {
    if(myDashes.charAt(j) === "-")
    {
      iNumDashesLeft++;
    }
  }
  console.log("num dashes left are: " + iNumDashesLeft);
  if(iNumDashesLeft <= 0)
  {
    //win
    // set the display and message box
    bGameDone = true;
    alert("you win!!!!");
    iWins++;
    $("#Wins").text(iWins);
  }
  else if(iGuessesLeft <= 0)
  {
    bGameDone = true;
    iLosses++;
    $("#Losses").text(iLosses);
    alert("You Lose!!! Word was " + randWord);
  }


}


//  This code will run as soon as the page loads.
window.onload = function() {
  $("#reset").on("click", reset);
  $("#start").on("click", start);
  $("#continue").on("click", start);
  
};




function reset() {

  time = 0;
  lap = 1;

  //  TODO: Change the "display" div to "00:00."
  $("#display").text("00:00");
  $("#laps").empty();
  
}

function isAlpha(str) {
  return /^[a-zA-Z]$/.test(str);
}

function replaceAt(s, n, t) {
  if (n == -1)
  {
    n = 0;
  }
  return s.substring(0, n) + t + s.substring(n + 1);
}

function reset()
{
  bGameDone = true;
  start();
  iLosses++;
  $("#Losses").text(iLosses);
  alert("You Lose!!! Word was " + randWord);
  
}

function start() {

  if(!bGameDone)
  {
    alert("Game not yet completed!!! Counting this as reset");
    iLosses++;
    $("#Losses").text(iLosses);
    alert("You Lose!!! Word was " + randWord);
  }

  bGameDone = false;

  //randomly pick a word from the array and then set the #wordlist 
  //with appropriate dashes. for spaces display it as <space>
  randWord = myShowsList[Math.floor(Math.random() * Math.floor(myShowsList.length))];
  //alert("word picked is " + randWord);
  myDashes = "";
  iCountDashes = 0;
  iNumDashesLeft = 0;
  for(var i = 0; i < randWord.length; i++)
  {
    if(isAlpha(randWord.charAt(i) ) )
    {
      myDashes += "-";
      //iNumDashesLeft++;
    }
    else if(randWord.charAt(i) === " ")
    {
      myDashes += " ";
      iCountDashes++;
      
    }
  }
  //alert("dashes are: " + myDashes);
  $("#wordlist").text(myDashes);
  iGuessesLeft = randWord.length - iCountDashes + 5;
  $("#GuessesLeft").text(iGuessesLeft);

  $("#GuessedLetters").text("");//append(pressedLetter + ", ");
  

}
