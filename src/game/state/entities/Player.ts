import type { Movable } from '../components/Movable';
import type { Damageable } from '../components/Damageable';
import type { Physical } from '../components/Physical';
import type { Identifiable } from '../Identifiable';
import { Controllable } from '../components/Controllable';

export type Player = Identifiable & Movable & Damageable & Physical & Controllable;