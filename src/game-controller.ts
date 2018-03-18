import {Config} from "./config";
import { PlayerManager } from './player-manager';
import { GameEngine } from './game-engine';
import { Player } from './player';
import { EKeyCode, EMouseClick } from './keyboard-controls';

class GameController {
    private gameEngine: GameEngine | undefined;

    private readonly frameLineWidth: number = 5;

    /**
     * Ugly work around to remove arrow functions as event listener
     */
    private togglePlayerReadyStateKeyboardListener = this.togglePlayerReadyStateKeyboard.bind(this);
    private togglePlayerReadyStateMouseListener = this.togglePlayerReadyStateMouse.bind(this);
    private startGameEventListenerListener = this.startGameEventListener.bind(this);
    private startNextRoundKeyboardEventListener = this.startNextRoundKeyboardEvent.bind(this);

    constructor(private drawingContext: CanvasRenderingContext2D, private playerManager: PlayerManager) {
        this.drawKeySettings();
    }

    /**
     * This basically starts an entire game.
     */
    private startGameEventListener(event: KeyboardEvent) {
        if (event.keyCode === EKeyCode.Space) {
            if (this.playerManager.getNumberOfActivePlayers() < 2) {
                return;
            }
            this.drawFrames();
            this.gameEngine = new GameEngine(this.drawingContext, this.playerManager.getPlayers());

            this.playerManager.initializePlayers();
            this.startRound();
            document.removeEventListener('keydown', this.togglePlayerReadyStateKeyboardListener);
            document.removeEventListener('mousedown', this.togglePlayerReadyStateMouseListener);
            document.removeEventListener('keydown', this.startGameEventListenerListener);
        }
    }

    /**
     * Starts a new round.
     */
    private startRound(): void {
        document.removeEventListener('keydown', this.startNextRoundKeyboardEventListener);
        this.drawPlayingFieldFrame();
        this.playerManager.initializePlayers();
        if (this.gameEngine) {
            this.gameEngine.start().then((ranks: Array<Player>) => {
                document.addEventListener('keydown', this.startNextRoundKeyboardEventListener);
                this.playerManager.updateScores(ranks);
                this.drawScoreboard();
            });
        }
    }

    private startNextRoundKeyboardEvent(event: KeyboardEvent) {
        if(event.keyCode == EKeyCode.Space) {
            if (this.gameEngine) {
                this.startRound();
            }
        }
    }

    private drawKeySettings(): void {
        this.drawingContext.clearRect(0, 0, Config.canvasWidth, Config.canvasHeight);

        this.drawingContext.lineWidth = this.frameLineWidth;
        this.drawingContext.strokeStyle = "#6E6E6E";
        this.drawingContext.strokeRect(
            this.frameLineWidth / 2,
            this.frameLineWidth / 2,
            Config.canvasWidth - this.frameLineWidth,
            Config.canvasHeight - this.frameLineWidth,
        );

        this.playerManager.getPlayers().forEach((player: Player, index: number) => {
            this.drawingContext.textAlign = 'middle';
            const fontSize: number = 20;
            this.drawingContext.font = `${fontSize}px Fredericka the Great, cursive`;
            this.drawingContext.fillStyle = player.color;
            this.drawingContext.fillText(
                `( ${this.getKeyName(player.leftControl)}  ${this.getKeyName(player.rightControl)} )`,
                100,
                Config.canvasHeight / (this.playerManager.getPlayers().length + 2) * (index + 1) - (fontSize / 3),
            );
        });
        this.drawingContext.textAlign = 'middle';
        const fontSize: number = 16;
        this.drawingContext.font = `lighter ${fontSize}px Helvetica, Arial, sans-serif`;
        this.drawingContext.fillStyle = '#ffffff';
        const textString: string = 'If 2 or more players have joined, start the game by pressing Space';
        const textWidth: number = this.drawingContext.measureText(textString).width;
        this.drawingContext.fillText(
            textString,
            (Config.canvasWidth / 2) - (textWidth / 2),
            Config.canvasHeight - 50,
        );

        document.addEventListener('keydown', this.togglePlayerReadyStateKeyboardListener);
        document.addEventListener('mousedown', this.togglePlayerReadyStateMouseListener);
        document.addEventListener('keydown', this.startGameEventListenerListener);
    }

    private togglePlayerReadyStateMouse(event: MouseEvent) {
        event.preventDefault();
        if (event.button === 0) {
            const activePlayer: Player | undefined = this.playerManager.getPlayers().find((player: Player) => {
                return player.leftControl === EMouseClick.Left;
            });
            if (activePlayer) {
                this.drawPlayerReadyState(activePlayer, true);
            }
        }
        if (event.button === 2) {
            const activePlayer: Player | undefined = this.playerManager.getPlayers().find((player: Player) => {
                return player.rightControl === EMouseClick.Right;
            });
            if (activePlayer) {
                this.drawPlayerReadyState(activePlayer, false);
            }
        }
    }

