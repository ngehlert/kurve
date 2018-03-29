import { FireworkConfig } from './config';

class Particle {
    private lifeTime: number = FireworkConfig.fireworkLifeTime;
    private radius: number = 3;
    private path: any[] = [];

    constructor(
        private drawingContext: CanvasRenderingContext2D,
        private x: number,
        private y: number,
        private vx:  number,
        private vy:  number,
        private ax:  number,
        private ay:  number,
        private color: string) {}

    public update() {
        this.lifeTime--;

        // add point to path but if full, remove a point first
        if (this.path.length >= FireworkConfig.trailLength) this.path.shift();
        this.path.push([this.x, this.y]);

        // update speed n position n stuff
        this.vy += this.ay;
        this.vx += this.ax;
        this.x += this.vx;
        this.y += this.vy;
    }

    public draw() {
        const opacity: number = Math.trunc(this.lifeTime * 100 / FireworkConfig.fireworkLifeTime) / 100;

        // tail
        this.drawingContext.fillStyle = `rgba(${this.color},${opacity * 0.4})`;
        if (this.lifeTime > FireworkConfig.fireworkLifeTime * 0.95) {
            this.drawingContext.fillStyle = '#fff';
        }
        this.drawingContext.lineWidth = 40;
        this.drawingContext.beginPath();
        this.drawingContext.moveTo(this.x - this.radius, this.y);
        this.drawingContext.lineTo(this.path[0][0], this.path[0][1]);
        this.drawingContext.lineTo(this.x + this.radius, this.y);
        this.drawingContext.closePath();
        this.drawingContext.fill();

        // main dot
        this.drawingContext.fillStyle = `rgba(${this.color},${opacity})`;
        if (this.lifeTime > FireworkConfig.fireworkLifeTime * 0.95) {
            this.drawingContext.fillStyle = '#fff';
        }
        this.drawingContext.beginPath();
        this.drawingContext.arc(Math.trunc(this.x), Math.trunc(this.y), this.radius, 0, Math.PI * 2);
        this.drawingContext.fill();
        this.drawingContext.closePath();
    }
}

export { Particle };
