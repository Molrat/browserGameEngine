import { IRenderer } from "../../IRenderer";
import type { GameState } from "../../../game/state/GameState";
import { Vector2 } from "../../../math/Vector2";
import { PolygonDrawer } from "../../common/PolygonDrawer";
import { isRenderable } from "../../../game/queries/Renderable/isRenderable";
import type { IRenderable } from "../../../game/queries/Renderable/IRenderable";

export class ControllerTestPlayerRenderer implements IRenderer {
  constructor(private ctx: CanvasRenderingContext2D) {}

  render(state: GameState): void {
    if (state.ui.openMenu !== 'controllerTest') return;
    const { ctx } = this;

    const renderables = state.entities.filter(isRenderable) as IRenderable[];
    for (const r of renderables) {
      PolygonDrawer.drawPhysical(ctx, r);
    }
  }
}
