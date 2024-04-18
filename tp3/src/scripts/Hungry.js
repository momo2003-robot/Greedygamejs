import Entity from './Entity';
import hungryImgSrc from './assets/images/hungry.png';

export default class Hungry extends Entity {
  speed = { x: 0, y: 0 };
  targetFruit = null;
  fruitsEaten = 0; 
  
  constructor(canvas) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    super(hungryImgSrc, x, y, 64, 64);
  }

  setTargetFruit(fruit) {
    this.targetFruit = fruit;
    if (!fruit) {
      this.speed.x = 0;
      this.speed.y = 0;
    } else {
      const dx = fruit.x - this.x;
      const dy = fruit.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      this.speed.x = distance ? (dx / distance) * 2 : 0;
      this.speed.y = distance ? (dy / distance) * 2 : 0;
    }
  }

  move() {
    if (this.targetFruit) {
      this.x += this.speed.x;
      this.y += this.speed.y;
    }
  }

  updateFruitsEaten() {
    this.fruitsEaten++;
    if (this.fruitsEaten >= 7) {
      // Implement the logic to create a new Hungry
      this.fruitsEaten = 0;
      return true; // Indicate that a new Hungry should be spawned
    }
    return false;
  }

  draw(ctx) {
    if (this.loaded) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } else {
      // Fallback red square if the image is not loaded
      ctx.fillStyle = 'red';
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  

  chooseNewTarget(fruits, greedy) {
    if (fruits.length === 0) {
      this.setTargetFruit(greedy); 
    } else {
      const sortedFruits = fruits.map(fruit => {
          const dx = fruit.x - this.x;
          const dy = fruit.y - this.y;
          return {
              fruit,
              distance: Math.sqrt(dx * dx + dy * dy)
          };
      }).sort((a, b) => a.distance - b.distance);
      
      this.setTargetFruit(sortedFruits[0].fruit);        
      
    }
  }
  
  collidesWith(other) {
        return this.x < other.x + other.width &&
           this.x + this.width > other.x &&
           this.y < other.y + other.height &&
           this.y + this.height > other.y;
  }
}

