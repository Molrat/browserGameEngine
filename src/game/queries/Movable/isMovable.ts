import type { Entity } from '../../state/Entity';
import { IMovable } from './IMovable';

export function isMovable(e: Entity): e is Entity & IMovable {
  return 'position' in e && 'velocity' in e && 'acceleration' in e;
}
