import { Shape } from "../../state/components/Renderable";

export interface IRenderable{
      shape: Shape;
      color: string;
      size: number;
      orientation?: number;
}