import { EventBus } from "../../events/EventBus";
import { PlayerFactory } from "../../state/entities/PlayerFactory";
import { GameState } from "../../state/GameState";
import { ISystem } from "../ISystem";

export class InputSystemInStartMenu implements ISystem {
    
    private prevCross: Record<string, boolean> = {};
    private prevTriangle: Record<string, boolean> = {};

    update(state: GameState, eventBus: EventBus, dt: number): void{
        const pads = navigator.getGamepads?.() || [];
        const s = state.ui.startMenu;
        const connections = s.playerConnections;

        // Edge-detect Cross/Triangle by controller index in pads, assign slots by join order
        for (let i = 0; i < pads.length; i++) {
            const pad = pads[i];
            if (!pad) continue;
            const id = String(i);
            const cross = !!pad.buttons?.[0]?.pressed;
            const triangle = !!pad.buttons?.[3]?.pressed;

            // Find slot for this controller index-based id, if any
            let slot = connections.findIndex(pc => pc.controllerId === id);

            if (cross && !this.prevCross[id]) {
                if (slot === -1) {
                // Assign first available slot
                slot = connections.findIndex(pc => pc.status === 'notJoined');
                if (slot !== -1) {
                    connections[slot] = { status: 'joined', controllerId: id };
                    eventBus.emit({ type: 'StartMenuPlayerJoinedEffect', slot });
                }
                }
            }

            if (triangle && !this.prevTriangle[id]) {
                if (slot !== -1 && connections[slot].status === 'joined') {
                    connections[slot] = { status: 'ready', controllerId: id };
                    eventBus.emit({ type: 'StartMenuPlayerReadyEffect', slot });
                }
            }

            this.prevCross[id] = cross;
            this.prevTriangle[id] = triangle;
        }

        const statuses = connections.map(pc => pc.status);
        const anyJoined = statuses.some(st => st !== 'notJoined');
        const allReady = statuses.every(st => st === 'notJoined' || st === 'ready');
        if (anyJoined && allReady) {
        for (let i = 0; i < connections.length; i++) {
            const pc = connections[i];
            if (pc.status === 'ready' && pc.controllerId) {
            state.entities.push(PlayerFactory.create(pc.controllerId));
            }
        }
        state.ui.openMenu = 'controllerTest';
        }
    }
}