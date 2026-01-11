import type { GameState } from '../../game/state/GameState';
import { IRenderer } from '../IRenderer';
import { StartMenuRenderer } from './StartMenuRenderer';
import { ReconnectControllerRenderer } from './ReconnectControllerRenderer';

export class UIRenderer implements IRenderer {
  private startMenuRenderer: StartMenuRenderer;
  private reconnectControllerRenderer: ReconnectControllerRenderer;
  constructor(private ctx: CanvasRenderingContext2D) {
    this.startMenuRenderer = new StartMenuRenderer(ctx);
    this.reconnectControllerRenderer = new ReconnectControllerRenderer(ctx);
  }

  render(state: GameState) {
    if (state.ui.openMenu == 'start') {
      this.startMenuRenderer.render(state);
    } else if (state.ui.openMenu == 'reconnectControllerMenu') {
      this.reconnectControllerRenderer.render(state);
    }
  }
}
