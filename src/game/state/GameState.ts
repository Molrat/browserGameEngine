import type { Identifiable } from './Identifiable';
import type { UIState } from './ui/UIState';

export type GameState = {
  entities: Identifiable[];
  ui: UIState;
  time: { total: number };
};