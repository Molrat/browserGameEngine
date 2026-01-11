import { GameLoop } from './game/loop/GameLoop';
import { InputSystem } from './game/systems/InputSystem/InputSystem';
import { MovementSystem } from './game/systems/MovementSystem';
import { DisconnectCheckSystem } from './game/systems/DisconnectCheckSystem';
import { PlayerJoinedEffectRenderer } from './render/effects/PlayerJoinedEffectRenderer';
import { PlayerReadyEffectRenderer } from './render/effects/PlayerReadyEffectRenderer';
import { UIRenderer } from './render/ui/UIRenderer';
import { WorldRenderer } from './render/world/WorldRenderer';

const canvas = document.getElementById('game') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const renderers = [
    new WorldRenderer(ctx), 
    new UIRenderer(ctx)
];

const effectRenderers = [
    new PlayerJoinedEffectRenderer(ctx),
    new PlayerReadyEffectRenderer(ctx),
];

const systems = [
    new DisconnectCheckSystem(),
    new InputSystem(),
    new MovementSystem(),
]
const loop = new GameLoop(systems, renderers, effectRenderers);

loop.start();
