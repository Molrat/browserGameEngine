import { Vector2 } from "../../math/Vector2";

export class PolygonDrawer {
  static fill(ctx: CanvasRenderingContext2D, points: Vector2[], fillStyle?: string) {
    if (points.length === 0) return;
    ctx.save();
    if (fillStyle) ctx.fillStyle = fillStyle;
    ctx.beginPath();
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  static stroke(ctx: CanvasRenderingContext2D, points: Vector2[], strokeStyle?: string, lineWidth?: number) {
    if (points.length === 0) return;
    ctx.save();
    if (strokeStyle) ctx.strokeStyle = strokeStyle;
    if (lineWidth !== undefined) ctx.lineWidth = lineWidth;
    ctx.beginPath();
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
}