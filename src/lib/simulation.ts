export interface Body {
  id: string;
  mass: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
  color: string;
  trail: { x: number; y: number }[];
  label: string;
}

const TRAIL_LENGTH = 200;
const SOFTENING = 5;

export function createBody(
  id: string,
  mass: number,
  x: number,
  y: number,
  vx: number,
  vy: number,
  color: string,
  label: string
): Body {
  return { id, mass, x, y, vx, vy, ax: 0, ay: 0, color, trail: [], label };
}

function computeAccelerations(bodies: Body[], G: number) {
  for (const b of bodies) {
    b.ax = 0;
    b.ay = 0;
  }
  for (let i = 0; i < bodies.length; i++) {
    for (let j = i + 1; j < bodies.length; j++) {
      const a = bodies[i];
      const b = bodies[j];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const distSq = dx * dx + dy * dy + SOFTENING * SOFTENING;
      const dist = Math.sqrt(distSq);
      const force = G * a.mass * b.mass / distSq;
      const fx = force * dx / dist;
      const fy = force * dy / dist;
      a.ax += fx / a.mass;
      a.ay += fy / a.mass;
      b.ax -= fx / b.mass;
      b.ay -= fy / b.mass;
    }
  }
}

export function step(bodies: Body[], dt: number, G: number): Body[] {
  // Velocity Verlet
  // Half-step velocity
  for (const b of bodies) {
    b.vx += 0.5 * b.ax * dt;
    b.vy += 0.5 * b.ay * dt;
  }
  // Full-step position
  for (const b of bodies) {
    b.x += b.vx * dt;
    b.y += b.vy * dt;
  }
  // Recompute accelerations
  computeAccelerations(bodies, G);
  // Half-step velocity again
  for (const b of bodies) {
    b.vx += 0.5 * b.ax * dt;
    b.vy += 0.5 * b.ay * dt;
  }
  // Update trails
  for (const b of bodies) {
    b.trail.push({ x: b.x, y: b.y });
    if (b.trail.length > TRAIL_LENGTH) {
      b.trail.shift();
    }
  }
  return bodies;
}

export function bodyRadius(mass: number): number {
  return Math.max(3, Math.cbrt(mass) * 2);
}

export function initAccelerations(bodies: Body[], G: number) {
  computeAccelerations(bodies, G);
}

// Preset configurations
const BODY_COLORS = [
  'hsl(200, 90%, 60%)',
  'hsl(340, 85%, 60%)',
  'hsl(50, 95%, 65%)',
  'hsl(130, 70%, 55%)',
  'hsl(270, 80%, 65%)',
  'hsl(20, 90%, 60%)',
];

let idCounter = 0;
function nextId() {
  return `body-${++idCounter}`;
}

export function resetIdCounter() {
  idCounter = 0;
}

export function getPreset(name: string): Body[] {
  resetIdCounter();
  switch (name) {
    case 'three-body':
      return [
        createBody(nextId(), 200, 0, -100, 0.5, 0, BODY_COLORS[0], 'A'),
        createBody(nextId(), 200, 87, 50, -0.25, 0.43, BODY_COLORS[1], 'B'),
        createBody(nextId(), 200, -87, 50, -0.25, -0.43, BODY_COLORS[2], 'C'),
      ];
    case 'figure-8': {
      const v = 0.347111;
      const p = 0.97000436;
      const scale = 200;
      return [
        createBody(nextId(), 100, -p * scale, 0, 0, -v * 2, BODY_COLORS[0], 'A'),
        createBody(nextId(), 100, p * scale, 0, 0, v * 2, BODY_COLORS[1], 'B'),
        createBody(nextId(), 100, 0, 0, 0, 0, BODY_COLORS[2], 'C'),
      ];
    }
    case 'solar-system':
      return [
        createBody(nextId(), 1000, 0, 0, 0, 0, BODY_COLORS[2], 'Sun'),
        createBody(nextId(), 10, 150, 0, 0, 2.5, BODY_COLORS[0], 'P1'),
        createBody(nextId(), 20, -250, 0, 0, -2, BODY_COLORS[1], 'P2'),
        createBody(nextId(), 5, 0, 350, -1.6, 0, BODY_COLORS[3], 'P3'),
      ];
    case 'binary-star':
      return [
        createBody(nextId(), 500, -80, 0, 0, 1.2, BODY_COLORS[2], 'Star A'),
        createBody(nextId(), 500, 80, 0, 0, -1.2, BODY_COLORS[1], 'Star B'),
        createBody(nextId(), 5, 300, 0, 0, -2.2, BODY_COLORS[0], 'Planet'),
      ];
    default:
      return getPreset('three-body');
  }
}

export function addNewBody(bodies: Body[]): Body {
  const angle = Math.random() * Math.PI * 2;
  const dist = 150 + Math.random() * 100;
  const colorIndex = bodies.length % BODY_COLORS.length;
  const label = String.fromCharCode(65 + (bodies.length % 26));
  return createBody(
    nextId(),
    50 + Math.random() * 150,
    Math.cos(angle) * dist,
    Math.sin(angle) * dist,
    (Math.random() - 0.5) * 2,
    (Math.random() - 0.5) * 2,
    BODY_COLORS[colorIndex],
    label
  );
}
