import Entity from './Entity';
import greedyImgSrc from './assets/images/greedy.png';


export default class Greedy extends Entity {
  
  deltaX = 0;
  deltaY = 0;
  #lives = 3;
  
  constructor(imagePath, x, y, width, height) {
     super(greedyImgSrc, x, y );
     this.width = width;
     this.height = height;
     this.deltaX=0;
     this.deltaY=0;
     this.score=0;
     console.log(`Greedy created at (${x}, ${y}) with size (${width}, ${height})`);
  }

  
  moveLeft() { this.deltaX = -5; }
  moveRight() { this.deltaX = 5; }
  moveUp() { this.deltaY = -5; }
  moveDown() { this.deltaY = this.deltaY = 5; }
  
  stopMoving() {
    this.deltaX = 0;
    this.deltaY = 0;
  }
  
  move(canvas) {
    this.x = Math.max(0, Math.min(canvas.width - this.width, this.x + this.deltaX));
    this.y = Math.max(0, Math.min(canvas.height - this.height, this.y + this.deltaY));

    this.stopMoving();
  }
  
  handleMoveKeys(keyManager) {
      this.stopMoving();    
      if (keyManager.left)  
         this.moveLeft();
      if (keyManager.right) 
         this.moveRight();
        
      if (keyManager.up)
      	 this.moveUp();
      if (keyManager.down)
      	 this.moveDown();
      	 
   }  
  
  draw(ctx) {
    super.draw(ctx);
  }
  
  
  collidesWith(other) {
        return this.x < other.x + other.width &&
           this.x + this.width > other.x &&
           this.y < other.y + other.height &&
           this.y + this.height > other.y;
  }
  
        
  
  
}

