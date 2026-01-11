import { ControllerState } from "../input/ControllerState";

export type Controllable ={
  controllerId: string;
    current: ControllerState;
    previous: ControllerState;
}