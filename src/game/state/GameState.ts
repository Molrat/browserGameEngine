import type { Entity } from './Entity';
import type { UIState } from './ui/UIState';

export type GameState = {
  entities: Entity[];
  ui: UIState;
  time: { total: number };
};