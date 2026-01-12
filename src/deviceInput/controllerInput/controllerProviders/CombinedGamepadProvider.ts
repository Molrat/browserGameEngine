import type { IGamepadProvider } from "./IGamepadProvider";
import type { ControllerState } from "../../../game/state/input/ControllerState";

export class CombinedGamepadProvider implements IGamepadProvider {
  constructor(private providers: ReadonlyArray<IGamepadProvider>) {}

  getGamepads(): ControllerState[] {
    for (const p of this.providers) {
      const list = p.getGamepads();
      if (list.length > 0) return list;
    }
    return [];
  }
}
