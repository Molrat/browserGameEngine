import type { Identifiable } from '../../state/components/Identifiable';
import { IMovable } from './IMovable';

export function isMovable(e: Identifiable): e is Identifiable & IMovable {
  return 'position' in e && 'velocity' in e && 'acceleration' in e;
}
