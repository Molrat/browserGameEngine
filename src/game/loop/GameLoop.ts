import { EventBus } from '../events/EventBus';
import { IRenderer} from '../../render/IRenderer';
import { IEffectRenderer } from '../../render/effects/IEffectRenderer';
import { ISoundPlayer } from '../../soundPlayers/ISoundPlayer';
import { StateInitializer } from '../state/StateInitializer';
import { ISystem } from '../systems/ISystem';


export class GameLoop {
  private lastTime = 0;
  private gameState = StateInitializer.createInitialGameState();
  private eventBus: EventBus = new EventBus();

  constructor(private systems: ISystem[], private renderers: IRenderer[], private effectRenderers: IEffectRenderer[], private soundPlayers: ISoundPlayer[]) {
  }

  start() {
    this.lastTime = performance.now();
    const tick = (t: number) => {
      const dt = Math.min(0.033, (t - this.lastTime) / 1000);
      this.lastTime = t;
      this.updateGameState(dt);
      this.renderGameState();
      this.eventHandling(); // visual effects and sounds
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  stop() {
  }

  private updateGameState(dt: number) {
    this.gameState.time.total += dt;
    for (const system of this.systems) {
      system.update(this.gameState, this.eventBus, dt);
    }
  }

  private renderGameState() {
    for (const renderer of this.renderers) {
      renderer.render(this.gameState);
    }
  }

  private eventHandling(){
    const events = this.eventBus.drain();
    for (const sp of this.soundPlayers) {
      sp.play(events);
    }
    for (const effect of this.effectRenderers) {
      effect.render(events);
    }
  }
}
