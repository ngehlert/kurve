import { Config } from './config';
import { PlayerManager } from './player-manager';
import { GameEngine } from './game-engine';
import { Player } from './player';
import { EKeyCode, EMouseClick } from './keyboard-controls';
import { FireworkService } from './firework/firework-service';
import { EventHelper } from '@ngehlert/event-helper';

class GameController {
    private gameEngine: GameEngine | undefined;

    private readonly frameLineWidth: number = 5;
    private fireworkService: FireworkService;

    constructor(
        private drawingContext: CanvasRenderingContext2D,
        private playerManager: PlayerManager,
    ) {
        this.drawKeySettings();
        this.fireworkService = new FireworkService(this.drawingContext, false);
    }

    /**
     * This basically starts an entire game.
     */
    private startGameEventListener(event: Event) {
        if (!('keyCode' in event)) {
            return;
        }
        if (event.keyCode === EKeyCode.Space || event.keyCode === EKeyCode.Enter) {
            if (this.playerManager.getNumberOfActivePlayers() < 2) {
                return;
            }
            this.drawGameFrames();
            this.gameEngine = new GameEngine(this.drawingContext, this.playerManager.getPlayers());

            this.playerManager.initializePlayers();
            this.startRound();
            EventHelper.removeEventListener('toggle-ready-keyboard');
            EventHelper.removeEventListener('toggle-ready-mouse');
            EventHelper.removeEventListener('start-game');
        }
    }

    /**
     * Starts a new round.
     */
    private startRound(): void {
        this.drawPlayingFieldFrame();
        this.playerManager.initializePlayers();
        if (this.gameEngine) {
            this.gameEngine.prepare().then((ranks: Player[]) => {
                this.playerManager.updateScores(ranks);
                this.drawScoreboard();
                if (this.playerManager.getHighestScore() >= this.getMaxScore()) {
                    this.drawWinningScreen();
                } else {
                    EventHelper.addEventListener(
                        'start-new-round',
                        document,
                        'keydown',
                        this.startNextRoundKeyboardEvent.bind(this),
                    );
                }
            });

            EventHelper.addEventListener(
                'start-game-engine',
                document,
                'keydown',
                this.startEngingeKeyboardEvent.bind(this),
            );
        }
    }

    private startEngingeKeyboardEvent(event: Event): void {
        if (!('keyCode' in event)) {
            return;
        }
        if (event.keyCode === EKeyCode.Space || event.keyCode === EKeyCode.Enter) {
            if (this.gameEngine) {
                this.gameEngine.start();
            }

            EventHelper.removeEventListener('start-game-engine');
        }
    }

    private startNextRoundKeyboardEvent(event: Event) {
        if (!('keyCode' in event)) {
            return;
        }
        if (event.keyCode === EKeyCode.Space || event.keyCode === EKeyCode.Enter) {
            if (this.gameEngine) {
                EventHelper.removeEventListener('start-new-round');
                this.startRound();
            }
        }
    }

    private drawWinningScreen(): void {
        this.drawingContext.textAlign = 'start';
        const fontSize: number = 40;
        this.drawingContext.font = `${fontSize}px Fredericka the Great, cursive`;
        const playersWon: Player[] = this.playerManager.getPlayers().filter((player: Player) => {
            return player.score === this.playerManager.getHighestScore();
        });
        const textString: string = `${playersWon.map((player: Player) => player.name).join(', ')} won !!!`;
        const textWidth: number = this.drawingContext.measureText(textString).width;

        let xPosition: number = (Config.getCanvasWidth() - Config.scoreBoardWith) / 2 - textWidth / 2;
        playersWon.forEach((player: Player, index: number) => {
            this.drawingContext.fillStyle = player.color;
            const textChunk: string = `${player.name}${index < playersWon.length - 1 ? ', ' : ''}`;
            this.drawingContext.fillText(textChunk, xPosition, Config.getCanvasHeight() / 2 + fontSize / 2);
            xPosition += this.drawingContext.measureText(textChunk).width;
        });

        this.drawingContext.fillStyle = '#ffffff';
        const textChunk: string = ' won !!!';
        this.drawingContext.fillText(textChunk, xPosition, Config.getCanvasHeight() / 2 + fontSize / 2);

        this.fireworkService.start();

        this.playerManager.resetActiveStatus();
        this.playerManager.resetScores();
        EventHelper.addEventListener('start-new-game', document, 'keydown', this.startNewGameKeyboardEvent.bind(this));
    }

    private startNewGameKeyboardEvent(event: Event) {
        if (!('keyCode' in event)) {
            return;
        }
        if (event.keyCode === EKeyCode.Space || event.keyCode === EKeyCode.Enter) {
            EventHelper.removeEventListener('start-new-game');
            this.fireworkService.stop();
            this.drawKeySettings();
        }
    }

