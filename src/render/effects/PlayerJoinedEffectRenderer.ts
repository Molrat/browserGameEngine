import { EffectsState } from "./AnimationState";
import { GameEvent } from "../../game/events/eventTypes/GameEvent";
import { IEffectRenderer } from "../IEffectRenderer";

export class PlayerJoinedEffectRenderer implements IEffectRenderer {
    private effectsState: EffectsState = {};
    constructor(private ctx: CanvasRenderingContext2D) {}

    render(events: GameEvent[]) {
        const now = performance.now();
        // Ingest events into effects state
        for (const ev of events) {
            if (ev.type === 'StartMenuPlayerJoinedEffect') {
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

            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = '#f59e0b'; // amber
            ctx.lineWidth = thickness;
            ctx.strokeRect(x - thickness / 2, y - thickness / 2, rectW + thickness, rectH + thickness);

            // Simple flare
            ctx.fillStyle = 'rgba(245, 158, 11, 0.2)';
            ctx.fillRect(x, y, rectW, rectH);
            ctx.restore();
        }

        // Keep only non-expired animations
        this.effectsState.joinEffects = remaining;
    }
}