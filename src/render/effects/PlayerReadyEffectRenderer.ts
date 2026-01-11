import { EffectsState } from "./AnimationState";
import { GameEvent } from "../../game/events/eventTypes/GameEvent";
import { IEffectRenderer } from "./IEffectRenderer";

export class PlayerReadyEffectRenderer implements IEffectRenderer {
  private effectsState: EffectsState = {};
  constructor(private ctx: CanvasRenderingContext2D) {}

  render(events: GameEvent[]) {
    const now = performance.now();
    for (const ev of events) {
      if (ev.type === 'StartMenuPlayerReady') {
        const duration = 600; // ms
        const e = { slot: ev.slot, startTime: now, duration };
        (this.effectsState.readyEffects ??= []).push(e);
      }
    }

    const { ctx } = this;
    const readyEffects = this.effectsState.readyEffects ?? [];
    const cols = 4;
    const rows = 2;
    const pad = 20;
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const rectW = (width - pad * (cols + 1)) / cols;
    const rectH = (height - pad * (rows + 1)) / rows;

    const remaining: typeof readyEffects = [];
    for (const fx of readyEffects) {
      const t = (now - fx.startTime) / fx.duration;
      if (t >= 1) {
        continue; // expired
      }
      remaining.push(fx);

      const col = fx.slot % cols;
      const row = Math.floor(fx.slot / cols);
      const x = pad + col * (rectW + pad);
      const y = pad + row * (rectH + pad);

      const alpha = 1 - t;
      const thickness = 4 + Math.sin(t * Math.PI) * 4;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = '#22c55e'; // green
      ctx.lineWidth = thickness;
      ctx.strokeRect(x - thickness / 2, y - thickness / 2, rectW + thickness, rectH + thickness);

      ctx.fillStyle = 'rgba(34, 197, 94, 0.2)';
      ctx.fillRect(x, y, rectW, rectH);
      ctx.restore();
    }

    this.effectsState.readyEffects = remaining;
  }
}
