import type { Entity } from '../../state/Entity';
import type { Renderable } from '../../state/components/Renderable';

export function isRenderable(e: Entity): e is Entity & Renderable {
  return 'shape' in e && 'color' in e;
}
