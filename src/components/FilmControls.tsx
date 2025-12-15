import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { ChevronDown } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FilmControlsProps {
  bloom: number;
  halation: number;
  grain: number;
  onBloomChange: (value: number) => void;
  onHalationChange: (value: number) => void;
  onGrainChange: (value: number) => void;
  halationThreshold?: number;
  halationBlur?: number;
  bloomThreshold?: number;
  bloomBlur?: number;
  bloomBlendMode?: string;
  grainSize?: number;
  grainDistribution?: number;
  filmStock?: string;
  vignette?: number;
  contrast?: number;
  shadows?: number;
  highlights?: number;
  saturation?: number;
  vibrance?: number;
  sharpness?: number;
  softness?: number;
  temperature?: number;
  showMask?: string;
  onHalationThresholdChange?: (value: number) => void;
  onFilmStockChange?: (value: string) => void;
  onVignetteChange?: (value: number) => void;
  onContrastChange?: (value: number) => void;
  onShadowsChange?: (value: number) => void;
  onHighlightsChange?: (value: number) => void;
  onSaturationChange?: (value: number) => void;
  onVibranceChange?: (value: number) => void;
  onSharpnessChange?: (value: number) => void;
  onSoftnessChange?: (value: number) => void;
  onTemperatureChange?: (value: number) => void;
  onHalationBlurChange?: (value: number) => void;
  onBloomThresholdChange?: (value: number) => void;
  onBloomBlurChange?: (value: number) => void;
  onBloomBlendModeChange?: (value: string) => void;
  onGrainSizeChange?: (value: number) => void;
  onGrainDistributionChange?: (value: number) => void;
  onShowMaskChange?: (value: string) => void;
}

