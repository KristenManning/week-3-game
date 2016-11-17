
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
   // Placeholder for user's guess 
  var user_guess = "a";

// Store possible answers in an object and grab a random word to start 
    var words = [{w : "spot", hint: "a"}, {w : "moon", hint: "b"}, {w : "tree", hint: "c"}];
    var num = Math.floor(Math.random()*3)
    var word = words[num].w

  $("#winsdiv").html("Wins: " + wins);

  $("#guessesdiv").html("Guesses Remaining: " + guesses_remaining);

  $("#lettersdiv").html("Letters guessed: " + guessed);


// FN Creates a skeleton with a _ for each letter in the word 
    function make_skel() {
      skel = ""
      for (var i = 0; i < word.length; i++) {
        skel += "_ "
      }
      return skel
    };

    var skeleton = make_skel(word)
    $("#skeldiv").html(skeleton);

// FN Checks whether the guessed letter is in the correct word 
// If the guess is correct, function places guessed letter in the skeleton
    function letter_checker() {
      for (i = 0; i <word.length*2; i++) {
        if (word.charAt(i) == user_guess){
          new_skel = skeleton.substr(0,i*2) + user_guess + skeleton.substr(i*2+1, skeleton.length)
          skeleton = new_skel 
        }
      }
      return skeleton 
    }
// FN Checks whether the word is complete (all characters filled in)
    function comp_checker() {
      for (i=0; i < skeleton.length; i++){
        if (skeleton.charAt(i) == "_"){
          return false
        }
      }
      return true 
    }

    function reset(){
        words.splice(num,1)
        console.log(words)
        num = Math.floor(Math.random()*3)
        word = words[num].w
        skeleton = make_skel(word)
        $("#skeldiv").html(skeleton)
        guesses_remaining = 7
        $("#guessesdiv").html("Guesses Remaining: " + guesses_remaining);
        guessed = ""
        $("#lettersdiv").html("Letters guessed: " + guessed)
    }

// FN overall gameplay 
    function gameplay(){
      // Check whether user guess appears in the word 
      var new_skeleton = letter_checker()
      var correct_guess = (new_skeleton != skeleton)
      console.log(word)
      // If the user correctly guessed the final letter, tell them they won
      // Increase wins by 1, set a new word, display the corresponding skeleton 
      if (comp_checker()) {
        console.log("A, " + guesses_remaining)
        alert("You won!")

        wins += 1
        $("#topdiv").html("Wins: " + wins)
        reset()
      
      // If the user correctly guessed a letter but still has more work to do, just update the skeleton 
      }else if (correct_guess) {
        console.log("B, " + guesses_remaining)
        skeleton = new_skeleton 
        $("#skeldiv").html(skeleton)

      // If the user incorrectly guessed and it was their final guess, alert game over. Reset. 
      }else if (guesses_remaining == 1) {
        console.log("C")       
        alert("Game over")
        reset()

      // If the user incorrectly guessed and they still have more work to do, decrease guesses remaining by 1. 
      // Display their incorrect guess 
      }else {
        console.log("D")
        guesses_remaining = guesses_remaining - 1
        console.log(guesses_remaining)
        $("#guessesdiv").html("Guesses Remaining: " + guesses_remaining);
        guessed += (" " + user_guess)
        $("#lettersdiv").html("Letters guessed: " + guessed + " [" + word + " " + skeleton + "]");
      }
    }

// Set up the game: Grab a word to start with and display its skeleton 

    var word = words[Math.floor(Math.random()*3)].w
    var skeleton = make_skel()
    $("#skeldiv").html(skeleton);


// Play the game: Each letter key stroke saves the letter as user_guess and plays accordingly 
    document.onkeypress = function(event){
      user_guess = event.key;
      gameplay(word, user_guess, guesses_remaining, skel)

    };
});
// };







