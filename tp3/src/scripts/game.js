import Entity from './Entity';
import Greedy from './Greedy';
import Fruit from './Fruit';
import Hungry from './Hungry';
import KeyManager from './keyManager';
import greedyImgSrc from './assets/images/greedy.png';


export default class Game {

   #isRunning = false;
   #canvas;
   #greedy;
   #fruits=[];
   #hungries = [];
   #score=0;
   #lives=3;
   #fruitTimer;
   #hungryBirthTimer;
   #animationFrameId;

   constructor(canvas) {
      this.#canvas = canvas;
      this.keyManager = new KeyManager();
      this.#greedy = new Greedy(greedyImgSrc,canvas.width / 2 -32, canvas.height / 2 -32, 64, 64);
      this.#lives = 3;
      this.#animationFrameId = null;
      this.#isRunning = false;
      this.#hungries.push(new Hungry(canvas));
      this.updateLivesDisplay();
      
      
      document.addEventListener('keydown', this.keyDownActionHandler.bind(this));
      document.addEventListener('keyup', this.keyUpActionHandler.bind(this));
      


   }
   initFruitSpawn() {
      this.#fruitTimer = setInterval(() => {
        const fruit = new Fruit(this.#canvas);
        this.#fruits.push(fruit);
        setTimeout(() => {
            const index = this.#fruits.indexOf(fruit);
            if (index !== -1) {
                this.#fruits.splice(index, 1);
            }
        }, 8000);
    }, 1000);
   }
   
   
   keyDownActionHandler(event) {
   switch (event.key) {
       case "ArrowLeft":
       case "Left":
           this.keyManager.leftPressed();
           break;
       case "ArrowRight":
       case "Right":
           this.keyManager.rightPressed();
           break;
           
       case "ArrowUp":
       case "Up":
       	   this.keyManager.upPressed();
       	   break;
       	   
       case "ArrowDown":
       case "Down":
           this.keyManager.downPressed();
           break;
       default: return;
   }
   event.preventDefault();
  }
  
  keyUpActionHandler(event) {
   switch (event.key) {
      case "ArrowLeft":
      case "Left":
         this.keyManager.leftReleased();
         break;
      case "ArrowRight":
      case "Right":
         this.keyManager.rightReleased();
         break;
         
         
      case "ArrowUp":
      case "Up":
       	 this.keyManager.upReleased();
       	 break;
       	   
      case "ArrowDown":
      case "Down":
         this.keyManager.downReleased();
         break;
      default: return;
   }
   event.preventDefault();
  }
   
   start() {
      if (!this.#isRunning) {
        this.#isRunning = true;
        this.initFruitSpawn();
        this.#animationFrameId = requestAnimationFrame(this.update.bind(this));
        
      }
   }

   
   stop() {
      if (this.#isRunning) {
        cancelAnimationFrame(this.#animationFrameId);
        clearInterval(this.#fruitTimer);
        this.#fruits = [];
        this.#isRunning = false;
        this.#animationFrameId = null;
        
      }
   }
   
   get isRunning() {
        return this.#isRunning;
    }

   
   update() {
      const ctx = this.#canvas.getContext('2d');
      if (!ctx) {
        console.error('Failed to get canvas rendering context');
        return;
      }
      
      
      ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
      
      
      if (this.keyManager.left) this.#greedy.moveLeft();
      if (this.keyManager.right) this.#greedy.moveRight();
      if (this.keyManager.up) this.#greedy.moveUp();
      if (this.keyManager.down) this.#greedy.moveDown();
      
      this.#greedy.move(this.#canvas);
      this.#greedy.stopMoving();
      this.#greedy.draw(ctx);
      
      
          
     
      
      // Vérifiez les collisions entre Greedy et les fruits
      this.#fruits = this.#fruits.filter(fruit => {	
          if (this.#greedy.collidesWith(fruit)) {
              this.#score += 100;
              document.getElementById('score').textContent = this.#score;
              return false; // Retourner false pour retirer le fruit de la liste
          }
          return true; // Aucune collision, le fruit reste dans le jeu
      });
      
      
      this.#hungries.forEach((hungry, index) => {
      	  hungry.chooseNewTarget(this.#fruits, this.#greedy);
          hungry.move();
          hungry.draw(ctx);
          if (hungry.collidesWith(this.#greedy)) {
              this.#lives--;
              this.updateLivesDisplay();
              
              if (this.#lives <= 0) {
                  this.endGame();
              }    
              
              this.#hungries.splice(index, 1);
              this.#hungries.push(new Hungry(this.#canvas));
          }
          this.#fruits = this.#fruits.filter(fruit => {
              if (hungry.collidesWith(fruit)) {
                  if (hungry.updateFruitsEaten()) {
                      this.#hungries.push(new Hungry(this.#canvas));
                  }
                  return false;
              }
              return true;
          });            
      });    
      
      this.#fruits.forEach(fruit => fruit.draw(ctx));
      this.#greedy.move(this.#canvas, this.keyManager);
      
      
      this.#animationFrameId = requestAnimationFrame(this.update.bind(this));
      
   }


   
   draw() {
      const ctx = this.#canvas.getContext('2d');
      ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
      this.#greedy.draw(ctx); // Dessiner Greedy
   }

   /** donne accès au canvas correspondant à la zone de jeu */
   get canvas() {
      return this.#canvas;
   }
   
   
   
   decreaseLives() {
        if (this.#lives > 0) {
            this.#lives--;
            this.updateLivesDisplay();
        }
   }
   
   
   updateLivesDisplay() {
        const lifeElements = document.querySelectorAll('#lifes img');
        lifeElements.forEach((img, index) => {
            img.style.visibility = index < this.#lives ? 'visible' : 'hidden';
        });
   }
   
   
   endGame() {
        cancelAnimationFrame(this.#animationFrameId);

        alert("echec relancez le jeu s'il vous plait");
        

          
   }

   
}




