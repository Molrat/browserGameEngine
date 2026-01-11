import { AnimationState } from "./AnimationState";
import { GameEvent } from "../../game/events/eventTypes/GameEvent";
import { IEffectRenderer } from "../effects/IEffectRenderer";

export class AnimationRenderer implements IEffectRenderer {
    private animationState: AnimationState = {};
    constructor(private ctx: CanvasRenderingContext2D){
    }
    render(events: GameEvent[]) {

    }
}