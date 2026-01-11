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

        // Edge-detect Cross/Triangle by gamepad.id, assign slots by join order
        for (const pad of pads) {
        if (!pad) continue;
        pad.buttons?.forEach((b, i) => {
            if (b.pressed) {
            console.log(`Pad ${pad.index} Button ${i} pressed`);
            }
        });
        pad.axes?.forEach((a, i) => {
            if (Math.abs(a) > 0.1) {
            console.log(`Pad ${pad.index} Axis ${i} value ${a}`);
            }
        });
        const id = String(pad.id);
        const cross = !!pad.buttons?.[0]?.pressed;
        const triangle = !!pad.buttons?.[3]?.pressed;

        // Find slot for this controller id, if any
        let slot = connections.findIndex(pc => pc.controllerId === id);

        if (cross && !this.prevCross[id]) {
            if (slot === -1) {
            // Assign first available slot
            slot = connections.findIndex(pc => pc.status === 'notJoined');
            if (slot !== -1) {
                connections[slot] = { status: 'joined', controllerId: id };
            }
            }
        }

        if (triangle && !this.prevTriangle[id]) {
            if (slot !== -1 && connections[slot].status === 'joined') {
            connections[slot] = { status: 'ready', controllerId: id };
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