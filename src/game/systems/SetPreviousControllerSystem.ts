import { EventBus } from "../events/EventBus";
import { GameState } from "../state/GameState";
import { ISystem } from "./ISystem";

export class SetPreviousControllerSystem implements ISystem {
    update(state: GameState, eventBus: EventBus, deltaTime: number): void {
        state.input.previousControllers = state.input.controllers.map(controller => ({ ...controller }) );
    }
}