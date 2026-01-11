import type { Movable } from '../components/Movable';
import type { Renderable } from '../components/Renderable';
import type { Entity } from '../Entity';

export type Projectile = Entity & Movable & Renderable;