


document.onkeyup = function(event){

  var wins = 0;
  var guesses_remaining = 10;


  // while (guesses_remaining > 0) {
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

    var words = [{w : "spot", hint: "a"}, {w : "moon", hint: "b"}, {w : "tree", hint: "c"}];
    var user_guess = "o";

    var word = words[Math.floor(Math.random()*3)].w;
    var len = word.length;
    var complete = false ;


    // Creates a skeleton with a _ for each letter in the word 
    function make_skel(word) {
      skel = ""
      for (var i = 0; i < word.length; i++) {
        skel += "_ "
      }
      return skel
    };

    // Checks whether the guessed letter is in the correct word 
    // If the guess is correct, function places guessed letter in the skeleton
    function letter_checker(word, user_guess, skeleton) {
      for (i = 0; i < 2*word.length; i++) {
        if (word.charAt(i) == user_guess){
          new_skel = skeleton.substr(0,i) + user_guess + skeleton.substr(i+1, len)
        }
      }
      return new_skel
    }

    document.write(letter_checker("cat", "c", "_ _ _ _ _ _ _ "))

    function comp_checker(skeleton) {
      for (i=0; i < skeleton.length; i++){
        if (skeleton.charAt(i) == "_"){
          return false
        }
      }
      return true 
    }


  // Checks whether the word is complete 
  function comp_checker(skeleton) {
    for (i=0; i < skeleton.length; i++){
      if (skeleton.charAt(i) == "_"){
        return false
      }
    }
    return true 
  }

  // }


};







