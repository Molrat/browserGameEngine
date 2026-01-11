import { IRenderer } from "../../IRenderer";
import type { GameState } from "../../../game/state/GameState";
import { Vector2 } from "../../../math/Vector2";
import { getTrianglePoints, transformPoints } from "../../../math/triangles";
import { PolygonDrawer } from "../../common/PolygonDrawer";

export class ControllerTestPlayerRenderer implements IRenderer {
  constructor(private ctx: CanvasRenderingContext2D) {}

  render(state: GameState): void {
    if (state.ui.openMenu !== 'controllerTest') return;
    const { ctx } = this;

    for (const e of state.entities) {
      const shapeObj = (e as any).shape as { type: string } | undefined;
      const color = (e as any).color as string | undefined;
      const pos = (e as any).position as Vector2 | undefined;
      if (!shapeObj || !pos || !color) continue;
      if (shapeObj.type === 'triangle') {
        const base = (shapeObj as any).base ?? (shapeObj as any).size ?? 20;
        const height = (shapeObj as any).height ?? (shapeObj as any).size ?? 20;
        const orientation = (shapeObj as any).orientation ?? 0;
        const pts = getTrianglePoints(base, height);
        const worldPts = transformPoints(pts, orientation, pos);
        PolygonDrawer.fill(ctx, worldPts, color);
      }
    }
  }
}
