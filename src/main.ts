import { GameLoop } from './game/loop/GameLoop';
import { InputSystem } from './game/systems/InputSystem/InputSystem';
import { MovementSystem } from './game/systems/MovementSystem';
import { DisconnectCheckSystem } from './game/systems/DisconnectCheckSystem';
import { PlayerJoinedEffectRenderer } from './render/effects/PlayerJoinedEffectRenderer';
import { PlayerReadyEffectRenderer } from './render/effects/PlayerReadyEffectRenderer';
import { UIRenderer } from './render/gameState/ui/UIRenderer';
import { WorldRenderer } from './render/gameState/world/WorldRenderer';
import { ControllerTestBackgroundRenderer } from './render/gameState/world/ControllerTestBackgroundRenderer';
import { ControllerTestPlayerRenderer } from './render/gameState/world/ControllerTestPlayerRenderer';
import { StartMenuSoundPlayer } from './soundPlayers/StartMenuSoundPlayer';
import { ControlMovementTestSystem } from './game/systems/controllerTestScreen/ControlTestMovementSystem';

const canvas = document.getElementById('game') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

function resizeCanvasToViewport() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvasToViewport();
window.addEventListener('resize', resizeCanvasToViewport);

const renderers = [
    new ControllerTestBackgroundRenderer(ctx),
    new ControllerTestPlayerRenderer(ctx),
    new WorldRenderer(ctx),
    new UIRenderer(ctx)
];

const effectRenderers = [
    new PlayerJoinedEffectRenderer(ctx),
    new PlayerReadyEffectRenderer(ctx),
];

const soundPlayers = [
    new StartMenuSoundPlayer(),
];

const systems = [
    new DisconnectCheckSystem(),
    new InputSystem(),
    new ControlMovementTestSystem(),
    new MovementSystem(),
]
const loop = new GameLoop(systems, renderers, effectRenderers, soundPlayers);

loop.start();
