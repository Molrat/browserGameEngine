import { GameLoop } from './game/loop/GameLoop';
import { MovementSystem } from './game/systems/MovementSystem';
import { DisconnectCheckSystem } from './game/systems/DisconnectCheckSystem';
import { PlayerJoinedEffectRenderer } from './render/effects/PlayerJoinedEffectRenderer';
import { PlayerReadyEffectRenderer } from './render/effects/PlayerReadyEffectRenderer';
import { WorldRenderer } from './render/gameState/world/WorldRenderer';
import { ControllerTestBackgroundRenderer } from './render/gameState/world/ControllerTestBackgroundRenderer';
import { ControllerTestPlayerRenderer } from './render/gameState/world/ControllerTestPlayerRenderer';
import { StartMenuSoundPlayer } from './soundPlayers/StartMenuSoundPlayer';
import { ControlMovementTestSystem } from './game/systems/controllerTestScreen/ControlTestMovementSystem';
import { ControllersInjector } from './input/ControllersInjector';
import { EventBus } from './game/events/EventBus';
import { StateInitializer } from './game/state/StateInitializer';
import { SetPreviousControllerSystem } from './game/systems/SetPreviousControllerSystem';
import { ReconnectControllerRenderer } from './render/gameState/ui/ReconnectControllerRenderer';
import { StartMenuRenderer } from './render/ui/StartMenuRenderer';

const canvas = document.getElementById('game') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

function resizeCanvasToViewport() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvasToViewport();
window.addEventListener('resize', resizeCanvasToViewport);

const gameState = StateInitializer.createInitialGameState();

const eventBus = new EventBus();

const inputInjectors = [
    new ControllersInjector(),
];

const systems = [
    new DisconnectCheckSystem(),
    new ControlMovementTestSystem(),
    new MovementSystem(),
    new SetPreviousControllerSystem(),
]

const renderers = [
    new ReconnectControllerRenderer(ctx),
    new StartMenuRenderer(ctx),
    new ControllerTestBackgroundRenderer(ctx),
    new ControllerTestPlayerRenderer(ctx),
    new WorldRenderer(ctx),
];

const effectRenderers = [
    new PlayerJoinedEffectRenderer(ctx),
    new PlayerReadyEffectRenderer(ctx),
];

const soundPlayers = [
    new StartMenuSoundPlayer(),
];

const loop = new GameLoop(
    gameState, 
    eventBus, 
    inputInjectors, 
    systems, 
    renderers, 
    effectRenderers, 
    soundPlayers);

loop.start();
