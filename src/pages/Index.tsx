import { useState, useEffect } from 'react';
import { ImageUploader } from '@/components/ImageUploader';
import { FilmControls } from '@/components/FilmControls';
import { FilmCanvas } from '@/components/FilmCanvas';
import { Film } from 'lucide-react';

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<HTMLImageElement | null>(null);
  const [bloom, setBloom] = useState(0);
  const [halation, setHalation] = useState(0);
  const [grain, setGrain] = useState(0);
  const [halationThreshold, setHalationThreshold] = useState(180);
  const [halationBlur, setHalationBlur] = useState(50);
  const [bloomThreshold, setBloomThreshold] = useState(180);
  const [bloomBlur, setBloomBlur] = useState(50);
  const [bloomBlendMode, setBloomBlendMode] = useState('screen');
  const [grainSize, setGrainSize] = useState(1);
  const [grainDistribution, setGrainDistribution] = useState(50);
  const [filmStock, setFilmStock] = useState('none');
  const [vignette, setVignette] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [shadows, setShadows] = useState(0);
  const [highlights, setHighlights] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [vibrance, setVibrance] = useState(0);
  const [sharpness, setSharpness] = useState(0);
  const [softness, setSoftness] = useState(0);
  const [temperature, setTemperature] = useState(0);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setUploadedImage(img);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Film className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Film Emulator</h1>
              <p className="text-xs text-muted-foreground">Professional analog film effects</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {!uploadedImage ? (
          <div className="max-w-2xl mx-auto mt-20">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">
                Transform Your Digital Photos
              </h2>
              <p className="text-muted-foreground">
                Add authentic film characteristics: bloom, halation, and grain
              </p>
            </div>
            <ImageUploader onImageUpload={handleImageUpload} />
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_320px] gap-6">
            {/* Canvas Area */}
            <div>
              <FilmCanvas
                image={uploadedImage}
                bloom={bloom}
                halation={halation}
                grain={grain}
                halationThreshold={halationThreshold}
                halationBlur={halationBlur}
                bloomThreshold={bloomThreshold}
                bloomBlur={bloomBlur}
                bloomBlendMode={bloomBlendMode}
                grainSize={grainSize}
                grainDistribution={grainDistribution}
                filmStock={filmStock}
                vignette={vignette}
                contrast={contrast}
                shadows={shadows}
                highlights={highlights}
                saturation={saturation}
                vibrance={vibrance}
                sharpness={sharpness}
                softness={softness}
                temperature={temperature}
              />
            </div>

            {/* Controls Sidebar */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Film Effects</h3>
                <FilmControls
                  bloom={bloom}
                  halation={halation}
                  grain={grain}
                  onBloomChange={setBloom}
                  onHalationChange={setHalation}
                  onGrainChange={setGrain}
                  halationThreshold={halationThreshold}
                  halationBlur={halationBlur}
                  bloomThreshold={bloomThreshold}
                  bloomBlur={bloomBlur}
                  grainSize={grainSize}
                  grainDistribution={grainDistribution}
                  onHalationThresholdChange={setHalationThreshold}
                  onHalationBlurChange={setHalationBlur}
                  onBloomThresholdChange={setBloomThreshold}
                  onBloomBlurChange={setBloomBlur}
                  onBloomBlendModeChange={setBloomBlendMode}
                  onGrainSizeChange={setGrainSize}
                  onGrainDistributionChange={setGrainDistribution}
                  filmStock={filmStock}
                  onFilmStockChange={setFilmStock}
                  vignette={vignette}
                  contrast={contrast}
                  shadows={shadows}
                  highlights={highlights}
                  saturation={saturation}
                  vibrance={vibrance}
                  sharpness={sharpness}
                  softness={softness}
                  temperature={temperature}
                  onVignetteChange={setVignette}
                  onContrastChange={setContrast}
                  onShadowsChange={setShadows}
                  onHighlightsChange={setHighlights}
                  onSaturationChange={setSaturation}
                  onVibranceChange={setVibrance}
                  onSharpnessChange={setSharpness}
                  onSoftnessChange={setSoftness}
                  onTemperatureChange={setTemperature}
                />
              </div>

              <button
                onClick={() => {
                  setUploadedImage(null);
                  setBloom(0);
                  setHalation(0);
                  setGrain(0);
                }}
                className="w-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors border border-border rounded-lg hover:bg-muted"
              >
                Upload New Image
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
