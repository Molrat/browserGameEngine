import type { Vector2 } from '../../../math/Vector2';

export type Movable = {
  position: Vector2;
  velocity: Vector2;
  acceleration: Vector2;
  orientation: number; // radians
};
