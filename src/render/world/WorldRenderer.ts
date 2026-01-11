import type { GameState } from '../../game/state/GameState';
import { IRenderer } from '../IRenderer';

export class WorldRenderer implements IRenderer {
  constructor(private ctx: CanvasRenderingContext2D) {}

  render(state: GameState) {
    const { ctx } = this;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (const e of state.entities) {
      const shape = (e as any).shape as 'rect' | 'circle' | undefined;
      const color = (e as any).color as string | undefined;
      const size = (e as any).size as number | undefined;
      const pos = (e as any).position as { x: number; y: number } | undefined;
      if (!shape || !pos || !size) continue;
      ctx.fillStyle = color ?? '#fff';
      if (shape === 'rect') {
        ctx.fillRect(pos.x - size / 2, pos.y - size / 2, size, size);
      } else if (shape === 'circle') {
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}
