import { Player } from './player';
import { Config } from './config';
import { getRandomNumber } from './utils';
import { EMouseClick } from './keyboard-controls';

class PlayerManager {
    private players: Map<number, Player> = new Map();

    public addPlayer(player: Player): void {
        if (this.players.has(player.id)) {
            throw new Error('Player with given Id already existing');
        }
        this.players.set(player.id, player);
        this.bindKeyboardControls(player);
    }

    public removePlayer(player: Player): void {
        this.players.delete(player.id);
        // technically we need to unbind keyboard controls here
        // method currently unused so ¯\_(ツ)_/¯
    }

    public initializePlayers() {
        Array.from(this.players.values())
            .filter((player: Player): boolean => {
                return player.isActive;
            })
            .forEach((player: Player) => {
                player.xPosition = getRandomNumber(
                    (Config.canvasWidth - Config.scoreBoardWith) / 5,
                    4 * (Config.canvasWidth - Config.scoreBoardWith) / 5,
                );
                player.yPosition = getRandomNumber(Config.canvasHeight / 5, 4 * Config.canvasHeight / 5);
                player.angle = Math.random() * 360;
                player.isAlive = true;
            });
    }

    private bindKeyboardControls(player: Player): void {
        // Todo: To beb consistent we should use the EventHandler here...
        document.addEventListener('keydown', (event: KeyboardEvent) => {
            event.preventDefault();
            if (event.keyCode === player.leftControl) {
                player.isTurningLeft = true;
            }
            if (event.keyCode === player.rightControl) {
                player.isTurningRight = true;
            }
        });
        document.addEventListener('keyup', (event: KeyboardEvent) => {
            event.preventDefault();
            if (event.keyCode === player.leftControl) {
                player.isTurningLeft = false;
            }
            if (event.keyCode === player.rightControl) {
                player.isTurningRight = false;
            }
        });
        document.addEventListener('mousedown', (event: MouseEvent) => {
            event.preventDefault();
            if (event.button === 0) {
                if (player.leftControl === EMouseClick.Left) {
                    player.isTurningLeft = true;
                }
                if (player.rightControl === EMouseClick.Left) {
                    player.isTurningRight = true;
                }
            }
            if (event.button === 2) {
                if (player.leftControl === EMouseClick.Right) {
                    player.isTurningLeft = true;
                }
                if (player.rightControl === EMouseClick.Right) {
                    player.isTurningRight = true;
                }
            }
        });
        document.addEventListener('mouseup', (event: MouseEvent) => {
            event.preventDefault();
            if (event.button === 0) {
                if (player.leftControl === EMouseClick.Left) {
                    player.isTurningLeft = false;
                }
                if (player.rightControl === EMouseClick.Left) {
                    player.isTurningRight = false;
                }
            }
            if (event.button === 2) {
                if (player.leftControl === EMouseClick.Right) {
                    player.isTurningLeft = false;
                }
                if (player.rightControl === EMouseClick.Right) {
                    player.isTurningRight = false;
                }
            }
        });
    }

    public getPlayers(): Player[] {
        return Array.from(this.players.values());
    }

    public getNumberOfActivePlayers(): number {
        return this.getPlayers().filter((player: Player): boolean => {
            return player.isActive;
        }).length;
    }

    public updateScores(ranks: Player[]): void {
        ranks.forEach((player: Player, index: number) => {
            player.score += this.getNumberOfActivePlayers() - index - 1;
        });
    }

    public getHighestScore(): number {
        const scores: number[] = Array.from(this.players.values()).map((player: Player) => {
            return player.score;
        });
        return Math.max(...scores);
    }

    public resetActiveStatus(): void {
        Array.from(this.players.values()).forEach((player: Player) => {
            player.isActive = false;
        });
    }

    public resetScores(): void {
        Array.from(this.players.values()).forEach((player: Player) => {
            player.score = 0;
        });
    }
}

export { PlayerManager };
