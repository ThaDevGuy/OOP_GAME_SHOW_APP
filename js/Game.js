/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

 class Game {
     constructor () {
         this.missed = 0;
         this.phrases = this.createPhrases();
         this.activePhrase = null;
         this.winSound = new Audio('sound/win.wav');
         this.loseSound = new Audio('sound/lose.mp3');

     }
     /**
      * Creator Method by name createPhrases
      * intantiate 5 phrase Objects and returns them in an array
      */
    createPhrases () {
        const phrases = ["Open Sesime", "Harry Potter", "Witches and Wizards", "Magical Wand", "Flying Broom"];
        const phraseObjects = [];
        phrases.forEach(function (phrase){
            phraseObjects.push(new Phrase(phrase));
        });
        return phraseObjects;
    }

    /**
     * Method by name startGame
     * hides over and sets activePhrase with random phrase
     * displays the phrase on the screen
     */
    startGame () {
        const overlay = document.getElementById("overlay");
        overlay.style.display = 'none';
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    }

    /**
     * Method by name getRandomPhrase
     * calc random index to retrieve random phrase object
     * from this.phrases
     * returns Object
     */
    getRandomPhrase () {
        const randomIndex = Math.floor(Math.random() * this.phrases.length);
        return this.phrases[randomIndex];
    }

    /**
     * Method by name removeLife
     * loops through the tries images
     * and replace the first one that isn't a liveheart
     */
    removeLife () {
        const liveHearts = document.querySelectorAll('.tries img');
        for(let i = 0; i < liveHearts.length; i++) {
            if(liveHearts[i].src.toLowerCase().includes('liveheart')){
                liveHearts[i].setAttribute("src", "images/lostHeart.png");
                break;
            }
        }
        this.missed += 1;
    }

    /**
     * Method By name checkForWin
     * checks if number of class of show and letter balances
     * that's logic for checking win
     * return boolean
     */
    checkForWin() {
        const numOfLetterClass = document.querySelectorAll('.letter').length;
        const numOfShowClass = document.querySelectorAll('.show').length;
        return numOfShowClass === numOfLetterClass ?  true : false;
    }

    /**
     * Method by name gameOver
     * checks if game is won or lost (i.e game status)and 
     * show overlay with appropraite message
     */
    gameOver () {
        const overlay = document.getElementById("overlay");
        const playButton = document.getElementById('btn__reset');
        const updateOverlay = (message, className) => {
            overlay.style.display = '';
            document.getElementById('game-over-message').textContent = message;
            playButton.className = className;
            playButton.textContent = "Play again!";
        }
        if(this.missed === 5) {
            this.loseSound.play();
            window.setTimeout(updateOverlay, 1100, 'Sorry Game Over', 'lose');
        }
        if(this.checkForWin()) {
            this.winSound.play();
            window.setTimeout(updateOverlay, 2000, 'Yaay!, You Won!!', 'win');
        }
    }

    /**
     * Method by name handleInteraction
     * @param {*} playerKey => the key the player clicked or typed
     * disables the selectedkey and checks if selected key matches
     * a key in this.activePhrase. it shows matched letter on display if 
     * key is included and removes life if not. the game status is then checked
     * and appropraite message is displayed
     */
    handleInteraction(playerKey) {
        const keyboard = document.querySelectorAll('.key');
        for(let i = 0; i < keyboard.length; i++) {
            if(keyboard[i].textContent === playerKey){
                keyboard[i].setAttribute('disabled', true);
                if(this.activePhrase.checkLetter(playerKey)) {
                    keyboard[i].className = "key chosen"
                    this.activePhrase.showMatchedLetter(playerKey);
                }
                else {
                    keyboard[i].className = "key wrong";
                    this.removeLife();
                }
                break;
            }
        }
        this.gameOver();
    }
 }