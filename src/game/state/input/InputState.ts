import { ControllerState } from "./ControllerState";

export type InputState = {
    previousControllers: ControllerState[],
    controllers: ControllerState[]
};