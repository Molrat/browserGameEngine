import { Entity } from "../../state/Entity";
import { IControllable } from "../Controllable/IControllable";
import { IMovable } from "../Movable/IMovable";
import { isControllable } from "../Controllable/isControllable";
import { isMovable } from "../Movable/isMovable";

export function isControllableMovable(e: Entity): e is Entity & IControllable & IMovable {
  return isControllable(e) && isMovable(e);
}