var pressedLetter = "";
var myShowsList = ["The Wire", 
                    "Game of Thrones", 
                    "Seinfeld", 
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
                    "The Office",
                    "Homeland",
                    "Faulty Towers",
                    "Roots",
                    "South Park",
                    "The Odd Couple",
                    "Downton Abbey",
                    "Happy Days",
                    "The Wonder Years",
                    "Six Feet Under",
                    "Deadwood",
                    "Curb Your Enthusiasm",
                    "Freaks and Geeks"];
var iWins = 0;
var iLosses = 0;
var myDashes = "";
var iCountDashes = 0;
var randWord = "";
var iNumDashesLeft = 0;
var iGuessesLeft = 0;
var bGameDone = true;


document.onkeyup = function(event) {
            
  if(bGameDone)
  {
    alert("You need to press Start button to start the game!!");
    return;
  }
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
    
    iWins++;
    $("#Wins").text(iWins);
    alert("you win!!!!");
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
    bGameDone = true;
    return;
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
