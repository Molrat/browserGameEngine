import { GameEvent } from "../game/events/eventTypes/GameEvent";
import { GameState } from "../game/state/GameState";

export interface IRenderer{
    render(gameState: GameState, events: GameEvent[]): void;
}