document.onkeyup = function(event){

  var wins = 0;
  var guesses_remaining = 10;

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

  var word = "avavavavava"
  var user_guess = "v"
  var skeleton = "___________"
  var len = word.length 

// Checks whether the guessed letter is in the correct word 
// If the guess is correct, function places guessed letter in the skeleton
function checker(word, user_guess, skeleton, len) {
  for (var i = 0; i < word.length; i++) {
    if (word.charAt(i) == user_guess){
      new_skel = skeleton.substr(0,i) + user_guess + skeleton.substr(i+1, len)
      skeleton = new_skel
      console.log(skeleton)
    }
  }
}
checker(word, user_guess, skeleton, len)
};





