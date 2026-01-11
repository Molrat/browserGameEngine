# Copilot Instructions for TypeScript ECS-Style Game

## 1. Core Principles

### Data-Oriented / Functional Style
- GameState is plain type objects only, mutable in place.
- Systems are classes that read & update GameState deterministically.
- Events are side effects only (sound, visuals, UI); they never mutate game state.
- Input is captured in InputState from adapters and copied deterministically each frame.

### Separation of Concerns
- GameState: everything about the world, including entities, previous and current input, and logical UI state.
- Systems: deterministic rules that update slices of state.
- Events: trigger non-essential side effects.
- Input Adapters: boundary layer for external input.
- Renderer: reads GameState to draw visuals, never mutates state.

### Deterministic Simulation
- Game logic depends only on GameState and InputState.
- Systems never read DOM or external events directly.

## 2. Type / Interface / Class Guidelines

Concept | Use | Rules
--- | --- | ---
type | GameState, entities, components | Plain data only, serializable, use intersections (&) for composition. Example: type Player = Movable & Damageable & { damage: number }
interface | System contracts / capabilities | Compile-time type safety in system inputs. Example: interface IMovable { position: Vector2; velocity: Vector2 }
class | Systems / controllers | Wrap behavior, mutate state. Example: class MovementSystem { update(state: GameState, dt: number) {} }

Rules:
- Entities should never be classes with methods.
- Interfaces = compile-time contracts.
- Types = actual entity/component data.
- Queries / type guards = runtime checks.
- Classes = behavior containers (systems).

## 3. Folder Structure

src/
├─ game/
│  ├─ state/          # Pure data: entities & components
│  │  ├─ GameState.ts
│  │  ├─ Entity.ts
│  │  ├─ components/  # Movable.ts, Damageable.ts, Renderable.ts
│  │  └─ entities/    # Player.ts, Enemy.ts, Projectile.ts
│  ├─ systems/        # Game logic systems
│  ├─ queries/        # Runtime type guards (e.g., IMovable)
│  ├─ loop/           # Game loop orchestration
│  ├─ events/         # Side-effect events
│  └─ config/         # Constants, balance
├─ input/             # Input buffer / adapters
├─ render/            # Renderer
│  ├─ world/          # world and entity rendering
│  ├─ ui/             # UI rendering (HUD, menus)
│  ├─ animations/     # Visual effects / animations
├─ math/              # Vector math, collision functions
├─ assets/            # Sprites, other assets
├─ utils/             # Utility functions, id generators, RNG
└─ main.ts

Tests folder mirrors game/systems for clarity.
Queries are separate from systems for runtime filtering.
Input adapters live outside GameState.

## 4. Input Handling

- Input captured in inputBuffer in adapters (KeyboardAdapter / GamepadAdapter).
- InputSystem copies buffer into GameState.input each frame.
- Systems read only GameState.input (no DOM access).
- InputState is deterministic and replayable.

## 5. Events / Side Effects

- Only for sound, particles, camera shake, UI.
- Systems emit events after state changes via EventBus.
- Events never mutate GameState.
- Ensures deterministic core logic.

## 6. Queries / Type Guards

- Each query has its own subfolder under game/queries with an interface file and a query file.
- Interfaces (e.g., IMovable) define compile-time contracts.
- Queries (e.g., isMovable) check runtime entity composition.

Example:

function isMovable(e: Entity): e is Entity & IMovable {
  return 'position' in e && 'velocity' in e;
}

- Systems use queries to filter entities safely. The core logic of the system only acts on the filtered entities that conform to the expected interface(s).

## 7. Systems
- Each system is a class with an update(state: GameState, event dt: number) method.
- Systems read and mutate GameState only.
- Systems use queries to filter entities.
- The logic of each system take interfaces as input, never raw entities!
- Break systems as much as possible into smaller systems for single responsibility.

## 8. Rendering Architecture (Canvas / ctx)

Rendering Overview
- Rendering is completely separated from gameplay logic.
- Rendering is a pure projection of state, not a source of truth.
- All rendering is done using HTML Canvas 2D context (CanvasRenderingContext2D).
- Engine uses geometric rendering only.
- No rendering code may mutate GameState.

Rendering Layers
- World Rendering
  - Entities composed of Renderable are drawn here.
  - Renderable has properties: shape, color, orientation, size.
  - Shapes: rectangles, circles, triangles, polygons.
- UI Rendering
  - HUD and menus are drawn here.
  - Part of GameState: UIState (logical only) with isMenuOpen, currentMenu, etc.
  - Renderer reads UIState to display correct menus / HUD.
- Animation & Visual Effects Rendering
  - Particle effects, screen shake, fade-in/out, hit flashes, etc.
  - Purely visual, do not affect game logic.
  - Animations are type data stored in AnimationState inside the render/animations/ folder, not part of GameState.

## 9. Game Loop Flow

Input Adapter → Input System → GameState → Systems → EventBus → RenderSystem

- Systems use queries to select entities.
- EventBus triggers side effects only.
- RenderSystem reads GameState + UIState to display.

## 1. Testing Guidelines

- Unit tests: Each system independently using mocked GameState.
- Input tests: Mock InputState.
- Event tests: Spy/mocked EventBus.
- Queries tests: Ensure type guards filter entities correctly.
- Use Vitest for speed, TypeScript support, and isolated testing.
- Tests are pure: no DOM or canvas required for system logic.

## 11. Key Takeaways

- State = truth, plain data.
- Systems = deterministic rules.
- Interfaces = contracts.
- Queries = runtime type guards.
- Events = side effects.
- Input = edge state, copied into GameState.
- Render = pure consumer.
- Tests = focus on deterministic systems.
- AI prompts = short and descriptive, rely on this instruction file for rules.

## 12. Coding Standards
- NEVER loose functions not in a class.
- NEVER multiple classes in one file.
- NEVER multiple types/interfaces in one file.
- Files preferably under 100 lines; max 200 lines.
- Functions under 30 lines.
- If files/functions are too long, break into smaller, cohesive units.
- Validate cohesion of properties/functions; split if needed.
- Never use any.
- Test for build errors and type safety, and fix the problems.
- Use descriptive names for types, interfaces, classes, functions, and variables.
- Follow consistent formatting and indentation.
- Add comments for complex logic or non-obvious decisions.
- Keep functions pure where possible; avoid side effects in logic functions.
