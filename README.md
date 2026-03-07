# N-Body Playground

Interactive N-body gravity sandbox built with React + TypeScript + Vite.

## Features

- Real-time Newtonian gravity simulation (2D) with Velocity Verlet integration
- Presets: Three Body, Figure-8, Solar System, Binary Star, L4/L5 Trojan, Hierarchical Triple
- Adjustable controls for time speed, gravity constant, trail length, and per-body values
- Educational guide panel with preset-specific explanations
- Responsive desktop/mobile UI
- Multi-language support (URL-prefixed locales, dictionary-based strings)

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Lucide icons
- Vitest

## Quick Start

```bash
npm install
npm run dev
npm run build
```

## Notes

- This is a learning/visualization simulator, not a high-precision astrophysics engine.
- Long trail settings can increase rendering cost.

## Project Structure

```txt
src/
  components/
    ControlPanel.tsx
    EducationPanel.tsx
    SimulationCanvas.tsx
  lib/
    simulation.ts
    i18n.ts
  pages/
    Index.tsx
```

[Listed on LeanVibe](https://leanvibe.io/vibe/n-body-playground-mmgy4aly)
