import { Player } from './player';
import { Config } from './config';
import { getRandomNumber } from './utils';
import { EKeyCode } from './keyboard-controls';

class GameEngine {

    private interval: number = 0;
    private canvasContext: CanvasRenderingContext2D;
    private players: Array<Player>;
    private stepsUntilHolePerPlayer: Map<number, number> = new Map<number, number>();
    private holeSizePerPlayer: Map<number, number> = new Map<number, number>();
    private readonly speed: number = Config.pixelsPerSecond * (1000 / Config.fps / 1000);

    private playerRanks: Array<Player> = [];
    private resolveCallback: Function | undefined;

    private startDrawingIntervalEventListener = this.startDrawingIntervalEvent.bind(this);

    constructor(canvas: CanvasRenderingContext2D, players: Array<Player>) {
        this.canvasContext = canvas;
        this.players = players;

    }

    public start(): Promise<Array<Player>> {
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

            document.addEventListener('keydown', this.startDrawingIntervalEventListener);
        })
    }

    private startDrawingIntervalEvent(event: KeyboardEvent) {
        document.removeEventListener('keydown', this.startDrawingIntervalEventListener);
        if(event.keyCode == EKeyCode.Space) {
            if (!this.interval) {
                this.interval = setInterval(() => {
                    this.draw();
                }, 1000 / Config.fps);
            }
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
                    player.angle -= 2;
                }
                if (player.isTurningRight) {
                    player.angle += 2;
                }

                let deltaX = Math.cos(player.angle * Math.PI / 180) * this.speed;
                let deltaY = Math.sin(player.angle * Math.PI / 180) * this.speed;

                if (this.hitTest({x: player.xPosition + deltaX, y: player.yPosition + deltaY})) {
                    this.playerRanks.unshift(player);

                    player.isAlive = false;

                    const alivePlayers: Array<Player> = this.players.filter((player: Player) => {
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
        return Math.floor(getRandomNumber(1, 100) * (10 / Config.holeFrequency));
    }

    private hitTest(point: {x: number, y: number}): boolean {
        if (point.x > Config.canvasWidth || point.y > Config.canvasHeight || point.x < 0 || point.y < 0) {
            return true;
        }

        if (this.canvasContext.getImageData(point.x, point.y, 1, 1).data[3] > 100) {
            return true;
        }

        return false;
    }
}

export { GameEngine };