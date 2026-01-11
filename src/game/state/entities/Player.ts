import type { Movable } from '../components/Movable';
import type { Damageable } from '../components/Damageable';
import type { Renderable } from '../components/Renderable';
import type { Entity } from '../Entity';
import { Controllable } from '../components/Controllable';

export type Player = Entity & Movable & Damageable & Renderable & Controllable;