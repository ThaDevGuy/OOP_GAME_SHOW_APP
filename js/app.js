/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

 const startButton = document.getElementById('btn__reset');
 const keyboard = document.querySelectorAll('.key');
 let game;
 startButton.addEventListener('click', function () {
     game = new Game();
    if(document.querySelectorAll('#overlay').className !== 'start') {
        const phraseLetters = document.querySelectorAll('#phrase li');
        for(let i = 0; i < phraseLetters.length; i++) {
            document.querySelector('#phrase ul').removeChild(phraseLetters[i]);
        }
        const keyboard = document.querySelectorAll('.key');
        for(let i = 0; i < keyboard.length; i++) {
            keyboard[i].className = "key";
            keyboard[i].removeAttribute('disabled');
        }
        const hearts = document.querySelectorAll('.tries img');
        for(let i = 0; i < hearts.length; i++) {
            hearts[i].setAttribute('src','images/liveHeart.png');
        }
    }
    game.startGame();
 });
 
 
 for(let i = 0; i < keyboard.length; i++){
    keyboard[i].addEventListener('click', function (e) {
        if(e.currentTarget.className === "key") {
            const playerKey = e.currentTarget.textContent.toLowerCase();
            game.handleInteraction(playerKey);
        }
    });
}

document.onkeyup = (e) => {
    try {
        if(game.missed < 5) {
            if(/^[a-zA-Z]/.test(e.key)) {
                const playerKey = e.key.toLowerCase();
                console.log(playerKey);
                game.handleInteraction(playerKey);
            }
        }
    }
    catch(e) {
        if(game !== undefined) {
            console.log(e.message);
        }
    }
}



