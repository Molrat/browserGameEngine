import type { GameState } from '../../state/GameState';
import { ISystem } from '../ISystem';
import type { EventBus } from '../../events/EventBus';
import { InputSystemInStartMenu } from './InputSystemInStartMenu';
import { isControllable } from '../../queries/Controllable/isControllable';
import type { IControllable } from '../../queries/Controllable/IControllable';

export class InputSystem implements ISystem {
  private startMenuInputSystem = new InputSystemInStartMenu();
  constructor(){}

  update(state: GameState, eventBus: EventBus, dt: number) {
    if (state.ui.openMenu == 'start') {
        this.startMenuInputSystem.update(state, eventBus, dt);
    }
    else if (state.ui.openMenu == 'pause') {
        this.updateInPauseMenu(state);
    }
    else if (state.ui.openMenu == null || state.ui.openMenu == 'controllerTest') {
        this.updateInGame(state);
    }
  }

  
  updateInGame(state: GameState) {
    const pads = navigator.getGamepads?.() || [];
    const players = state.entities.filter(isControllable);
    for (const p of players) {
      this.updateEntityFromPad(p, pads[Number(p.controllerId)]);
    }
  }

  private updateEntityFromPad(entity: IControllable, pad: Gamepad | null) {
    if (!pad) return;
    this.updateAxes(entity, pad);
    this.updateButtonsAndTriggers(entity, pad);
  }

  private updateAxes(entity: IControllable, pad: Gamepad) {
    // Copy previous axes
    entity.previous.leftStick.x = entity.current.leftStick.x;
    entity.previous.leftStick.y = entity.current.leftStick.y;
    entity.previous.rightStick.x = entity.current.rightStick.x;
    entity.previous.rightStick.y = entity.current.rightStick.y;

    // Standard mapping: axes[0],[1] = left stick; axes[2],[3] = right stick
    const lx = pad.axes?.[0] ?? 0;
    const ly = pad.axes?.[1] ?? 0;
    const rx = pad.axes?.[2] ?? 0;
    const ry = pad.axes?.[3] ?? 0;
    entity.current.leftStick.x = lx;
    entity.current.leftStick.y = ly;
    entity.current.rightStick.x = rx;
    entity.current.rightStick.y = ry;
  }

  private updateButtonsAndTriggers(entity: IControllable, pad: Gamepad) {
    const b = pad.buttons ?? [];
    // Copy previous buttons
    entity.previous.triangle = entity.current.triangle;
    entity.previous.cross = entity.current.cross;
    entity.previous.square = entity.current.square;
    entity.previous.circle = entity.current.circle;
    entity.previous.l1 = entity.current.l1;
    entity.previous.r1 = entity.current.r1;
    entity.previous.l2 = entity.current.l2;
    entity.previous.r2 = entity.current.r2;
    entity.previous.l3 = entity.current.l3;
    entity.previous.r3 = entity.current.r3;
    entity.previous.dpadUp = entity.current.dpadUp;
    entity.previous.dpadDown = entity.current.dpadDown;
    entity.previous.dpadLeft = entity.current.dpadLeft;
    entity.previous.dpadRight = entity.current.dpadRight;
    entity.previous.start = entity.current.start;
    entity.previous.select = entity.current.select;
    entity.previous.home = entity.current.home;

    // Standard mapping (A/B/X/Y) → (cross/circle/square/triangle)
    entity.current.cross = !!b[0]?.pressed;
    entity.current.circle = !!b[1]?.pressed;
    entity.current.square = !!b[2]?.pressed;
    entity.current.triangle = !!b[3]?.pressed;

    // Shoulders
    entity.current.l1 = !!b[4]?.pressed;
    entity.current.r1 = !!b[5]?.pressed;

    // Triggers: analog values (0..1) + pressed booleans
    const lt = b[6]?.value ?? 0;
    const rt = b[7]?.value ?? 0;
    entity.current.leftTrigger = lt;
    entity.current.rightTrigger = rt;
    entity.current.l2 = !!b[6]?.pressed;
    entity.current.r2 = !!b[7]?.pressed;

    // Stick buttons
    entity.current.l3 = !!b[10]?.pressed;
    entity.current.r3 = !!b[11]?.pressed;

    // D-pad
    entity.current.dpadUp = !!b[12]?.pressed;
    entity.current.dpadDown = !!b[13]?.pressed;
    entity.current.dpadLeft = !!b[14]?.pressed;
    entity.current.dpadRight = !!b[15]?.pressed;

    // Menu buttons
    entity.current.start = !!b[9]?.pressed;
    entity.current.select = !!b[8]?.pressed;
    entity.current.home = !!b[16]?.pressed;
  }
  updateInPauseMenu(state: GameState) {}
}
