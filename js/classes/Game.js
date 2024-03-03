import EggsBanks from "./EggsBanks.js";
import Board from "./Board.js";
import Player from "./Player.js";
import Bunny from "./Bunny.js";
import InputHandler from "./inputHandler.js";
import ScoreCounter from "./ScoreCounter.js";
import FaultCounter from "./FaultCounter.js";
import Settings from "./Settings.js";
import Controller from "./Controller.js";
import Glass from "./Glass.js";
import Menu from "./Menu.js";
import Drawing from "./Drawing.js";
import ShadowLayer from "./ShadowLayer.js";

export default class Game {
  canvas;
  ctx;
  animationGlobal;
  wolf = new Player(this);
  bunny = new Bunny();

  board = new Board(this);
  shadowLayer = new ShadowLayer(this);
  glass = new Glass(this);

  menu = new Menu();

  rect = new Drawing();

  eggBank = [
    new EggsBanks(177, 153.9, 1),
    new EggsBanks(177, 215, 1),
    new EggsBanks(423, 153.9, -1),
    new EggsBanks(423, 215, -1),
  ];

  liveEgg = new FaultCounter(this.ctx, 250, 160);

  inputHandler = new InputHandler(this);
  controller = new Controller();

  pastTime = 0;
  isMenuPressed = true;

  start() {
    this.canvas = document.getElementById("2d-canvas");
    this.canvas.width = Settings.canvas.width;
    this.canvas.height = Settings.canvas.height;
    this.ctx = this.canvas.getContext("2d");
    this.inputHandler.setCanvasSize(this.canvas);
    this.menu.init(this.canvas);

    this.inputHandler.addEventListener();

    this.board.draw(this.ctx);
    this.shadowLayer.draw(this.ctx);
    this.glass.draw(this.ctx);
  }

  update(timeStamp) {
    if (Controller.isStop[0] === false) {
      Controller.update(timeStamp);
    }

    if (Controller.isStop[0] === true) {
      this.liveEgg.updateWhenStop(timeStamp);
    }

    EggsBanks.setPlayEggs(Controller.playEggs);

    this.bunny.update(timeStamp);
    Controller.setBunnyStatus(this.bunny.isBunny);

    ScoreCounter.setScoreCount(Controller.scoreCounter);

    this.liveEgg.setFaultCounter(Controller.faultTempCounter);

    this.liveEgg.update(timeStamp);
  }

  draw() {
    this.board.draw(this.ctx);
    this.shadowLayer.draw(this.ctx);

    for (let i = 0; i < 4; i++) {
      this.eggBank[i].draw(this.ctx, i);
    }

    this.wolf.draw(this.ctx);
    this.bunny.draw(this.ctx);

    ScoreCounter.draw(this.ctx, 110);

    for (let i = 0; i < 3; i++) {
      this.liveEgg.draw_shadow(this.ctx, 347 - i * 16, 150);
    }

    for (let i = 0; i < this.liveEgg.faultCounter; i++) {
      if (this.liveEgg.faultCounter <= 3) {
        this.liveEgg.draw(this.ctx, 347 - i * 16, 150);
      }
    }

    this.glass.draw(this.ctx);
  }

  onInputEvent(buttonNumber) {
    this.wolf.setPosition(buttonNumber);
    Controller.setWolfPoz(buttonNumber);
  }

  onMouseEvent(eventNumber) {
    this.menu.input.forEach((input) => {
      input.style.display = "none";
    });

    if (eventNumber === 3 && this.isMenuPressed === true) {
      this.menu.draw(this.ctx);
      this.isMenuPressed = false;
    } else if (eventNumber === 3 && this.isMenuPressed === false) {
      this.isMenuPressed = true;
      this.board.draw(this.ctx);
      this.glass.draw(this.ctx);
    } else if (eventNumber === 1 || eventNumber === 2) {
      this.animate();
      if (eventNumber === 2) Controller.gameB = true;
    }

    if (eventNumber > 3 && eventNumber <= 7) {
      this.menu.inputs(eventNumber - 4);
    }
  }

  animate(timeStamp) {
    this.update(timeStamp);
    this.draw();
    requestAnimationFrame((timeStamp) => this.animate(timeStamp));
  }
}
