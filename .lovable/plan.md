

# N-Body Gravitational Simulator - Implementation Plan

## Pages & Components

### 1. Simulator Page (`/`)
- Full-screen layout: collapsible control panel (left) + canvas (right)
- Dark space theme background

### 2. Simulation Engine (`src/lib/simulation.ts`)
- Body type: id, mass, position(x,y), velocity(x,y), color, trail[]
- Velocity Verlet integration per frame
- Gravitational force calculation (all pairs)
- Collision detection with merge option
- Configurable gravitational constant G

### 3. Canvas Renderer (`src/components/SimulationCanvas.tsx`)
- HTML5 Canvas with requestAnimationFrame
- Draw bodies as glowing circles (size ∝ mass)
- Orbit trails with gradient fade
- Zoom (mouse wheel) & pan (drag) controls
- Body labels

### 4. Control Panel (`src/components/ControlPanel.tsx`)
- **Global controls**: Play/Pause, Reset, Time speed slider, G constant slider
- **Body list** (scrollable): Each body shows editable mass, velocity (vx, vy), position (x, y), color picker, remove button
- **Add Body** button at bottom
- Body count & elapsed time stats
- All changes apply in real-time

### 5. Preset Configurations
- 3-body default, figure-8 orbit, solar system, binary star
- Dropdown selector in control panel

## Technical Approach
- All state managed with React useState/useRef
- Canvas rendering via useEffect + requestAnimationFrame loop
- Simulation runs in the animation frame callback
- Control panel updates state refs for real-time responsiveness

