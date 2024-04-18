
// importation de la classe Game.js
import Game from './game.js';
import Entity from './Entity';
import Greedy from './Greedy';
import Fruit from './Fruit';
import Hungry from './Hungry';
import KeyManager from './keyManager';

// mise en place de l'action des clics sur les boutons + les gestionnaires du clavier pour contrôler Greedy
const init = () => {
    const canvas = document.getElementById("playfield");

    const game = new Game(canvas);
    
    const playStopButton = document.getElementById("stopAndStartGame");

    playStopButton.addEventListener('click', () => {
      if (!game.isRunning) {
        game.start();
        playStopButton.textContent = 'Stop';
       } else {
        game.stop();
        playStopButton.textContent = 'Jouer';
    }
   });
}

window.addEventListener("load", init);

//
console.log('le bundle a été généré');
