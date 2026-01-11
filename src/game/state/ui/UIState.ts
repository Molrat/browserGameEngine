import { StartMenuState } from "./StartMenuState";

export type UIState = {
  openMenu: 'start' | 'pause' | 'controllerTest' | null;
  startMenu: StartMenuState;
};
