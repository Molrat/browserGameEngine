import { IRenderer } from "../../IRenderer";
import type { GameState } from "../../../game/state/GameState";

export class ReconnectControllerRenderer implements IRenderer {
  constructor(private ctx: CanvasRenderingContext2D) {}

  render(gameState: GameState): void {
    if (gameState.ui.openMenu !== 'reconnectControllerMenu') return;
    const { ctx } = this;
    const { width, height } = ctx.canvas;

    ctx.save();
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#fff';
    ctx.font = '20px sans-serif';
    const message = 'Reconnect controller';
    const textWidth = ctx.measureText(message).width;
    ctx.fillText(message, (width - textWidth) / 2, height / 2);

    ctx.restore();
  }
}
