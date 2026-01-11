import { EventBus } from "../../events/EventBus";
import { PlayerFactory } from "../../state/entities/Factories/PlayerFactory";
import { GameState } from "../../state/GameState";
import { PlayerConnectionState } from "../../state/ui/StartMenuState";
import { ISystem } from "../ISystem";

export class ControllerSystemInStartMenu implements ISystem {

    update(state: GameState, eventBus: EventBus, dt: number): void{
        if (state.ui.openMenu != 'start') 
        { 
            return; 
        }
        if (state.input.controllers.length != state.input.previousControllers.length) 
        {
            return;
        }

        const s = state.ui.startMenu;
        const connections = s.playerConnections;

        // Edge-detect Cross/Triangle by controller index in pads, assign slots by join order
        state.input.controllers.forEach((controller, index) => {
            // Find slot for this controller index-based id, if any
            let slot = connections.findIndex(pc => pc.controllerId === controller.id);
            if (slot === -1) {
                const previousCross = state.input.previousControllers[index]?.cross || false;
                 if (controller.cross && !previousCross) {
                    this.connectPlayer(connections, controller.id, eventBus);
                }
            }
            // If found, check for ready
            else{
                if (connections[slot].status === 'joined') {
                    const previousTriangle = state.input.previousControllers[index]?.triangle || false;
                    if (controller.triangle && !previousTriangle) {
                        this.readyPlayer(connections[slot], slot, eventBus);
                    }
                }
            }
        });

        const allReady = this.checkAllReady(connections);
        if (allReady) {
            connections.forEach( pc => {
                if (pc.status === 'ready' && pc.controllerId) {
                state.entities.push(PlayerFactory.create(pc.controllerId));
                }
            });
            state.ui.openMenu = 'controllerTest';
        }
    }

    private connectPlayer(connections: PlayerConnectionState[], controllerId: string, eventBus: EventBus){
        const slot = connections.findIndex(pc => pc.status === 'notJoined');
        connections[slot] = { status: 'joined', controllerId: controllerId };
        eventBus.emit({ type: 'StartMenuPlayerJoined', slot });
    }

    private readyPlayer(slot: PlayerConnectionState, slotIndex: number, eventBus: EventBus){
        slot.status = 'ready';
        eventBus.emit({ type: 'StartMenuPlayerReady',  slot: slotIndex });
    }

    private checkAllReady(connections: PlayerConnectionState[]): boolean{
        var anyReady = connections.some(pc => pc.status === 'ready');
        var anyNotReady = connections.some(pc => pc.status === 'joined');
        return anyReady && !anyNotReady;
    }
}