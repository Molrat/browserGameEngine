import type { Identifiable } from '../../state/Identifiable';
import { IRenderable } from './IRenderable';

export function isRenderable(e: Identifiable): e is Identifiable & IRenderable {
  return 'shape' in e && 'position' in e && 'orientation' in e && 'color' in e;
}
