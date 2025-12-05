import { useEffect, useRef, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { toast } from 'sonner';

interface FilmCanvasProps {
  image: HTMLImageElement;
  bloom: number;
  halation: number;
  grain: number;
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
}

export const FilmCanvas = ({ image, bloom, halation, grain, halationThreshold = 180, halationBlur = 50, bloomThreshold = 180, bloomBlur = 50, bloomBlendMode = 'screen', grainSize = 1, grainDistribution = 50, filmStock = 'none', vignette = 0, contrast = 0, shadows = 0, highlights = 0, saturation = 0, vibrance = 0, sharpness = 0, softness = 0, temperature = 0 }: FilmCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const displayCanvasRef = useRef<HTMLCanvasElement>(null);
  const workerRef = useRef<Worker | null>(null);
  const [processing, setProcessing] = useState(false);
  const debounceTimerRef = useRef<number | null>(null);
  const pendingParamsRef = useRef<any>(null);

  useEffect(() => {
    workerRef.current = new Worker(new URL('../workers/photonWorker.ts', import.meta.url), { type: 'module' });
    return () => workerRef.current?.terminate();
  }, []);

  const processImage = useCallback(() => {
    const canvas = canvasRef.current;
    const displayCanvas = displayCanvasRef.current;
    const worker = workerRef.current;
    if (!canvas || !displayCanvas || !image || !worker || !pendingParamsRef.current) return;

    const ctx = canvas.getContext('2d');
    const displayCtx = displayCanvas.getContext('2d');
    if (!ctx || !displayCtx) return;

    canvas.width = image.width;
    canvas.height = image.height;

    const maxWidth = 1200;
    const maxHeight = 800;
    const scale = Math.min(maxWidth / image.width, maxHeight / image.height, 1);
    displayCanvas.width = image.width * scale;
    displayCanvas.height = image.height * scale;

    ctx.drawImage(image, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    setProcessing(true);
    
    const handleMessage = (e: MessageEvent) => {
      ctx.putImageData(e.data.imageData, 0, 0);
      displayCtx.clearRect(0, 0, displayCanvas.width, displayCanvas.height);
      displayCtx.drawImage(canvas, 0, 0, displayCanvas.width, displayCanvas.height);
      setProcessing(false);
    };
    
    worker.onmessage = handleMessage;
    worker.postMessage({ imageData, ...pendingParamsRef.current });
  }, [image]);

  useEffect(() => {
    pendingParamsRef.current = { halation, bloom, grain, halationThreshold, halationBlur, bloomThreshold, bloomBlur, bloomBlendMode, grainSize, grainDistribution, filmStock, vignette, contrast, shadows, highlights, saturation, vibrance, sharpness, softness, temperature };

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = window.setTimeout(() => {
      processImage();
    }, 100);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [bloom, halation, grain, halationThreshold, halationBlur, bloomThreshold, bloomBlur, bloomBlendMode, grainSize, grainDistribution, filmStock, vignette, contrast, shadows, highlights, saturation, vibrance, sharpness, softness, temperature, processImage]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `film-edited-${Date.now()}.png`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success('Image downloaded successfully');
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="relative rounded-lg overflow-hidden bg-black/50 border border-border">
        <canvas
          ref={displayCanvasRef}
          className="w-full h-auto max-h-[800px] object-contain"
        />
        <canvas ref={canvasRef} className="hidden" />
      </div>
      <Button onClick={handleDownload} className="w-full" variant="default">
        <Download className="w-4 h-4 mr-2" />
        Download Edited Image
      </Button>
    </div>
  );
};
