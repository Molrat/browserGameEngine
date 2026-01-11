import type { GameState } from '../../game/state/GameState';
import { IRenderer } from '../IRenderer';
import { CanvasDrawer } from '../common/CanvasDrawer';

export class WorldRenderer implements IRenderer {
  constructor(private ctx: CanvasRenderingContext2D) {}

  render(state: GameState) {
    if (state.ui.openMenu !== null) return; // Only render world during gameplay
    const { ctx } = this;
    // Background only via helpers
    CanvasDrawer.clear(ctx);
    CanvasDrawer.fillBackground(ctx, '#0a0a0a');
  }
}
