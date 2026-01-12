import { IRenderer } from "../../IRenderer";
import type { GameState } from "../../../../game/state/GameState";
import { CanvasDrawer } from "../../common/CanvasDrawer";
import { RectDrawer } from "../../common/RectDrawer";
import { TextDrawer } from "../../common/TextDrawer";

export class StartMenuRenderer implements IRenderer{
    constructor(private ctx: CanvasRenderingContext2D) {}

    render(gameState: GameState): void {
        if (gameState.ui.openMenu !== 'start') return;
        const s = gameState.ui.startMenu;
        const statuses = s.playerConnections.map(pc => pc.status);
        const { ctx } = this;
        const { width, height } = ctx.canvas;
        CanvasDrawer.clear(ctx);
        CanvasDrawer.fillBackground(ctx, '#111');

        const cols = 4;
        const rows = 2;
        const pad = 20;
        const rectW = (width - pad * (cols + 1)) / cols;
        const rectH = (height - pad * (rows + 1)) / rows;

        for (let i = 0; i < statuses.length; i++) {
            const col = i % cols;
            const row = Math.floor(i / cols);
            const x = pad + col * (rectW + pad);
            const y = pad + row * (rectH + pad);
            const st = statuses[i];

            const tileColor = st === 'ready' ? '#16a34a' : st === 'joined' ? '#2563eb' : '#374151';
            RectDrawer.fill(ctx, x, y, rectW, rectH, tileColor);

            const label = st === 'notJoined' ? 'Press X to join' : st === 'joined' ? 'Press Triangle to be ready' : 'Ready!';
            TextDrawer.draw(ctx, `P${i + 1}`, x + 12, y + 24, '#fff', '16px sans-serif');
            TextDrawer.draw(ctx, label, x + 12, y + 48, '#fff', '16px sans-serif');
        }
    }
}