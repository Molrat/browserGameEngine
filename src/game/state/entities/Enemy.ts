import type { Movable } from '../components/Movable';
import type { Damageable } from '../components/Damageable';
import type { Renderable } from '../components/Renderable';
import type { Entity } from '../Entity';

export type Enemy = Entity & Movable & Damageable & Renderable;
