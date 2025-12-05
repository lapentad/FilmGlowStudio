import { useCallback } from 'react';
import { Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  className?: string;
}

export const ImageUploader = ({ onImageUpload, className }: ImageUploaderProps) => {
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        onImageUpload(file);
      }
    },
    [onImageUpload]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onImageUpload(file);
      }
    },
    [onImageUpload]
  );

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className={cn(
        "relative border-2 border-dashed border-border rounded-lg p-12 transition-all duration-300",
        "hover:border-primary hover:bg-primary/5 cursor-pointer group",
        className
      )}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <div className="p-4 rounded-full bg-muted group-hover:bg-primary/10 transition-colors">
          <Upload className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
        <div>
          <p className="text-lg font-medium text-foreground mb-1">
            Drop your image here
          </p>
          <p className="text-sm text-muted-foreground">
            or click to browse files
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          Supports JPG, PNG, WebP
        </p>
      </div>
    </div>
  );
};
