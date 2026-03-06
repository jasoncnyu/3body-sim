import React from 'react';
import { Body } from '@/lib/simulation';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Pause, RotateCcw, Plus, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  bodies: Body[];
  isPaused: boolean;
  timeSpeed: number;
  gConstant: number;
  preset: string;
  collapsed: boolean;
  trailLength: number;
  onTogglePause: () => void;
  onReset: () => void;
  onTimeSpeedChange: (v: number) => void;
  onGConstantChange: (v: number) => void;
  onPresetChange: (v: string) => void;
  onTrailLengthChange: (v: number) => void;
  onBodyChange: (id: string, field: string, value: number) => void;
  onBodyColorChange: (id: string, color: string) => void;
  onRemoveBody: (id: string) => void;
  onAddBody: () => void;
  onToggleCollapse: () => void;
  elapsedTime: number;
}

const ControlPanel: React.FC<Props> = ({
  bodies, isPaused, timeSpeed, gConstant, preset, collapsed, trailLength,
  onTogglePause, onReset, onTimeSpeedChange, onGConstantChange,
  onPresetChange, onTrailLengthChange, onBodyChange, onBodyColorChange, onRemoveBody,
  onAddBody, onToggleCollapse, elapsedTime,
}) => {
  if (collapsed) {
    return (
      <div className="h-full flex flex-col items-center py-4 bg-[#0a0a1a] border-r border-[#1a1a3a] w-12">
        <Button variant="ghost" size="icon" onClick={onToggleCollapse} className="text-muted-foreground hover:text-foreground">
          <ChevronRight className="h-4 w-4" />
        </Button>
        <div className="mt-4 flex flex-col gap-2">
          <Button variant="ghost" size="icon" onClick={onTogglePause} className="text-muted-foreground hover:text-foreground">
            {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={onReset} className="text-muted-foreground hover:text-foreground">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-[#0a0a1a] border-r border-[#1a1a3a] w-80">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#1a1a3a]">
        <h2 className="text-sm font-bold tracking-wider uppercase text-[hsl(200,90%,70%)]">N-Body Sim</h2>
        <Button variant="ghost" size="icon" onClick={onToggleCollapse} className="text-muted-foreground hover:text-foreground">
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>

      {/* Stats */}
      <div className="px-4 py-2 flex gap-4 text-xs text-muted-foreground border-b border-[#1a1a3a]">
        <span>Bodies: <strong className="text-foreground">{bodies.length}</strong></span>
        <span>Time: <strong className="text-foreground">{elapsedTime.toFixed(1)}s</strong></span>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-5">
          {/* Global Controls */}
          <div className="space-y-3">
            <div className="flex gap-2">
              <Button size="sm" variant={isPaused ? 'default' : 'secondary'} onClick={onTogglePause} className="flex-1 gap-1">
                {isPaused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
                {isPaused ? 'Play' : 'Pause'}
              </Button>
              <Button size="sm" variant="outline" onClick={onReset} className="gap-1">
                <RotateCcw className="h-3 w-3" /> Reset
              </Button>
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">Preset</Label>
              <Select value={preset} onValueChange={onPresetChange}>
                <SelectTrigger className="h-8 mt-1 bg-[#0f0f25] border-[#1a1a3a]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="three-body">Three Body</SelectItem>
                  <SelectItem value="figure-8">Figure-8</SelectItem>
                  <SelectItem value="solar-system">Solar System</SelectItem>
                  <SelectItem value="binary-star">Binary Star</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">Time Speed: {timeSpeed.toFixed(1)}x</Label>
              <Slider
                value={[timeSpeed]}
                onValueChange={([v]) => onTimeSpeedChange(v)}
                min={0.1} max={5} step={0.1}
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">G Constant: {gConstant.toFixed(1)}</Label>
              <Slider
                value={[gConstant]}
                onValueChange={([v]) => onGConstantChange(v)}
                min={0.1} max={20} step={0.1}
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">Trail Length: {trailLength}</Label>
              <Slider
                value={[trailLength]}
                onValueChange={([v]) => onTrailLengthChange(v)}
                min={0} max={500} step={10}
                className="mt-1"
              />
            </div>
          </div>

          {/* Body List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Bodies</Label>
              <Button size="sm" variant="ghost" onClick={onAddBody} className="h-7 gap-1 text-xs text-[hsl(200,90%,70%)]">
                <Plus className="h-3 w-3" /> Add
              </Button>
            </div>

            {bodies.map((body) => (
              <div key={body.id} className="rounded-lg border border-[#1a1a3a] bg-[#0f0f25] p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={hslToHex(body.color)}
                      onChange={(e) => onBodyColorChange(body.id, e.target.value)}
                      className="w-5 h-5 rounded border-0 cursor-pointer bg-transparent"
                    />
                    <span className="text-xs font-medium">{body.label}</span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive hover:text-destructive" onClick={() => onRemoveBody(body.id)}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-1.5">
                  <FieldInput label="Mass" value={body.mass} onChange={(v) => onBodyChange(body.id, 'mass', v)} />
                  <FieldInput label="X" value={body.x} onChange={(v) => onBodyChange(body.id, 'x', v)} />
                  <FieldInput label="Y" value={body.y} onChange={(v) => onBodyChange(body.id, 'y', v)} />
                  <FieldInput label="Vx" value={body.vx} onChange={(v) => onBodyChange(body.id, 'vx', v)} step={0.1} />
                  <FieldInput label="Vy" value={body.vy} onChange={(v) => onBodyChange(body.id, 'vy', v)} step={0.1} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

function FieldInput({ label, value, onChange, step = 1 }: {
  label: string; value: number; onChange: (v: number) => void; step?: number;
}) {
  return (
    <div>
      <Label className="text-[10px] text-muted-foreground">{label}</Label>
      <Input
        type="number"
        value={Math.round(value * 100) / 100}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        step={step}
        className="h-7 text-xs bg-[#0a0a1a] border-[#1a1a3a] px-1.5"
      />
    </div>
  );
}

function hslToHex(hsl: string): string {
  const match = hsl.match(/hsl\((\d+),?\s*(\d+)%,?\s*(\d+)%/);
  if (!match) return '#4488ff';
  const h = parseInt(match[1]) / 360;
  const s = parseInt(match[2]) / 100;
  const l = parseInt(match[3]) / 100;
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1; if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const r = Math.round(hue2rgb(p, q, h + 1/3) * 255);
  const g = Math.round(hue2rgb(p, q, h) * 255);
  const b = Math.round(hue2rgb(p, q, h - 1/3) * 255);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export default ControlPanel;
