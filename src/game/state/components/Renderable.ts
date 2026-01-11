import { Vector2 } from "../../../math/Vector2";

type BaseShape = {
  size: number;
  orientation?: number; // radians
};

export type Rectangle  = BaseShape &{
    type: 'rect';
    width: number;
    height: number;
}

export type Circle = BaseShape & {
    type: 'circle';
    radius: number;
}

export type Triangle = BaseShape & {
    type: 'triangle';
    base: number;
    height: number;
}

export type Polygon = BaseShape & {
    type: 'polygon';
    points: Vector2[]; // relative to 0,0
}

// Generic Shape
export type Shape = Rectangle | Circle | Triangle | Polygon;

export type Renderable = {
  shape: Shape;
  color: string;
  position: Vector2;
};
