import { EventBus } from '../events/EventBus';
import { IRenderer} from '../../render/IRenderer';
import { StateInitializer } from '../state/StateInitializer';
import { ISystem } from '../systems/ISystem';


export class GameLoop {
  private lastTime = 0;
  private gameState = StateInitializer.createInitialGameState();
  private eventBus: EventBus = new EventBus();

  constructor(private systems: ISystem[], private renderers: IRenderer[]) {
  }

  start() {
    this.lastTime = performance.now();
    const tick = (t: number) => {
      const dt = Math.min(0.033, (t - this.lastTime) / 1000);
      this.lastTime = t;
      this.update(dt);
      this.render();
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  stop() {
  }

  private update(dt: number) {
    this.gameState.time.total += dt;
    for (const system of this.systems) {
      system.update(this.gameState, this.eventBus, dt);
    }
  }

  private render() {
    const events = this.eventBus.drain();
    for (const renderer of this.renderers) {
      renderer.render(this.gameState, events);
    }
  }
}
