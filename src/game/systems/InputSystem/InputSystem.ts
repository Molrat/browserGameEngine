import type { GameState } from '../../state/GameState';
import { ISystem } from '../ISystem';
import type { EventBus } from '../../events/EventBus';
import { InputSystemInStartMenu } from './InputSystemInStartMenu';

export class InputSystem implements ISystem {
  private startMenuInputSystem = new InputSystemInStartMenu();
  constructor(){}

  update(state: GameState, eventBus: EventBus, dt: number) {
    if (state.ui.openMenu == 'start') {
        this.startMenuInputSystem.update(state, eventBus, dt);
    }
    else if (state.ui.openMenu == 'pause') {
        this.updateInPauseMenu(state);
    }
    else if (state.ui.openMenu == null) {
        this.updateInGame(state);
    }
  }

  
  updateInGame(state: GameState) {}
  updateInPauseMenu(state: GameState) {}
}
