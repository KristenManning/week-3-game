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


// Establish variables for # of user wins and number of user guesses remaining 
// 
$(document).ready(function() {
  // When a key is pressed, game begins. 
  document.onkeypress = function(event){

    $("#banner").html("Guess a letter by pressing its key");

    var wins = 0;
    var guesses_remaining = 10;
    var guessed = "";
    var letter_choices = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

     // Placeholder for user's guess 
    var user_guess = "a";


    // Store possible answers in an object and grab a random word to start 
      var words = [{w : "sandwich", hint: "Bread", photo:"assets/images/sandwich.jpg"  }, {w : "waffles", hint: "Maple syrup", photo: "assets/images/waffles.jpg"}, {w : "burger", hint: "Ground beef", photo: "assets/images/burger.jpg"}, {w : "cupcakes", hint: "Frosting", photo: "assets/images/cupcakes.jpg" }, {w : "spaghetti", hint: "Tomato sauce", photo: "assets/images/spaghetti.jpeg" }, {w : "kebabs", hint: "Skewer", photo: "assets/images/kebabs.jpeg"}, {w : "stew", hint: "Broth", photo:"assets/images/stew.jpeg" }, {w : "parfait", hint: "Yogurt", photo:"assets/images/parfait.jpeg" }, {w : "pizza", hint: "Dough", photo: "assets/images/pizza.jpg"}, {w : "salad", hint: "Lettuce", photo: "assets/images/salad.jpeg"}];
      var num = Math.floor(Math.random()*words.length)
      var word = words[num].w


  // FN Creates a skeleton with a _ for each letter in the word and spaces in between 
      function make_skel() {
        skel = ""
        for (var i = 0; i < word.length; i++) {
          skel += "_ "
        }
        return skel
      };

  // Create a skeleton for the initial word 
    var skeleton = make_skel()
    $("#skeldiv").html(skeleton);

  // FN Checks whether the guessed letter is in the correct word 
  // If the guess is correct, function places guessed letter in the skeleton
  // Returns an updated (if necessary) skeleton 
      function letter_checker() {
        var edited_skeleton = skeleton 
        for (i = 0; i <word.length*2; i++) {
          if (word.charAt(i) == user_guess){
          edited_skeleton = edited_skeleton.substr(0,i*2) + user_guess + edited_skeleton.substr(i*2+1, edited_skeleton.length)
          }
        }
        return edited_skeleton 
      };

  // FN Checks whether the word is complete (all characters filled in)
  // Returns true if word is complete, false if letters are missing 
      function comp_checker() {
        for (i=0; i < skeleton.length; i++){
          if (skeleton.charAt(i) == "_"){
            return false
          }
        }
        return true 
      };

  // FN resets all formatting, image, etc after a user has won or lost 
  // FN Chooses a new word so the user can play again 
      function reset(){
        console.log(words.length)
        if (words.length > 1) {
          $("#sidebox").hide();
          $(".btn").show();
          words.splice(num,1)
          num = Math.floor(Math.random()*words.length)
          console.log("num = " + num)
          word = words[num].w
          skeleton = make_skel()
          $("#skeldiv").html(skeleton)
          guesses_remaining = 10
          $("#guessesdiv").html("Guesses Remaining: " + guesses_remaining);
          guessed = ""
          $("#lettersdiv").html("Letters guessed: " + guessed)
          $("#banner").html("Guess a letter by pressing its key");
          $("img").attr("src", "assets/images/default.png")
        } else {
          alert("That's all, folks! Thanks for playing. Refresh the page to start over.")
        }
      }

  // Gives functionality to "Secret Ingredient" button 
  // Button hides the red icon and replaces it with a hint 
      $(".btn-info").click(function(){
          $("img").hide(1500);
          $("h2").html(words[num].hint)
      });
  // Removes hint 
      function reset_hint(){
        $("h2").html("")
        
        };

  // Changes page formatting for when a user has completed the word correctly 
      function win_display(){
        $(".btn").hide();
        $("#sidebox").show()
        $("#sidebox").html("Nice!")
        $("#skeldiv").html(skeleton);
        wins ++;
        $("#winsdiv").html("SCORE: " + wins);
        $("img").attr("src", words[num].photo)
        $("img").show();
        $("#banner").html("Congratulations - you discovered the mystery food!")

      }
  // Changes the page formatting for when a user has run out of guesses 
      function lose_display(){
        $(".btn").hide();
        $("#sidebox").show()
        $("#sidebox").html("OOPS!")
        $("#skeldiv").html(word);
        $("img").attr("src", words[num].photo)
        $("img").show();
        $("#banner").html("Sorry, you ran out of guesses this time.");
      }

  // FN overall gameplay 
      function gameplay(){
        $("#banner").html("Guess a letter by pressing its key");
        // Check whether user guess appears in the word 
        var new_skeleton = letter_checker();
        var correct_guess = (new_skeleton != skeleton);
        skeleton = new_skeleton;

        // If the user completed the word, tell them they won, then reset everything  
        if (comp_checker()) {
          reset_hint();
          setTimeout(win_display, 100)
          setTimeout(reset, 2900)
        
        // If the user correctly guessed a letter but still has more work to do, just update the skeleton 
        }else if (correct_guess) {
          $("#skeldiv").html(skeleton);

        // If the user incorrectly guessed and it was their final guess, tell them they lost, reveal correct answer, then reset everything. 
        }else if (guesses_remaining == 1) {      
          reset_hint();
          setTimeout(lose_display, 100)
          setTimeout(reset, 3200)         

        // If the user incorrectly guessed and they still have more work to do, decrease guesses remaining by 1. 
        // Add their incorrect guess to "letters guessed" for reference 
        }else {
          guesses_remaining = guesses_remaining - 1;
          $("#guessesdiv").html("Guesses Remaining: " + guesses_remaining);
          guessed += (" " + user_guess);
          $("#lettersdiv").html("Letters guessed: " + guessed);
        }
      }


  // Play the game: Each letter key stroke saves the letter as user_guess and plays accordingly. 
      document.onkeypress = function(event){
        // Prevent user from playing a non-letter key or repeating a letter 
        if (letter_choices.indexOf(event.key) < 0){
        $("#banner").html("That's not a letter! Guess a letter by pressing its key.");
        }else if ( (guessed.indexOf(event.key) > -1 ) || (skeleton.indexOf(event.key) > -1)) {
        $("#banner").html("You've already tried that letter! Guess a new letter by pressing its key.");
        }else{
        user_guess = event.key;
        gameplay()
        }
      };
    };
});







