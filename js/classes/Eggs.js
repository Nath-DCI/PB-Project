import Color from "./Color.js";

export default class Eggs {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
  }

  draw(context) {
    context.save();
    context.beginPath();
    context.lineWidth = 2;
    context.strokeStyle = Color.screen.shadow;
    context.translate(this.x, this.y);
    context.rotate(this.angle);
    context.moveTo(0, 0);
    context.bezierCurveTo(0, 0, 3, -10, 6, 0);
    context.bezierCurveTo(6, 0, 7, 4, 3, 4);
    context.bezierCurveTo(3, 4, -1, 4, 0, 0);
    context.closePath();
    context.stroke();
    context.restore();
  }
}
