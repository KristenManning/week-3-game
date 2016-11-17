
// Pseudocode: 
// Computer picks a word 
// Display word skeleton 
// User picks a letter - keep track of chosen letters!
// If letter is in the word, display letter in skeleton
// If letter is not in word and has already been guessed, do nothing 
// If letter is not in word and has already been guessed, lose a remaining guess. Display letter in guessed letters
// If letter is in word and has already been guessed, do nothing. 
// If remaining guesses is zero, user loses 
// If skeleton is complete, user wins 

// // Any user key stroke begins the script 
// document.onkeyup = function(event){

// Establish variables for # of user wins and number of user guesses remaining 
// 
$(document).ready(function() {
  var wins = 0;
  var guesses_remaining = 7;
  var guessed = ""; 

  $("#topdiv").html("Wins: " + wins);

  var guessesdiv = $("<div>");
  $("#topdiv").append(guessesdiv)
  guessesdiv.html("Guesses Remaining: " + guesses_remaining);

  var lettersdiv = $("<div>");
  guessesdiv.append(lettersdiv);
  lettersdiv.html("Letters guessed: " + guessed);


  


// Store possible answers in an object 
    var words = [{w : "spot", hint: "a"}, {w : "moon", hint: "b"}, {w : "tree", hint: "c"}];
    word = words[Math.floor(Math.random()*3)].w

// FN Creates a skeleton with a _ for each letter in the word 
    function make_skel(word) {
      skel = ""
      for (var i = 0; i < word.length; i++) {
        skel += "_ "
      }
      return skel
    };

// FN Checks whether the guessed letter is in the correct word 
// If the guess is correct, function places guessed letter in the skeleton
    function letter_checker(word, user_guess, skeleton) {
      for (i = 0; i <word.length*2; i++) {
        if (word.charAt(i) == user_guess){
          new_skel = skeleton.substr(0,i*2) + user_guess + skeleton.substr(i*2+1, skeleton.length)
          skeleton = new_skel 
        }
      }
      return skeleton 
    }
// FN Checks whether the word is complete (all characters filled in)
    function comp_checker(skeleton) {
      for (i=0; i < skeleton.length; i++){
        if (skeleton.charAt(i) == "_"){
          return false
        }
      }
      return true 
    }
var solved = false; 
// FN Plays game 

    skeleton = make_skel(word)

    function gameplay(word, user_guess, guesses_remaining){

      skeleton = letter_checker(word, user_guess, skeleton)
      // Display updated skeleton 
      if (comp_checker(skeleton)) {
        alert("You won!")
        $("#topdiv").html("Wins: " + wins)
        wins += 1
        solved = true
      } else if (guesses_remaining == 1) {

        alert("Game over")
        word = words[Math.floor(Math.random()*3)].w

      }else{
        guesses_remaining -= 1 
        guessed += " " + user_guess
        guessesdiv.html("Guesses Remaining: " + guesses_remaining);
        guessesdiv.append(lettersdiv);
        lettersdiv.html("Letters guessed: " + guessed + " [" + word + " " + skeleton + "]");
      }


    }

// Grab a word to start with 

var word = words[Math.floor(Math.random()*3)].w


// Each letter key stroke triggers the following code for gameplay 
    document.onkeypress = function(event){
      var user_guess = event.key;
      gameplay(word, user_guess, guesses_remaining)
    



    };
});
// };







