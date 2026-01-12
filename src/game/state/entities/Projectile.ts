import type { Movable } from '../components/Movable';
import type { Physical } from '../components/Physical';
import type { Identifiable } from '../components/Identifiable';

export type Projectile = Identifiable & Movable & Physical;