
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
  var letter_choices = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
   // Placeholder for user's guess 
  
  var user_guess = "a";

// Store possible answers in an object and grab a random word to start 
    var words = [{w : "sandwich", hint: "a", photo: }, {w : "waffles", hint: "a", photo: }, {w : "macarons", hint: "b"}, {w : "burger", hint: "c"}, {w : "cupcakes", hint: "a", photo: }, {w : "spaghetti", hint: "a", photo: }, {w : "sliders", hint: "a", photo: }, {w : "chicken", hint: "a", photo: }, {w : "kebabs", hint: "a", photo: }, {w : "stew", hint: "a", photo: }, {w : "parfait", hint: "a", photo: }, {w : "pizza", hint: "a", photo: }];
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

  var skeleton = make_skel()
  $("#skeldiv").html(skeleton);

// FN Checks whether the guessed letter is in the correct word 
// If the guess is correct, function places guessed letter in the skeleton
    function letter_checker() {
      var edited_skeleton = skeleton 
      for (i = 0; i <word.length*2; i++) {
        if (word.charAt(i) == user_guess){
        edited_skeleton = edited_skeleton.substr(0,i*2) + user_guess + edited_skeleton.substr(i*2+1, edited_skeleton.length)
        }
      }
      console.log("edited skeleton = " + edited_skeleton)
      return edited_skeleton 
    };
// FN Checks whether the word is complete (all characters filled in)
    function comp_checker() {
    console.log(skeleton)
    console.log(skeleton.length)
      for (i=0; i < skeleton.length; i++){
        if (skeleton.charAt(i) == "_"){
          return false
        }
      }
      return true 
    };

    function reset(){
      if (words.length > 0) {
        words.splice(num,1)
        console.log(words)
        num = Math.floor(Math.random()*words.length)
        word = words[num].w
        skeleton = make_skel()
        $("#skeldiv").html(skeleton)
        guesses_remaining = 7
        $("#guessesdiv").html("Guesses Remaining: " + guesses_remaining);
        guessed = ""
        $("#lettersdiv").html("Letters guessed: " + guessed)
      } else {
        alert("Sorry, we're out of words! Refresh the page to start over.")
      }
    }

// FN overall gameplay 
    function gameplay(){
      // Check whether user guess appears in the word 
      var new_skeleton = letter_checker();
      var correct_guess = (new_skeleton != skeleton);
      skeleton = new_skeleton;

      // If the user correctly guessed the final letter, tell them they won
      // Increase wins by 1, set a new word, display the corresponding skeleton 
      if (comp_checker()) {
        $("#skeldiv").html(skeleton);
        wins ++;
        $("#winsdiv").html("Wins: " + wins);
        alert("Congratulations! You won!");
        reset()
      
      // If the user correctly guessed a letter but still has more work to do, just update the skeleton 
      }else if (correct_guess) {
        $("#skeldiv").html(skeleton);

      // If the user incorrectly guessed and it was their final guess, alert game over. Reset. 
      }else if (guesses_remaining == 1) {      
        alert("GAME OVER :( The correct answer was " + word);
        reset();

      // If the user incorrectly guessed and they still have more work to do, decrease guesses remaining by 1. 
      // Display their incorrect guess 
      }else {
        guesses_remaining = guesses_remaining - 1;
        $("#guessesdiv").html("Guesses Remaining: " + guesses_remaining);
        guessed += (" " + user_guess);
        $("#lettersdiv").html("Letters guessed: " + guessed);
      }
    }


// Play the game: Each letter key stroke saves the letter as user_guess and plays accordingly 
    document.onkeypress = function(event){
      if (letter_choices.indexOf(event.key) < 0){
        alert("Please choose a letter a - z");
      }else if (guessed.indexOf(event.key) > -1) {
        alert("You've already tried that letter!");
      }else{
      user_guess = event.key;
      gameplay()
      }
    };
});
// };







