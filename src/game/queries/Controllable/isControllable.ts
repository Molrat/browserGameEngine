import { Entity } from "../../state/Entity";
import { IControllable } from "./IControllable";

export function isControllable(e: Entity): e is Entity & IControllable {
  return 'controllerId' in e;
}
