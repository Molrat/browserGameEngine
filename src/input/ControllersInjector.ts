import type { GameState } from '../game/state/GameState';
import { IInputInjector } from './IInputInjector';
import { ControllerState } from '../game/state/input/ControllerState';

export class ControllersInjector implements IInputInjector{
  injectInputIntoState(state: GameState): void {
      const pads = navigator.getGamepads ? navigator.getGamepads() : [];
      const newControllers: ControllerState[] = [];
      pads.forEach(pad => {
        if (pad) {
          newControllers.push(this.gamePadToControllerState(pad));
        }
      });
      state.input.controllers = newControllers;
  }
  
  gamePadToControllerState(pad: Gamepad): ControllerState {
    const controllerState: ControllerState = {
      id: pad.index.toString(),
    leftStick:{
      x: pad.axes?.[0] ?? 0,
      y: pad.axes?.[1] ?? 0,
    },
    rightStick:{
      y: pad.axes?.[3] ?? 0,
      x: pad.axes?.[2] ?? 0,
    },
    leftTrigger: pad.buttons?.[6]?.value ?? 0,
    rightTrigger: pad.buttons?.[7]?.value ?? 0,
    triangle: !!pad.buttons?.[3]?.pressed,
    cross: !!pad.buttons?.[0]?.pressed,
    square: !!pad.buttons?.[2]?.pressed,
    circle: !!pad.buttons?.[1]?.pressed,
    l1: !!pad.buttons?.[4]?.pressed,
    r1: !!pad.buttons?.[5]?.pressed,
    l2: !!pad.buttons?.[6]?.pressed,
    r2: !!pad.buttons?.[7]?.pressed,
    l3: !!pad.buttons?.[10]?.pressed,
    r3: !!pad.buttons?.[11]?.pressed,
    dpadUp: !!pad.buttons?.[12]?.pressed,
    dpadDown: !!pad.buttons?.[13]?.pressed,
    dpadLeft: !!pad.buttons?.[14]?.pressed,
    dpadRight: !!pad.buttons?.[15]?.pressed,
    start: !!pad.buttons?.[9]?.pressed,
    select: !!pad.buttons?.[8]?.pressed,
    home: !!pad.buttons?.[16]?.pressed,
    }
    return controllerState;
  }
}
