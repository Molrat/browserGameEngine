import { Identifiable } from "../../state/Identifiable";
import { IControllable } from "../Controllable/IControllable";
import { IMovable } from "../Movable/IMovable";
import { isControllable } from "../Controllable/isControllable";
import { isMovable } from "../Movable/isMovable";

export function isControllableMovable(e: Identifiable): e is Identifiable & IControllable & IMovable {
  return isControllable(e) && isMovable(e);
}