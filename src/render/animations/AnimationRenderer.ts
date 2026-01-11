import { IRenderer } from "../IRenderer";
import { AnimationState } from "./AnimationState";
import { GameEvent } from "../../game/events/eventTypes/GameEvent";
import type { GameState } from "../../game/state/GameState";

export class AnimationRenderer implements IRenderer {
    private animationState: AnimationState = {};
    constructor(private ctx: CanvasRenderingContext2D){
    }
    render(state: GameState, events: GameEvent[]) {

    }
}