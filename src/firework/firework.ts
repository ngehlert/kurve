import { Config } from '../config';
import { Particle } from './particle';
import { FireworkConfig } from './config';

class Firework {
    private x: number = Config.canvasWidth * (Math.random() * 0.8 + 0.1); // from 0.1-0.9 widths
    private y: number = Config.canvasHeight * (Math.random() * 0.8 + 0.1); // from 0.1-0.9 heights
    private strength: number = Math.random() * (FireworkConfig.maxStrength - FireworkConfig.minStrength)
        + FireworkConfig.minStrength;
    private color: string = `${Math.trunc(Math.random() * 255)},${Math.trunc(Math.random() * 255)},`
        + `${Math.trunc(Math.random() * 255)}`;
    public life: number = 0;

    private particles: Particle[] = [];

    constructor(private drawingContext: CanvasRenderingContext2D) {
        const n = ~~(Math.random() * (FireworkConfig.maxTrails - FireworkConfig.minTrails)) + FireworkConfig.minTrails;
        const ay = FireworkConfig.gravity;
        for (let i: number = n; i--;) {
            let ax = FireworkConfig.airResistance;
            const angle = i * Math.PI * 2 / n;
            if (angle < Math.PI) {
                ax *= -1;
            }
            const vx = this.strength * Math.sin(angle);
            const vy = this.strength * Math.cos(angle);
            this.particles.push(new Particle(drawingContext, this.x, this.y, vx, vy, ax, ay, this.color));
        }
    }

    public update() {
        this.life++;
        if (this.life < 0) {
            return; // allows life to be delayed
        }
        for (let i: number = this.particles.length; i--;) {
            this.particles[i].update();
            this.particles[i].draw();
        }
    }
}

export { Firework };
