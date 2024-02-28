export default class FaultCounter {
  constructor(context, x, y) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.pastTime = 0;
    this.min, this.max;
  }
  color;

  setFaultCounter(faultTempCounter) {
    this.faultTempCounter = faultTempCounter;
  }

  draw(context, x, y, color) {
    context.beginPath();
    context.fillStyle = color;
    context.arc(x, y, 7, 0, Math.PI * 2);
    context.fill();
    context.closePath();
  }

  update(realTime) {
    let min, max;
    let delta = realTime - this.pastTime;
    min = this.faultTempCounter - 0.5;
    max = this.faultTempCounter + 0.5;
    if (delta > 1000) {
      if (this.faultTempCounter % 1 !== 0) {
        this.faultCounter = this.faultCounter === min ? max : min;
      } else this.faultCounter = this.faultTempCounter;
      this.pastTime = realTime;
    }
  }
}
