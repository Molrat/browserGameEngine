import { GameLoop } from './game/loop/GameLoop';
import { MovementSystem } from './game/systems/MovementSystem';
import { DisconnectCheckSystem } from './game/systems/DisconnectCheckSystem';
import { PlayerJoinedEffectRenderer } from './deviceOutput/render/effects/PlayerJoinedEffectRenderer';
import { PlayerReadyEffectRenderer } from './deviceOutput/render/effects/PlayerReadyEffectRenderer';
import { WorldRenderer } from './deviceOutput/render/gameState/world/WorldRenderer';
import { ControllerTestBackgroundRenderer } from './deviceOutput/render/gameState/world/ControllerTestBackgroundRenderer';
import { ControllerTestPlayerRenderer } from './deviceOutput/render/gameState/world/ControllerTestPlayerRenderer';
import { StartMenuSoundPlayer } from './deviceOutput/soundPlayers/StartMenuSoundPlayer';
import { ControlMovementTestSystem } from './game/systems/controllerTestScreen/ControlTestMovementSystem';
import { ControllersInjector } from './deviceInput/ControllersInjector';
import { EventBus } from './game/events/EventBus';
import { StateInitializer } from './game/state/StateInitializer';
import { SetPreviousControllerSystem } from './game/systems/SetPreviousControllerSystem';
import { ReconnectControllerRenderer } from './deviceOutput/render/gameState/ui/ReconnectControllerRenderer';
import { StartMenuRenderer } from './deviceOutput/render/gameState/ui/StartMenuRenderer';
import { ControllerSystemInStartMenu } from './game/systems/startMenu/ControllerSystemInStartMenu';
import { AssignButtonsToPlayerSystem } from './game/systems/AssignButtonsToPlayerSystem';

const canvas = document.getElementById('game') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

function resizeCanvasToViewport() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvasToViewport();
window.addEventListener('resize', resizeCanvasToViewport);

const gameState = StateInitializer.createInitialGameState();

// EVENTS: Effects and sounds are triggered by events emitted during game update to the bus.
const eventBus = new EventBus();

// DEVICE INPUT: the input injectors read device input such as controllers and inject into gamestate
const inputInjectors = [
    new ControllersInjector(),
];

// GAMESTATE UPDATE SYSTEMS: systems update gamestate in series and emit events
const systems = [
    new ControllerSystemInStartMenu(),
    new AssignButtonsToPlayerSystem(),
    new DisconnectCheckSystem(),
    new ControlMovementTestSystem(),
    new MovementSystem(),
    new SetPreviousControllerSystem(),
]

// DEVICE OUTPUT: Renderers, Effects, SoundPlayers
const gameStateRenderers = [
    new ReconnectControllerRenderer(ctx),
    new StartMenuRenderer(ctx),
    new ControllerTestBackgroundRenderer(ctx),
    new ControllerTestPlayerRenderer(ctx),
    new WorldRenderer(ctx),
];

// Effect renderers only take events from the bus as input, such as "player joined"
const effectRenderers = [
    new PlayerJoinedEffectRenderer(ctx),
    new PlayerReadyEffectRenderer(ctx),
];

// Sound players only take events from the bus as input
const soundPlayers = [
    new StartMenuSoundPlayer(),
];

// Game loop triggers each frame: input injection -> gamestate update ->gamestate rendering -> effect rendering -> sound playing 
const loop = new GameLoop(
    gameState, 
    eventBus, 
    inputInjectors, 
    systems, 
    gameStateRenderers, 
    effectRenderers, 
    soundPlayers);

loop.start();
