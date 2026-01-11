# Copilot Instructions for TypeScript ECS-Style Game

## 1. Core Principles

### Data-Oriented / Functional Style
- GameState is plain type objects only, mutable in place.
- Systems are classes that read & update GameState deterministically.
- Events are side effects only (sound, visuals, UI); they never mutate game state.
- InputSystems are the exception, controls are captured from IO into the state.

### Separation of Concerns
- GameState: everything about the world, including entities, previous and current input, and logical UI state.
- Systems: deterministic rules that update slices of state. Systems filter with queries the needed entities for their logic, based on interfaces. The actual logic of each system is then in system private functions that have those interfaces as inputs.
- Queries: runtime type guards to filter entities by interface, to serve the systems logic.
- Ony filtering with queries is allowed based on interfaces!
- Events: trigger non-essential side effects.
- Renderer: reads GameState to draw visuals, never mutates state.
- 

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
│  ├─ gameState/      # Rendering based on GameState
│  │  ├─ world/          # world and entity rendering
│  │  ├─ ui/             # UI rendering (HUD, menus)
│  ├─ effects/        # Event-driven visual effects / animations
├─ soundPlayers/      # Event-driven sound playback systems
├─ math/              # Vector math, collision functions
├─ assets/            # Sprites, sounds, other assets
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
- Each system inherits ISystem with the update(state: GameState, event dt: number) method!
- Systems read and mutate GameState only.
- Systems first use queries to filter entities.
- Then private methods handle the core logic with a restricted input of the   queried interfaces.
- Break systems as much as possible into smaller systems for single responsibility.

## 8. Rendering Architecture (Canvas / ctx)

Rendering Overview
- Rendering is completely separated from gameplay logic.
- Rendering is a pure projection of state, not a source of truth.
- All rendering is done using HTML Canvas 2D context (CanvasRenderingContext2D).
- Engine uses geometric rendering only.
- No rendering code may mutate GameState.

Rendering Layers
- World Rendering (gamestate based)
  - Entities composed of Renderable are drawn here.
  - Renderable has properties: shape, color, orientation, size.
  - Shapes: rectangles, circles, triangles, polygons.
- UI Rendering (gamestate based)
  - HUD and menus are drawn here.
  - Part of GameState: UIState (logical only) with isMenuOpen, currentMenu, etc.
  - Renderer reads UIState to display correct menus / HUD.
- Effects Rendering (event driven)
  - Particle effects, screen shake, fade-in/out, hit flashes, etc.
  - Purely visual, do not affect game logic.
  - Effects are type data stored in EffectsState inside the render/effects/ folder, not part of GameState.

## 9. Game Loop Flow

GameState → Systems (or which special IO input systems) → new GameState and EventBus → Render GameState -> Process Events (sound/effects)

- Systems use queries to select entities.
- EventBus triggers side effects only.
- gameState renders reads GameState + UIState to display.

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
- Input = special Systems that alter gamestate from IO.
- GameState Render = renders game state only.
- Effects Render = event-driven visuals only.
- soundplayers = event-driven sound only.
- Tests = focus on deterministic systems.

## 12. Coding Standards
- NEVER loose functions not in a class.
- NEVER multiple classes in one file.
- NEVER multiple types/interfaces in one file.
- Never use any type!
- New code preferably split in new files!
- Files preferably under 100 lines; max 200 lines.
- Functions under 30 lines.
- If files/functions are too long, break into smaller, cohesive units.
- Validate cohesion of properties/functions; split if needed.
- Test for build errors and type safety, and fix the problems.
- Use descriptive names for types, interfaces, classes, functions, and variables.
- Follow consistent formatting and indentation.
- Keep functions pure where possible; avoid side effects in logic functions.
