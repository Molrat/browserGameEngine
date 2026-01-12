import { EffectsState } from "./EffectsState";
import { GameEvent } from "../../../game/events/eventTypes/GameEvent";
import { IEffectRenderer } from "./IEffectRenderer";
import { RectDrawer } from "../common/RectDrawer";

export class PlayerJoinedEffectRenderer implements IEffectRenderer {
    private effectsState: EffectsState = {};
    constructor(private ctx: CanvasRenderingContext2D) {}

    render(events: GameEvent[]) {
        const now = performance.now();
        // Ingest events into effects state
        for (const ev of events) {
            if (ev.type === 'StartMenuPlayerJoined') {
                const duration = 600; // ms
                const e = { slot: ev.slot, startTime: now, duration };
                (this.effectsState.joinEffects ??= []).push(e);
            }
        }

        // Draw active join effects (fade/scale over time)
        const { ctx } = this;
        const joinEffects = this.effectsState.joinEffects ?? [];
        const cols = 4;
        const rows = 2;
        const pad = 20;
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        const rectW = (width - pad * (cols + 1)) / cols;
        const rectH = (height - pad * (rows + 1)) / rows;

        const remaining: typeof joinEffects = [];
        for (const fx of joinEffects) {
            const t = (now - fx.startTime) / fx.duration;
            if (t >= 1) {
                continue; // expired
            }
            remaining.push(fx);

            const col = fx.slot % cols;
            const row = Math.floor(fx.slot / cols);
            const x = pad + col * (rectW + pad);
            const y = pad + row * (rectH + pad);

            // Pulse alpha and border thickness
                        const alpha = 1 - t;
                        const thickness = 4 + Math.sin(t * Math.PI) * 4;

                        // Stroke border with alpha
                        RectDrawer.strokeAlpha(
                            ctx,
                            x - thickness / 2,
                            y - thickness / 2,
                            rectW + thickness,
                            rectH + thickness,
                            '#f59e0b',
                            thickness,
                            alpha
                        );

                        // Simple flare fill with combined alpha
                        const fillAlpha = alpha * 0.2;
                        RectDrawer.fill(ctx, x, y, rectW, rectH, 'rgba(245, 158, 11, 1)', fillAlpha);
        }

        // Keep only non-expired animations
        this.effectsState.joinEffects = remaining;
    }
}