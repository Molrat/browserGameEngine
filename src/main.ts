import { GameLoop } from './game/loop/GameLoop';
import { InputSystem } from './game/systems/InputSystem/InputSystem';
import { MovementSystem } from './game/systems/MovementSystem';
import { DisconnectCheckSystem } from './game/systems/DisconnectCheckSystem';
import { AnimationRenderer } from './render/animations/AnimationRenderer';
import { UIRenderer } from './render/ui/UIRenderer';
import { WorldRenderer } from './render/world/WorldRenderer';

const canvas = document.getElementById('game') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const renderers = [
    new WorldRenderer(ctx), 
    new AnimationRenderer(ctx),
    new UIRenderer(ctx)
];

const systems = [
    new DisconnectCheckSystem(),
    new InputSystem(),
    new MovementSystem(),
]
const loop = new GameLoop(systems, renderers);

loop.start();
