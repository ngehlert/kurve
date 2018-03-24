import { Config } from '../config';

class Star {
    private maxStarRadius: number = 3;
    private flashingFactor: number = 0.4;
    private x: number = Math.random() * Config.canvasWidth;
    private y: number = Math.random() * Config.canvasHeight;
    private r: number = Math.random() * this.maxStarRadius;
    private b: number = Math.trunc(Math.random() * 100) / 100;

    constructor(private drawingContext: CanvasRenderingContext2D) {}

    public draw() {
        this.b += this.flashingFactor * (Math.random() - .5);
        this.drawingContext.fillStyle = 'rgba(255,255,255,' + this.b + ')';
        this.drawingContext.beginPath();
        this.drawingContext.arc(Math.trunc(this.x), Math.trunc(this.y), this.r, 0, Math.PI * 2);
        this.drawingContext.fill();
        this.drawingContext.closePath();
    }
}

export { Star };

