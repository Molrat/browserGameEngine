import { IRenderer } from "../../IRenderer";
import { LineDrawer } from "../../common/LineDrawer";
import type { GameState } from "../../../game/state/GameState";
import { CanvasDrawer } from "../../common/CanvasDrawer";

export class ControllerTestBackgroundRenderer implements IRenderer {
  constructor(private ctx: CanvasRenderingContext2D) {}

  render(state: GameState): void {
    if (state.ui.openMenu !== 'controllerTest') return;
    const { ctx } = this;
    CanvasDrawer.clear(ctx);
    CanvasDrawer.fillBackground(ctx, '#0b0b0f');
    const grid = 40;
    LineDrawer.strokeVerticalGrid(ctx, grid, 'rgba(255,255,255,0.06)', 1);
    LineDrawer.strokeHorizontalGrid(ctx, grid, 'rgba(255,255,255,0.06)', 1);
  }
}
