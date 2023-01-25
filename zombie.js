class Zombie {
    constructor(x, y, width, height, colour) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.colour = colour;
    }
    move(x, y) {
        this.x += x;
        this.y += y;
    }
    draw(context) {
      context.fillStyle = this.colour;
      context.fillRect(this.x, this.y, this.width, this.height);
    }
}