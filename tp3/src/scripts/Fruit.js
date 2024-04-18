import Entity from './Entity';
import ananasImgSrc from './assets/images/ananas.png';
import citronImgSrc from './assets/images/citron.png';
import pommeImgSrc from './assets/images/pomme.png';


export default class Fruit extends Entity {
  
  static Size = 64;
  constructor(canvas) {
    const images = [ananasImgSrc, citronImgSrc,pommeImgSrc];
    const randomImage = images[Math.floor(Math.random() * images.length)];
    const x = Math.random() * (canvas.width - Fruit.Size);
    const y = Math.random() * (canvas.height -Fruit.Size);
    super(randomImage, x, y);
    this.width = Fruit.Size;
    this.height = Fruit.Size;
    this.expirationTime = Date.now() + 8000;
  }
  

  isExpired() {
    return Date.now() > this.expirationTime;
  }

  collidesWith(other) {
    return this.x < other.x + other.width &&
           this.x + this.width > other.x &&
           this.y < other.y + other.height &&
           this.y + this.height > other.y;
  }
}