    private drawKeySettings(): void {
        this.drawingContext.clearRect(0, 0, Config.getCanvasWidth(), Config.getCanvasHeight());

        this.drawingContext.lineWidth = this.frameLineWidth;
        this.drawingContext.strokeStyle = '#6E6E6E';
        this.drawingContext.strokeRect(
            this.frameLineWidth / 2,
            this.frameLineWidth / 2,
            Config.getCanvasWidth() - this.frameLineWidth,
            Config.getCanvasHeight() - this.frameLineWidth,
        );

        this.playerManager.getPlayers().forEach((player: Player, index: number) => {
            this.drawingContext.textAlign = 'start';
            const fontSize: number = 20;
            this.drawingContext.font = `${fontSize}px Fredericka the Great, cursive`;
            this.drawingContext.fillStyle = player.color;
            this.drawingContext.fillText(
                `( ${this.getKeyName(player.leftControl)}  ${this.getKeyName(player.rightControl)} )`,
                100,
                (Config.getCanvasHeight() / (this.playerManager.getPlayers().length + 2)) * (index + 1) - fontSize / 3,
            );
        });
        this.drawingContext.textAlign = 'start';
        const fontSize: number = 16;
        this.drawingContext.font = `lighter ${fontSize}px Helvetica, Arial, sans-serif`;
        this.drawingContext.fillStyle = '#ffffff';
        const textString: string = 'If 2 or more players have joined, start the game by pressing Space or Enter';
        const textWidth: number = this.drawingContext.measureText(textString).width;
        this.drawingContext.fillText(
            textString,
            Config.getCanvasWidth() / 2 - textWidth / 2,
            Config.getCanvasHeight() - 50,
        );

        EventHelper.addEventListener(
            'toggle-ready-keyboard',
            document,
            'keydown',
            this.togglePlayerReadyStateKeyboard.bind(this),
        );
        EventHelper.addEventListener(
            'toggle-ready-mouse',
            document,
            'mousedown',
            this.togglePlayerReadyStateMouse.bind(this),
        );
        EventHelper.addEventListener('start-game', document, 'keydown', this.startGameEventListener.bind(this));
    }

    private togglePlayerReadyStateMouse(event: Event) {
        if (!('button' in event)) {
            return;
        }
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

    private togglePlayerReadyStateKeyboard(event: Event) {
        if (!('keyCode' in event)) {
            return;
        }
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
        this.drawingContext.textAlign = 'start';
        const fontSize: number = 20;
        this.drawingContext.font = `${fontSize}px Fredericka the Great, cursive`;
        this.drawingContext.fillStyle = player.color;
        const playerIndex: number = this.playerManager.getPlayers().findIndex((currentPlayer: Player) => {
            return currentPlayer === player;
        });
        const yPosition: number =
            (Config.getCanvasHeight() / (this.playerManager.getPlayers().length + 2)) * (playerIndex + 1) -
            fontSize / 3;
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
            case EKeyCode.Y:
                return 'Y';
            case EKeyCode.X:
                return 'X';
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
            Config.getCanvasWidth() - Config.scoreBoardWith,
            0,
            Config.getCanvasWidth(),
            Config.getCanvasHeight(),
        );

        this.drawingContext.beginPath();
        this.drawingContext.rect(
            Config.getCanvasWidth() - Config.scoreBoardWith,
            this.frameLineWidth / 2,
            Config.scoreBoardWith - this.frameLineWidth / 2,
            Config.getCanvasHeight() - this.frameLineWidth,
        );
        this.drawingContext.fillStyle = '#3C3C3C';
        this.drawingContext.fill();
        this.drawingContext.lineWidth = this.frameLineWidth;
        this.drawingContext.strokeStyle = '#6E6E6E';
        this.drawingContext.stroke();

        this.playerManager.getPlayers().forEach((player: Player, index: number) => {
            if (!player.isActive) {
                return;
            }
            this.drawingContext.textAlign = 'start';
            const fontSize: number = Config.getCanvasHeight() / (this.playerManager.getPlayers().length + 2);
            this.drawingContext.font = `${fontSize}px Fredericka the Great, cursive`;
            this.drawingContext.fillStyle = player.color;
            this.drawingContext.fillText(
                `${player.score}`.padStart(2, ' '),
                Config.getCanvasWidth() - Config.scoreBoardWith / 1.25 - 4 * this.frameLineWidth,
                (Config.getCanvasHeight() / this.playerManager.getPlayers().length) * (index + 1) - fontSize / 3,
            );
        });
    }

    private drawGameFrames() {
        this.drawPlayingFieldFrame();
        this.drawScoreboard();
    }

    private drawPlayingFieldFrame() {
        this.drawingContext.clearRect(0, 0, Config.getCanvasWidth() - Config.scoreBoardWith, Config.getCanvasHeight());

        this.drawingContext.lineWidth = this.frameLineWidth;
        this.drawingContext.strokeStyle = '#6E6E6E';
        this.drawingContext.strokeRect(
            this.frameLineWidth / 2,
            this.frameLineWidth / 2,
            Config.getCanvasWidth() - Config.scoreBoardWith - this.frameLineWidth / 2,
            Config.getCanvasHeight() - this.frameLineWidth,
        );
    }

    private getMaxScore(): number {
        return (this.playerManager.getNumberOfActivePlayers() - 1) * 10;
    }
}

export { GameController };
