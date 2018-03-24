import { Firework } from './firework';
import { Star } from './star';
import { Config } from '../config';
import { FireworkConfig } from './config';

class FireworkService {
    private stars: Array<Star> = [];
    private firework1: Firework;
    private firework2: Firework;
    private isRunning: boolean = false;

    private mainWithThis = this.main.bind(this);
    private previousState: ImageData | undefined;
    private animationId: number | undefined;

    constructor(private drawingContext: CanvasRenderingContext2D, private withStars: boolean) {
        this.firework1 = new Firework(this.drawingContext);
        this.firework2 = new Firework(this.drawingContext);
        this.firework2.life = -FireworkConfig.fireworkLifeTime - FireworkConfig.delay;
        if (this.withStars) {
            this.createStars();
        }
    }

    public start(): void {
        this.saveDrawingSurface();
        this.isRunning = true;
        this.main();
    }

    public stop(): void {
        this.isRunning = false;
        if (this.animationId) {
            window.cancelAnimationFrame(this.animationId);
        }
    }

    private createStars() {
        for (let i: number = 0; i < FireworkConfig.numberOfStars; i++) {
            this.stars.push(new Star(this.drawingContext));
        }
    }

    private main() {
        if (this.isRunning) {
            this.restoreDrawingSurface();
        } else {
            return;
        }

        this.stars.forEach((star: Star) => {
            star.draw();
        });

        this.firework1.update();
        this.firework2.update();

        if (this.firework1.life === FireworkConfig.fireworkLifeTime * FireworkConfig.delay) {
            this.firework2 = new Firework(this.drawingContext);
        }
        if (this.firework2.life === FireworkConfig.fireworkLifeTime * FireworkConfig.delay) {
            this.firework1 = new Firework(this.drawingContext);
        }

        if (this.isRunning) {
            this.animationId = window.requestAnimationFrame(this.mainWithThis);
        }
    }

    private saveDrawingSurface() {
        this.previousState = this.drawingContext.getImageData(
            0,
            0,
            Config.canvasWidth,
            Config.canvasHeight
        );
    }

    private restoreDrawingSurface() {
        if (this.previousState) {
            this.drawingContext.putImageData(this.previousState, 0, 0);
        }
    }
}

export { FireworkService };