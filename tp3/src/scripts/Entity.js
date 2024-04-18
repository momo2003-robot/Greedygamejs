export default class Entity {
    constructor(imagePath, x, y, width, height) {
      this.img = new Image();
      this.img.onload = () => {
        this.loaded = true;
      };
      this.img.src = imagePath;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height; 
      this.loaded = false;
    }
  
    draw(ctx) {
      if (this.loaded) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      }else {
      // Dessiner un rectangle de secours pour tester
      ctx.fillStyle = 'red';
      ctx.fillRect(this.x, this.y, this.width, this.height);
      }
    }
  }