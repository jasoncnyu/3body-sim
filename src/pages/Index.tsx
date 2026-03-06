import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Body, step, getPreset, addNewBody, initAccelerations, setTrailLength } from '@/lib/simulation';
import SimulationCanvas from '@/components/SimulationCanvas';
import ControlPanel from '@/components/ControlPanel';

const Index = () => {
  const [preset, setPreset] = useState('three-body');
  const [isPaused, setIsPaused] = useState(false);
  const [timeSpeed, setTimeSpeed] = useState(1);
  const [gConstant, setGConstant] = useState(5);
  const [collapsed, setCollapsed] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [bodiesSnapshot, setBodiesSnapshot] = useState<Body[]>(() => getPreset('three-body'));

  const bodiesRef = useRef<Body[]>(getPreset('three-body'));
  const timeSpeedRef = useRef(1);
  const gConstantRef = useRef(5);

  useEffect(() => { timeSpeedRef.current = timeSpeed; }, [timeSpeed]);
  useEffect(() => { gConstantRef.current = gConstant; }, [gConstant]);

  // Init accelerations on first load
  useEffect(() => {
    initAccelerations(bodiesRef.current, gConstantRef.current);
  }, []);

  const stepFn = useCallback(() => {
    const dt = timeSpeedRef.current * 0.5;
    const substeps = 4;
    for (let i = 0; i < substeps; i++) {
      bodiesRef.current = step(bodiesRef.current, dt / substeps, gConstantRef.current);
    }
    setElapsedTime((t) => t + dt * 0.016);
    // Sync snapshot every 10 frames for control panel
    setBodiesSnapshot([...bodiesRef.current]);
  }, []);

  const handleReset = useCallback(() => {
    const bodies = getPreset(preset);
    initAccelerations(bodies, gConstantRef.current);
    bodiesRef.current = bodies;
    setBodiesSnapshot([...bodies]);
    setElapsedTime(0);
  }, [preset]);

  const handlePresetChange = useCallback((p: string) => {
    setPreset(p);
    const bodies = getPreset(p);
    initAccelerations(bodies, gConstantRef.current);
    bodiesRef.current = bodies;
    setBodiesSnapshot([...bodies]);
    setElapsedTime(0);
  }, []);

  const handleBodyChange = useCallback((id: string, field: string, value: number) => {
    const body = bodiesRef.current.find((b) => b.id === id);
    if (body) {
      (body as any)[field] = value;
      setBodiesSnapshot([...bodiesRef.current]);
    }
  }, []);

  const handleBodyColorChange = useCallback((id: string, color: string) => {
    const body = bodiesRef.current.find((b) => b.id === id);
    if (body) {
      body.color = color;
      setBodiesSnapshot([...bodiesRef.current]);
    }
  }, []);

  const handleRemoveBody = useCallback((id: string) => {
    bodiesRef.current = bodiesRef.current.filter((b) => b.id !== id);
    setBodiesSnapshot([...bodiesRef.current]);
  }, []);

  const handleAddBody = useCallback(() => {
    const newBody = addNewBody(bodiesRef.current);
    bodiesRef.current.push(newBody);
    initAccelerations(bodiesRef.current, gConstantRef.current);
    setBodiesSnapshot([...bodiesRef.current]);
  }, []);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#050510]">
      <ControlPanel
        bodies={bodiesSnapshot}
        isPaused={isPaused}
        timeSpeed={timeSpeed}
        gConstant={gConstant}
        preset={preset}
        collapsed={collapsed}
        elapsedTime={elapsedTime}
        onTogglePause={() => setIsPaused((p) => !p)}
        onReset={handleReset}
        onTimeSpeedChange={setTimeSpeed}
        onGConstantChange={setGConstant}
        onPresetChange={handlePresetChange}
        onBodyChange={handleBodyChange}
        onBodyColorChange={handleBodyColorChange}
        onRemoveBody={handleRemoveBody}
        onAddBody={handleAddBody}
        onToggleCollapse={() => setCollapsed((c) => !c)}
      />
      <div className="flex-1 relative">
        <SimulationCanvas bodiesRef={bodiesRef} isPaused={isPaused} stepFn={stepFn} />
      </div>
    </div>
  );
};

export default Index;
