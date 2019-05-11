/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    constructor (phrase) {
        this.phrase = phrase.toLowerCase();
    }

    /**
     * Method By name addPhraseToDisplay
     * seperates the phrase string to individual c
     * haracters and renders on in html
     * returns nothing
     */
    addPhraseToDisplay () {
        const phraseDivUl = document.querySelector("#phrase ul");
        this.phrase.split("").forEach(character => {
            const phraseDivUlItems = document.createElement('li');
            /^[a-z]/.test(character) ? phraseDivUlItems.className = "hide letter" : phraseDivUlItems.className = "space";
            phraseDivUlItems.textContent = character;
            phraseDivUl.appendChild(phraseDivUlItems);
        });
    }
    /**
     * Method By name CheckLetter
     * @param {*} selectedLetter => the player's selected letter
     * checks selectedLetter against the letters in phrase and 
     * returns a boolean
     */
    checkLetter(selectedLetter) {
        return this.phrase.includes(selectedLetter);
    }

    /**
     * Method By name ShowMatchedLetter
     * @param {*} matchedLetter => the matched letter after checking Letter
     * checks the letters on display(phraseDivUlItems) for letters that matches 
     * the matchedLetter and displays them to player
     */
    showMatchedLetter(matchedLetter) {
            const phraseDivUlItems = document.querySelectorAll('.letter');
            Array.prototype.forEach.call(phraseDivUlItems, function (letterElem) {
                if(letterElem.textContent === matchedLetter) {
                    letterElem.className = "bounceIn show letter";
                }
            });
    }
}