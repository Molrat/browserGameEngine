import type { GameState } from '../../game/state/GameState';
import { IRenderer } from '../IRenderer';
import { getTrianglePoints, transformPoints } from '../../math/triangles';

export class WorldRenderer implements IRenderer {
  constructor(private ctx: CanvasRenderingContext2D) {}

  render(state: GameState) {
    if (state.ui.openMenu !== null) return; // Only render world during gameplay
    const { ctx } = this;
    // Background only
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
}
