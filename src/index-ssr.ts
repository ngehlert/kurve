import { GameController } from './game-controller';
import { PlayerManager } from './player-manager';
import { Player } from './player';
import { EColor } from './color';
import { Config } from './config';
import { EKeyCode, EMouseClick } from './keyboard-controls';

export function initGame() {
    Config.canvasWidth = IS_ELECTRON_BUILD ? document.body.clientWidth : document.body.clientWidth - 20;
    Config.canvasHeight = IS_ELECTRON_BUILD ? document.body.clientHeight : document.body.clientHeight - 50;

    const canvasId: string = 'canvas';
    const canvasElement: HTMLCanvasElement | null = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvasElement) {
        throw new Error('No canvas element found');
    }
    canvasElement.width = Config.getCanvasWidth();
    canvasElement.height = Config.getCanvasHeight();

    let drawingContext: CanvasRenderingContext2D;
    if (canvasElement.getContext) {
        drawingContext = canvasElement.getContext('2d') as CanvasRenderingContext2D;
    } else {
        throw new Error('No canvas support');
    }

    drawIntroText();

    document.addEventListener('keydown', initGame, { once: true });

    function drawIntroText() {
        const frameLineWidth: number = 5;
        drawingContext.lineWidth = frameLineWidth;
        drawingContext.strokeStyle = '#6E6E6E';
        drawingContext.strokeRect(
            frameLineWidth / 2,
            frameLineWidth / 2,
            Config.getCanvasWidth() - frameLineWidth,
            Config.getCanvasHeight() - frameLineWidth,
        );
        drawingContext.textAlign = 'start';
        const fontSize: number = Config.getCanvasHeight() / 10;
        drawingContext.font = `${fontSize}px Fredericka the Great, cursive`;
        drawingContext.fillStyle = '#ffffff';
        let textString: string = 'Achtung, die Kurve !';
        let textWidth: number = drawingContext.measureText(textString).width;

        drawingContext.fillText(
            textString,
            Config.getCanvasWidth() / 2 - textWidth / 2,
            Config.getCanvasHeight() / 2 + fontSize / 2,
        );

        drawingContext.textAlign = 'start';
        drawingContext.font = 'lighter 16px Helvetica, Arial, sans-serif';
        drawingContext.fillStyle = '#ffffff';
        textString = 'Press any key to continue';
        textWidth = drawingContext.measureText(textString).width;
        drawingContext.fillText(textString, Config.getCanvasWidth() / 2 - textWidth / 2, Config.getCanvasHeight() - 50);
    }

    function initGame() {
        const playerManager: PlayerManager = new PlayerManager();
        const player1: Player = new Player(1, 'Player 1', EColor.Red, EKeyCode.One, EKeyCode.Q);
        playerManager.addPlayer(player1);

        const player2: Player = new Player(2, 'Player 2', EColor.Yellow, EKeyCode.Y, EKeyCode.X);
        playerManager.addPlayer(player2);

        const player3: Player = new Player(3, 'Player 3', EColor.Orange, EKeyCode.M, EKeyCode.Comma);
        playerManager.addPlayer(player3);

        const player4: Player = new Player(4, 'Player 4', EColor.Green, EKeyCode.Left, EKeyCode.Down);
        playerManager.addPlayer(player4);

        const player5: Player = new Player(5, 'Player 5', EColor.Pink, EKeyCode.P, EKeyCode.SZ);
        playerManager.addPlayer(player5);

        const player6: Player = new Player(6, 'Player 6', EColor.Blue, EMouseClick.Left, EMouseClick.Right);
        playerManager.addPlayer(player6);

        const game: GameController = new GameController(drawingContext, playerManager);
    }
}
