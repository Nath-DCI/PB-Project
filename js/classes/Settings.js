import Color, { RadialGradient, LinearGradient } from "./Color.js";
import Board from "./Board.js";

export default class Settings {
  roundRect(context, start, size, radius, color, fill, lineWidth) {
    context.strokeStyle = color;
    if (fill) context.fillStyle = color;
    context.lineWidth = lineWidth;

    context.beginPath();
    context.moveTo(start[0] + radius, start[1]);
    context.arcTo(
      start[0] + size[0],
      start[1],
      start[0] + size[0],
      start[1] + size[1],
      radius
    );
    context.arcTo(
      start[0] + size[0],
      start[1] + size[1],
      start[0],
      start[1] + size[1],
      radius
    );
    context.arcTo(start[0], start[1] + size[1], start[0], start[1], radius);
    context.arcTo(start[0], start[1], start[0] + size[0], start[1], radius);
    context.closePath();
    context.stroke();
    if (fill) context.fill();
  }

  triangleBoard(context, start, end, color) {
    context.fillStyle = color;
    context.beginPath();
    context.moveTo(start[0], start[1]);
    context.lineTo(end[0], end[1]);
    context.lineTo(300, 200);
    context.closePath();
    context.fill();
  }
}

export class Circle {
  constructor(center, radius, fill, stroke) {
    this.center = center;
    this.radius = radius;
    this.fill = fill;
    this.stroke = stroke;
  }

  draw(context) {
    context.fillStyle = this.fill;
    if (this.stroke) {
      context.strokeStyle = this.stroke[0];
      context.lineWidth = this.stroke[1];
    }
    context.beginPath();
    context.arc(this.center[0], this.center[1], this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();
  }
}

export class RedButton {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  draw(context) {
    let btngradient = new RadialGradient(
      context,
      [this.x, this.y - 15, 5],
      [this.x, this.y - 5, 20],
      ["rgba(255, 255, 255, 0.8)", "rgba(255, 255, 255, 0"]
    );

    let grayCircle = new Circle([this.x, this.y], this.radius + 8, "#cdd3cd", [
      "gray",
      1,
    ]);
    grayCircle.draw(context);

    let shadow = new Circle([this.x, this.y + 3], this.radius + 3, "gray", [
      "rgba(255, 255, 255, 0)",
      0,
    ]);
    shadow.draw(context);

    let redBigCircle = new Circle([this.x, this.y], this.radius + 3, "red", []);
    redBigCircle.draw(context);

    let redShadow = new Circle(
      [this.x, this.y + 1],
      this.radius + 1,
      "#ce0606",
      []
    );
    redShadow.draw(context);

    let redSmallCircle = new Circle([this.x, this.y], this.radius, "red", []);
    redSmallCircle.draw(context);

    let grad1 = new Circle(
      [this.x, this.y],
      this.radius,
      btngradient.draw(),
      []
    );
    grad1.draw(context);

    context.fillStyle = "red";
    context.beginPath();
    context.filter = "blur(3px)";
    context.arc(this.x, this.y + 1, this.radius - 2, 0, Math.PI * 2);
    context.fill();
    context.filter = "none";

    context.fillStyle = btngradient.draw();
    context.beginPath();
    context.filter = "blur(2px)";
    context.arc(this.x - 5, this.y - 12, 5, 0, Math.PI * 2);
    context.fill();
    context.filter = "none";
  }
}

export class Triangle {
  constructor(context, x, y) {
    this.context = context;
    this.x = x;
    this.y = y;
  }
  draw() {
    this.context.fillStyle = "black";
    this.context.beginPath();
    this.context.moveTo(this.x, this.y);
    this.context.lineTo(this.x + 10, this.y);
    this.context.lineTo(this.x + 5, this.y - 30);
    this.context.closePath();
    this.context.fill();
  }

  rotation(alfa) {
    this.context.restore();
    this.context.save();
    this.context.translate(this.x + 5, this.y - 30);
    this.context.rotate(alfa);
    this.context.translate(-(this.x + 5), -(this.y - 30));
  }
}

export class GreyButton {
  constructor(context, x, y) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.settings = new Settings();
  }

  draw() {
    this.settings.roundRect(
      this.context,
      [this.x, this.y],
      [25, 16],
      6,
      "grey",
      false,
      1
    );

    this.settings.roundRect(
      this.context,
      [this.x + 1, this.y + 1],
      [23, 14],
      5,
      "lightgrey",
      true
    );

    this.settings.roundRect(
      this.context,
      [this.x + 4, this.y + 3],
      [19, 10],
      3,
      Color.button.light,
      true
    );

    this.settings.roundRect(
      this.context,
      [this.x + 3, this.y + 3],
      [19, 10],
      3,
      Color.button.dark,
      true
    );

    this.context.filter = "blur(1px)";
    this.settings.roundRect(
      this.context,
      [this.x + 4, this.y + 3],
      [15, 6],
      3,
      Color.button.light,
      true
    );
    this.context.filter = "none";
  }
}

export class Bank {
  constructor(context, x, y, links, color) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.links = links;
    this.color = color;
  }
  draw() {
    this.context.strokeStyle = this.color;
    this.context.lineWidth = 5;
    this.context.beginPath();
    this.context.moveTo(this.x, this.y);
    if (this.links) {
      this.context.lineTo(this.x + 20, this.y);
      this.context.lineTo(this.x + 60, this.y + 25);
      this.context.moveTo(this.x + 50, this.y + 17);
      this.context.lineTo(this.x + 50, this.y + 37);
    } else {
      this.context.lineTo(this.x - 20, this.y);
      this.context.lineTo(this.x - 60, this.y + 25);
      this.context.moveTo(this.x - 50, this.y + 17);
      this.context.lineTo(this.x - 50, this.y + 37);
    }

    this.context.stroke();
  }
}

export class Haus {
  constructor(context, x, y, color) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.color = color;
  }
  draw() {
    this.context.strokeStyle = this.color[1];
    this.context.fillStyle = this.color[1];

    this.context.lineWidth = 2;
    this.context.fillRect(this.x + 39, this.y - 10, 5, 20);
    this.context.strokeRect(this.x + 44, this.y - 10, 5, 20);

    this.context.beginPath();
    this.context.lineWidth = 4;
    this.context.moveTo(this.x + 49, this.y - 10);
    this.context.lineTo(this.x + 60, this.y - 20);
    this.context.lineTo(this.x + 60, this.y + 15);
    this.context.lineTo(this.x + 49, this.y + 10);
    this.context.stroke();

    this.context.beginPath();
    this.context.lineWidth = 2;
    this.context.moveTo(this.x + 49, this.y);
    this.context.lineTo(this.x + 60, this.y);

    this.context.stroke();

    this.context.strokeStyle = this.color[0];
    this.context.fillStyle = this.color[0];

    this.context.lineWidth = 5;
    this.context.beginPath();
    this.context.moveTo(this.x, this.y);
    this.context.lineTo(this.x + 20, this.y - 25);
    this.context.lineTo(this.x + 48, this.y + 20);
    this.context.stroke();

    this.context.beginPath();
    this.context.moveTo(this.x + 26, this.y - 15);
    this.context.lineTo(this.x + 39, this.y - 15);
    this.context.lineTo(this.x + 39, this.y + 10);
    this.context.fill();
  }
}
