import { EventBus } from "../events/EventBus";
import { isControllable } from "../queries/Controllable/isControllable";
import { GameState } from "../state/GameState";
import { ISystem } from "./ISystem";

export class AssignButtonsToPlayerSystem implements ISystem {
    update(state: GameState, eventBus: EventBus, dt: number): void {
        // Implementation would go here
        state.entities
            .filter(isControllable)
            .forEach(player => {
                const controller = state.input.controllers
                    .find(c => c.id === player.controllerId);
                const previousController = state.input.previousControllers
                    .find(c => c.id === player.controllerId);
                if (controller) {
                    player.current = { ...controller };
                }
                if (previousController)
                {
                    player.previous =  { ...previousController };
                }
            });
        }
    }