    private togglePlayerReadyStateKeyboard(event: KeyboardEvent) {
        const activePlayer: Player | undefined = this.playerManager.getPlayers().find((player: Player) => {
            return player.leftControl === event.keyCode;
        });
        if (activePlayer) {
            this.drawPlayerReadyState(activePlayer, true);
        }

        const inactivePlayer: Player | undefined = this.playerManager.getPlayers().find((player: Player) => {
            return player.rightControl === event.keyCode;
        });
        if (inactivePlayer) {
            this.drawPlayerReadyState(inactivePlayer, false);
        }
    }

    private drawPlayerReadyState(player: Player, state: boolean) {
        this.drawingContext.textAlign = 'middle';
        const fontSize: number = 20;
        this.drawingContext.font = `${fontSize}px Fredericka the Great, cursive`;
        this.drawingContext.fillStyle = player.color;
        const playerIndex: number = this.playerManager.getPlayers().findIndex((currentPlayer: Player) => {
            return currentPlayer === player;
        });
        const yPosition: number = Config.canvasHeight / (this.playerManager.getPlayers().length + 2) * (playerIndex + 1) - (fontSize / 3);
        this.drawingContext.clearRect(390, yPosition - fontSize, 100, fontSize + 5);

        player.isActive = state;

        if (state) {
            this.drawingContext.fillText('READY', 400, yPosition);
        }
    }

    private getKeyName(keyCode: EKeyCode | EMouseClick): string {
        switch (keyCode) {
            case EKeyCode.One:
                return '1';
            case EKeyCode.Q:
                return 'Q';
            case EKeyCode.LAlt:
                return 'L . Alt';
            case EKeyCode.RAlt:
                return 'R . Alt';
            case EKeyCode.M:
                return 'M';
            case EKeyCode.Comma:
                return ',';
            case EKeyCode.P:
                return 'P';
            case EKeyCode.SZ:
                return 'ß';
            case EKeyCode.Left:
                return 'L . Arrow';
            case EKeyCode.Down:
                return 'D . Arrow';
            case EMouseClick.Left:
                return 'L . Mouse';
            case EMouseClick.Right:
                return 'R . Mouse';
            default:
                return '';
        }
    }

    private drawScoreboard(): void {
        this.drawingContext.clearRect(
            Config.canvasWidth - Config.scoreBoardWith,
            0,
            Config.canvasWidth,
            Config.canvasHeight
        );

        this.drawingContext.beginPath();
        this.drawingContext.rect(
            Config.canvasWidth - Config.scoreBoardWith,
            this.frameLineWidth / 2,
            Config.scoreBoardWith - (this.frameLineWidth / 2),
            Config.canvasHeight - (this.frameLineWidth)
        );
        this.drawingContext.fillStyle = '#3C3C3C';
        this.drawingContext.fill();
        this.drawingContext.lineWidth = this.frameLineWidth;
        this.drawingContext.strokeStyle = "#6E6E6E";
        this.drawingContext.stroke();

        this.playerManager.getPlayers().forEach((player: Player, index: number) => {
            if (!player.isActive) {
                return;
            }
            this.drawingContext.textAlign = 'middle';
            const fontSize: number = Config.canvasHeight / (this.playerManager.getPlayers().length + 2);
            this.drawingContext.font = `${fontSize}px Fredericka the Great, cursive`;
            this.drawingContext.fillStyle = player.color;
            this.drawingContext.fillText(
                `${player.score}`,
                Config.canvasWidth - (Config.scoreBoardWith / 1.5) - (4 * this.frameLineWidth),
                Config.canvasHeight / this.playerManager.getPlayers().length * (index + 1) - (fontSize / 3),
            );
        });
    }

    private drawFrames() {
        this.drawPlayingFieldFrame();
        this.drawScoreboard();
    };

    private drawPlayingFieldFrame() {
        this.drawingContext.clearRect(
            0,
            0,
            Config.canvasWidth - Config.scoreBoardWith,
            Config.canvasHeight
        );

        this.drawingContext.lineWidth = this.frameLineWidth;
        this.drawingContext.strokeStyle = "#6E6E6E";
        this.drawingContext.strokeRect(
            this.frameLineWidth / 2,
            this.frameLineWidth / 2,
            Config.canvasWidth - Config.scoreBoardWith - (this.frameLineWidth / 2),
            Config.canvasHeight - this.frameLineWidth
        );
    }
}

export { GameController };