export const FilmControls = ({
  bloom,
  halation,
  grain,
  onBloomChange,
  onHalationChange,
  onGrainChange,
  halationThreshold = 180,
  halationBlur = 50,
  bloomThreshold = 180,
  bloomBlur = 50,
  bloomBlendMode = 'screen',
  grainSize = 1,
  grainDistribution = 50,
  filmStock = 'none',
  vignette = 0,
  contrast = 0,
  shadows = 0,
  highlights = 0,
  saturation = 0,
  vibrance = 0,
  sharpness = 0,
  softness = 0,
  temperature = 0,
  showMask = 'none',
  onHalationThresholdChange,
  onFilmStockChange,
  onVignetteChange,
  onContrastChange,
  onShadowsChange,
  onHighlightsChange,
  onSaturationChange,
  onVibranceChange,
  onSharpnessChange,
  onSoftnessChange,
  onTemperatureChange,
  onHalationBlurChange,
  onBloomThresholdChange,
  onBloomBlurChange,
  onBloomBlendModeChange,
  onGrainSizeChange,
  onGrainDistributionChange,
  onShowMaskChange,
}: FilmControlsProps) => {
  const [expandedHalation, setExpandedHalation] = useState(false);
  const [expandedBloom, setExpandedBloom] = useState(false);
  const [expandedGrain, setExpandedGrain] = useState(false);
  const [expandedBasic, setExpandedBasic] = useState(false);

  return (
    <div className="space-y-8 p-6 bg-card rounded-lg border border-border">
      <div className="space-y-3">
        <button 
          onClick={() => setExpandedBasic(!expandedBasic)} 
          className="flex items-center justify-between w-full text-left"
        >
          <h4 className="text-sm font-semibold">Basic Adjustments</h4>
          <ChevronDown className={`w-4 h-4 transition-transform ${expandedBasic ? 'rotate-180' : ''}`} />
        </button>
        {expandedBasic && (
        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="text-xs">Temperature</Label>
              <span className="text-xs font-mono">{temperature}</span>
            </div>
            <Slider min={-100} max={100} step={1} value={[temperature]} onValueChange={([v]) => onTemperatureChange?.(v)} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="text-xs">Contrast</Label>
              <span className="text-xs font-mono">{contrast}</span>
            </div>
            <Slider min={-100} max={100} step={1} value={[contrast]} onValueChange={([v]) => onContrastChange?.(v)} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="text-xs">Shadows</Label>
              <span className="text-xs font-mono">{shadows}</span>
            </div>
            <Slider min={-100} max={100} step={1} value={[shadows]} onValueChange={([v]) => onShadowsChange?.(v)} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="text-xs">Highlights</Label>
              <span className="text-xs font-mono">{highlights}</span>
            </div>
            <Slider min={-100} max={100} step={1} value={[highlights]} onValueChange={([v]) => onHighlightsChange?.(v)} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="text-xs">Saturation</Label>
              <span className="text-xs font-mono">{saturation}</span>
            </div>
            <Slider min={-100} max={100} step={1} value={[saturation]} onValueChange={([v]) => onSaturationChange?.(v)} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="text-xs">Vibrance</Label>
              <span className="text-xs font-mono">{vibrance}</span>
            </div>
            <Slider min={-100} max={100} step={1} value={[vibrance]} onValueChange={([v]) => onVibranceChange?.(v)} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="text-xs">Vignette</Label>
              <span className="text-xs font-mono">{vignette}</span>
            </div>
            <Slider min={0} max={100} step={1} value={[vignette]} onValueChange={([v]) => onVignetteChange?.(v)} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="text-xs">Sharpness</Label>
              <span className="text-xs font-mono">{sharpness}</span>
            </div>
            <Slider min={0} max={100} step={1} value={[sharpness]} onValueChange={([v]) => onSharpnessChange?.(v)} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="text-xs">Softness</Label>
              <span className="text-xs font-mono">{softness}</span>
            </div>
            <Slider min={0} max={100} step={1} value={[softness]} onValueChange={([v]) => onSoftnessChange?.(v)} />
          </div>
        </div>
        )}
      </div>
      
      <div className="space-y-3">
        <Label className="text-sm font-medium">Film Stock</Label>
        <Select value={filmStock} onValueChange={onFilmStockChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="vision3-50d">Kodak Vision3 50D</SelectItem>
            <SelectItem value="vision3-200t">Kodak Vision3 200T</SelectItem>
            <SelectItem value="vision3-250d">Kodak Vision3 250D</SelectItem>
            <SelectItem value="vision3-500t">Kodak Vision3 500T</SelectItem>
            <SelectItem value="fuji-eterna-vivid-500">Fuji Eterna Vivid 500</SelectItem>
            <SelectItem value="fuji-reala-500d">Fuji Reala 500D</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          D=Daylight balanced, T=Tungsten balanced
        </p>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Label htmlFor="bloom" className="text-sm font-medium">
              Bloom
            </Label>
            <button onClick={() => setExpandedBloom(!expandedBloom)} className="text-muted-foreground hover:text-foreground">
              <ChevronDown className={`w-4 h-4 transition-transform ${expandedBloom ? 'rotate-180' : ''}`} />
            </button>
          </div>
          <span className="text-xs text-muted-foreground font-mono">
            {bloom.toFixed(1)}
          </span>
        </div>
        <Slider
          id="bloom"
          min={0}
          max={100}
          step={1}
          value={[bloom]}
          onValueChange={([value]) => onBloomChange(value)}
          className="cursor-pointer"
        />
        <p className="text-xs text-muted-foreground">
          Soft glow around bright areas
        </p>
        {expandedBloom && (
          <div className="space-y-3 pt-2 pl-4 border-l-2 border-border">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs">Threshold</Label>
                <span className="text-xs font-mono">{bloomThreshold}</span>
              </div>
              <Slider
                min={100}
                max={255}
                step={1}
                value={[bloomThreshold]}
                onValueChange={([value]) => onBloomThresholdChange?.(value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs">Blur Amount</Label>
                <span className="text-xs font-mono">{bloomBlur}</span>
              </div>
              <Slider
                min={1}
                max={100}
                step={1}
                value={[bloomBlur]}
                onValueChange={([value]) => onBloomBlurChange?.(value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">View Mask</Label>
              <button onClick={() => onShowMaskChange?.(showMask === 'bloom' ? 'none' : 'bloom')} className={`w-full px-3 py-2 text-xs rounded border transition-colors ${showMask === 'bloom' ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-muted'}`}>{showMask === 'bloom' ? 'Hide Mask' : 'Show Mask'}</button>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Blend Mode</Label>
              <Select value={bloomBlendMode} onValueChange={onBloomBlendModeChange}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="screen">Screen</SelectItem>
                  <SelectItem value="soft_light">Soft Light</SelectItem>
                  <SelectItem value="lighten">Lighten</SelectItem>
                  <SelectItem value="dodge">Dodge</SelectItem>
                  <SelectItem value="plus">Plus</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Label htmlFor="halation" className="text-sm font-medium">
              Halation
            </Label>
            <button onClick={() => setExpandedHalation(!expandedHalation)} className="text-muted-foreground hover:text-foreground">
              <ChevronDown className={`w-4 h-4 transition-transform ${expandedHalation ? 'rotate-180' : ''}`} />
            </button>
          </div>
          <span className="text-xs text-muted-foreground font-mono">
            {halation.toFixed(1)}
          </span>
        </div>
        <Slider
          id="halation"
          min={0}
          max={100}
          step={1}
          value={[halation]}
          onValueChange={([value]) => onHalationChange(value)}
          className="cursor-pointer"
        />
        <p className="text-xs text-muted-foreground">
          Warm red glow around highlights
        </p>
        {expandedHalation && (
          <div className="space-y-3 pt-2 pl-4 border-l-2 border-border">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs">Threshold</Label>
                <span className="text-xs font-mono">{halationThreshold}</span>
              </div>
              <Slider
                min={100}
                max={255}
                step={1}
                value={[halationThreshold]}
                onValueChange={([value]) => onHalationThresholdChange?.(value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs">Blur Amount</Label>
                <span className="text-xs font-mono">{halationBlur}</span>
              </div>
              <Slider
                min={1}
                max={100}
                step={1}
                value={[halationBlur]}
                onValueChange={([value]) => onHalationBlurChange?.(value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">View Mask</Label>
              <button onClick={() => onShowMaskChange?.(showMask === 'halation' ? 'none' : 'halation')} className={`w-full px-3 py-2 text-xs rounded border transition-colors ${showMask === 'halation' ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-muted'}`}>{showMask === 'halation' ? 'Hide Mask' : 'Show Mask'}</button>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Label htmlFor="grain" className="text-sm font-medium">
              Grain
            </Label>
            <button onClick={() => setExpandedGrain(!expandedGrain)} className="text-muted-foreground hover:text-foreground">
              <ChevronDown className={`w-4 h-4 transition-transform ${expandedGrain ? 'rotate-180' : ''}`} />
            </button>
          </div>
          <span className="text-xs text-muted-foreground font-mono">
            {grain.toFixed(1)}
          </span>
        </div>
        <Slider
          id="grain"
          min={0}
          max={100}
          step={1}
          value={[grain]}
          onValueChange={([value]) => onGrainChange(value)}
          className="cursor-pointer"
        />
        <p className="text-xs text-muted-foreground">
          Authentic film texture
        </p>
        {expandedGrain && (
          <div className="space-y-3 pt-2 pl-4 border-l-2 border-border">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs">Grain Size</Label>
                <span className="text-xs font-mono">{grainSize.toFixed(1)}</span>
              </div>
              <Slider
                min={0.5}
                max={3}
                step={0.1}
                value={[grainSize]}
                onValueChange={([value]) => onGrainSizeChange?.(value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs">Distribution</Label>
                <span className="text-xs font-mono">
                  {grainDistribution < 40 ? 'Shadows' : grainDistribution > 60 ? 'Highlights' : 'Balanced'}
                </span>
              </div>
              <Slider
                min={0}
                max={100}
                step={1}
                value={[grainDistribution]}
                onValueChange={([value]) => onGrainDistributionChange?.(value)}
              />
              <p className="text-xs text-muted-foreground">0=Shadows, 50=Balanced, 100=Highlights</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
