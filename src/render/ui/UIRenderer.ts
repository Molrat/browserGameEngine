import { GameEvent } from '../../game/events/eventTypes/GameEvent';
import type { GameState } from '../../game/state/GameState';
import { IRenderer } from '../IRenderer';
import { StartMenuRenderer } from './StartMenuRenderer';

export class UIRenderer implements IRenderer {
  private startMenuRenderer: StartMenuRenderer;
  constructor(private ctx: CanvasRenderingContext2D) {
    this.startMenuRenderer = new StartMenuRenderer(ctx);
  }

  render(state: GameState, events: GameEvent[]) {
    if (state.ui.openMenu == 'start') {
      this.startMenuRenderer.render(state, events);
    }
  }
}
