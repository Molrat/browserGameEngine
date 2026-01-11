import { IRenderer } from "../../IRenderer";
import type { GameState } from "../../../game/state/GameState";

export class ControllerTestBackgroundRenderer implements IRenderer {
  constructor(private ctx: CanvasRenderingContext2D) {}

  render(state: GameState): void {
    if (state.ui.openMenu !== 'controllerTest') return;
    const { ctx } = this;
    const { width, height } = ctx.canvas;
    ctx.clearRect(0, 0, width, height);

    // Simple dark background with subtle grid
    ctx.fillStyle = '#0b0b0f';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    const grid = 40;
    ctx.beginPath();
    for (let x = 0; x <= width; x += grid) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = 0; y <= height; y += grid) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();
  }
}
