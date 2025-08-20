import { Player } from './player';
import { Config } from './config';
import { getRandomNumber } from './utils';

class GameEngine {

    private interval: number = 0;
    private canvasContext: CanvasRenderingContext2D;
    private players: Player[];
    private stepsUntilHolePerPlayer: Map<number, number> = new Map<number, number>();
    private holeSizePerPlayer: Map<number, number> = new Map<number, number>();
    private readonly speed: number = Config.pixelsPerSecond * (1000 / Config.fps / 1000);

    private playerRanks: Player[] = [];
    private resolveCallback: Function | undefined;

    constructor(canvas: CanvasRenderingContext2D, players: Player[]) {
        this.canvasContext = canvas;
        this.players = players;
    }

    public prepare(): Promise<Player[]> {
        if (this.interval) {
            return new Promise(resolve => resolve([]));
        }
        return new Promise((resolve, reject) => {
            this.resolveCallback = resolve;
            this.playerRanks = [];
            // Start drawing first few pixels so everybody knows his start position
            this.draw();
            this.draw();
            this.draw();
            this.draw();
        });
    }

    public start() {
        if (!this.interval) {
            this.interval = window.setInterval(
                () => {
                    this.draw();
                },
                1000 / Config.fps,
            );
        }
    }

    private stop(): void {
        clearInterval(this.interval);
        this.interval = 0;
        if (this.resolveCallback) {
            this.resolveCallback(this.playerRanks);
        }
    }

    private draw():void {
        this.players
            .filter((player: Player): boolean => {
                return player.isActive && player.isAlive;
            })
            .forEach((player: Player) => {
                if (player.isTurningLeft) {
                    player.angle -= Config.angleModifier;
                }
                if (player.isTurningRight) {
                    player.angle += Config.angleModifier;
                }

                const deltaX = Math.cos(player.angle * Math.PI / 180) * this.speed;
                const deltaY = Math.sin(player.angle * Math.PI / 180) * this.speed;

                if (this.hitTest({ x: player.xPosition + deltaX, y: player.yPosition + deltaY })) {
                    this.playerRanks.unshift(player);
                    player.isAlive = false;

                    const alivePlayers: Player[] = this.players.filter((player: Player) => {
                        return player.isAlive;
                    });

                    if (alivePlayers.length < 2) {
                        alivePlayers.forEach((player: Player) => {
                            this.playerRanks.unshift(player);
                        });
                        this.stop();
                    }
                }

                if (!this.stepsUntilHolePerPlayer.has(player.id)) {
                    this.stepsUntilHolePerPlayer.set(player.id, this.getStepsUntilNextHole());
                }

                if (this.stepsUntilHolePerPlayer.get(player.id) === 0) {
                    if (!this.holeSizePerPlayer.has(player.id)) {
                        this.holeSizePerPlayer.set(player.id, 0);
                    } else {
                        const holeSize: number = (this.holeSizePerPlayer.get(player.id) || 0) + 1;
                        this.holeSizePerPlayer.set(player.id, holeSize);

                        if (holeSize >= Config.holeSize) {
                            this.stepsUntilHolePerPlayer.set(player.id, this.getStepsUntilNextHole());
                            this.holeSizePerPlayer.set(player.id, 0);
                        }
                    }
                } else {
                    this.stepsUntilHolePerPlayer.set(player.id, (this.stepsUntilHolePerPlayer.get(player.id) || 1) - 1);

                    this.canvasContext.strokeStyle = player.color;
                    this.canvasContext.fillStyle = player.color;
                    this.canvasContext.beginPath();
                    this.canvasContext.lineWidth = Config.lineWidth;
                    this.canvasContext.moveTo(player.xPosition, player.yPosition);
                    this.canvasContext.lineTo(player.xPosition + deltaX, player.yPosition + deltaY);
                    this.canvasContext.stroke();
                }

                player.xPosition += deltaX;
                player.yPosition += deltaY;
            });
    }

    private getStepsUntilNextHole(): number {
        return Math.floor(getRandomNumber(1, 100) * (100 / Config.holeFrequency));
    }

    private hitTest(point: {x: number, y: number}): boolean {
        if (point.x > Config.getCanvasWidth() || point.y > Config.getCanvasHeight() || point.x < 0 || point.y < 0) {
            return true;
        }

        if (this.canvasContext.getImageData(point.x, point.y, 1, 1).data[3] > 100) {
            return true;
        }

        return false;
    }
}

export { GameEngine };
