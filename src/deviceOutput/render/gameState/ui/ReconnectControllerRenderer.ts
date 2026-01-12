import { IRenderer as IGameStateRenderer } from "../../IRenderer";
import type { GameState } from "../../../../game/state/GameState";
import { CanvasDrawer } from "../../common/CanvasDrawer";
import { TextDrawer } from "../../common/TextDrawer";

export class ReconnectControllerRenderer implements IGameStateRenderer {
  constructor(private ctx: CanvasRenderingContext2D) {}

  render(gameState: GameState): void {
    if (gameState.ui.openMenu !== 'reconnectControllerMenu') return;
    const { ctx } = this;
    const { width, height } = ctx.canvas;

    CanvasDrawer.clear(ctx);
    CanvasDrawer.fillBackground(ctx, '#111');
    TextDrawer.drawCenteredOnCanvas(ctx, 'Reconnect controller', height / 2, '#fff', '20px sans-serif');
  }
}
