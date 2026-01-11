import type { GameState } from '../../state/GameState';
import { ISystem } from '../ISystem';
import type { EventBus } from '../../events/EventBus';
import { isControllableMovable } from '../../queries/Combined/isControllableMovable';
import { IControllable } from '../../queries/Controllable/IControllable';
import { IMovable } from '../../queries/Movable/IMovable';
import { Entity } from '../../state/Entity';

export class ControlMovementTestSystem implements ISystem {
  private speed = 200; // pixels per second
  update(state: GameState, eventBus: EventBus, dt: number): void {
    if (state.ui.openMenu != "controllerTest") return; // Only in-game
    const players = state.entities
      .filter(isControllableMovable)
    for (const p of players) {
      this.moveEntity(p);
    }
  }

  private moveEntity(entity: Entity & IControllable & IMovable) {
    const speed = 200; // pixels per second
    entity.velocity.x = entity.current.leftStick.x * this.speed;
    entity.velocity.y = entity.current.leftStick.y * this.speed;
    
    const rx = entity.current.rightStick.x;
    const ry = entity.current.rightStick.y;
    const mag2 = rx * rx + ry * ry;
    if (mag2 > 0.01) {
      const angle = Math.atan2(ry, rx)  + 0.5 * Math.PI; // screen Y is downwards
      // Apply to renderable shape orientation if available
      if ((entity as any).shape) {
        (entity as any).shape.orientation = angle;
      }
    }
  }
}
