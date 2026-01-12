import type { ControllerState } from "../../../game/state/input/ControllerState";

export interface IGamepadProvider {
  getGamepads(): ControllerState[];
}
