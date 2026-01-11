import { GameState } from "./GameState";
import { StartMenuState } from './ui/StartMenuState';

export class StateInitializer {
  static createInitialGameState(): GameState {
    const startMenu: StartMenuState = {
      playerConnections: Array.from({ length: 8 }, () => ({ status: 'notJoined', controllerId: null }))
    };
    return {
      entities: [],
      ui: {
        openMenu: 'start',
        previousMenuBeforeDisconnect: null,
        startMenu,
      },
      time: { total: 0 },
    };
  }
}