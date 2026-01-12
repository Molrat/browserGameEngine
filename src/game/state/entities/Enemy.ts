import type { Movable } from '../components/Movable';
import type { Damageable } from '../components/Damageable';
import type { Physical } from '../components/Physical';
import type { Identifiable } from '../components/Identifiable';

export type Enemy = Identifiable & Movable & Damageable & Physical;
