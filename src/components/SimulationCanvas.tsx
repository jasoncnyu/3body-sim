import React, { useRef, useEffect, useCallback } from 'react';
import { Body, bodyRadius } from '@/lib/simulation';

interface Props {
  bodiesRef: React.MutableRefObject<Body[]>;
  isPaused: boolean;
  stepFn: () => void;
}

const SimulationCanvas: React.FC<Props> = ({ bodiesRef, isPaused, stepFn }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const panRef = useRef({ x: 0, y: 0 });
  const zoomRef = useRef(1);
  const dragRef = useRef<{ dragging: boolean; lastX: number; lastY: number }>({
    dragging: false, lastX: 0, lastY: 0,
  });

  const draw = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    ctx.fillStyle = '#050510';
    ctx.fillRect(0, 0, w, h);

    // Draw stars background
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    const seed = 42;
    for (let i = 0; i < 120; i++) {
      const sx = ((seed * (i + 1) * 7919) % w);
      const sy = ((seed * (i + 1) * 6271) % h);
      ctx.fillRect(sx, sy, 1, 1);
    }

    ctx.save();
    ctx.translate(w / 2 + panRef.current.x, h / 2 + panRef.current.y);
    ctx.scale(zoomRef.current, zoomRef.current);

    const bodies = bodiesRef.current;

    // Draw trails
    for (const body of bodies) {
      if (body.trail.length < 2) continue;
      for (let i = 1; i < body.trail.length; i++) {
        const alpha = i / body.trail.length * 0.6;
        ctx.strokeStyle = body.color.replace(')', ` / ${alpha})`).replace('hsl(', 'hsl(');
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(body.trail[i - 1].x, body.trail[i - 1].y);
        ctx.lineTo(body.trail[i].x, body.trail[i].y);
        ctx.stroke();
      }
    }

    // Draw bodies
    for (const body of bodies) {
      const r = bodyRadius(body.mass);

      // Glow
      const gradient = ctx.createRadialGradient(body.x, body.y, 0, body.x, body.y, r * 4);
      gradient.addColorStop(0, body.color.replace(')', ' / 0.4)'));
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(body.x, body.y, r * 4, 0, Math.PI * 2);
      ctx.fill();

      // Body
      ctx.fillStyle = body.color;
      ctx.beginPath();
      ctx.arc(body.x, body.y, r, 0, Math.PI * 2);
      ctx.fill();

      // Label
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.font = '11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(body.label, body.x, body.y - r - 6);
    }

    ctx.restore();
  }, [bodiesRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const loop = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * devicePixelRatio;
      canvas.height = rect.height * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);

      if (!isPaused) {
        stepFn();
      }
      draw(ctx, rect.width, rect.height);
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isPaused, stepFn, draw]);

  // Zoom
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const factor = e.deltaY > 0 ? 0.9 : 1.1;
      zoomRef.current = Math.max(0.1, Math.min(10, zoomRef.current * factor));
    };
    canvas.addEventListener('wheel', onWheel, { passive: false });
    return () => canvas.removeEventListener('wheel', onWheel);
  }, []);

  // Pan
  const onMouseDown = (e: React.MouseEvent) => {
    dragRef.current = { dragging: true, lastX: e.clientX, lastY: e.clientY };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragRef.current.dragging) return;
    panRef.current.x += e.clientX - dragRef.current.lastX;
    panRef.current.y += e.clientY - dragRef.current.lastY;
    dragRef.current.lastX = e.clientX;
    dragRef.current.lastY = e.clientY;
  };
  const onMouseUp = () => {
    dragRef.current.dragging = false;
  };

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full cursor-grab active:cursor-grabbing"
      style={{ display: 'block' }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    />
  );
};

export default SimulationCanvas;
