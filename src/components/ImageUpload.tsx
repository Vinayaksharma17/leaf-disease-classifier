import { useCallback, useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  onImageSelect: (imageData: string) => void;
  selectedImage: string | null;
  isClassifying: boolean;
  onReset: () => void;
}

const ImageUpload = ({ onImageSelect, selectedImage, isClassifying, onReset }: ImageUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onImageSelect(result);
    };
    reader.readAsDataURL(file);
  }, [onImageSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">Upload Corn Leaf Image</h2>
        {selectedImage && (
          <Button
            onClick={onReset}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <X className="w-4 h-4" />
            Reset
          </Button>
        )}
      </div>

      {!selectedImage ? (
        <div
          className={cn(
            "relative border-2 border-dashed rounded-xl p-12 transition-all duration-300",
            "hover:border-primary/50 hover:bg-primary/5",
            "cursor-pointer group",
            isDragging && "border-primary bg-primary/10 scale-[1.02]",
            "bg-card shadow-[var(--shadow-soft)]"
          )}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => document.getElementById("file-input")?.click()}
        >
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />

          <div className="flex flex-col items-center gap-4 text-center">
            <div className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300",
              "bg-primary/10 group-hover:bg-primary/20",
              isDragging && "bg-primary/30 scale-110"
            )}>
              <Upload className={cn(
                "w-8 h-8 text-primary transition-transform duration-300",
                isDragging && "scale-110"
              )} />
            </div>

            <div className="space-y-2">
              <p className="text-lg font-medium text-foreground">
                Drop your image here, or click to browse
              </p>
              <p className="text-sm text-muted-foreground">
                Supports JPG, PNG, and WEBP formats
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ImageIcon className="w-4 h-4" />
              <span>Best results with clear, well-lit leaf images</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative rounded-xl overflow-hidden shadow-[var(--shadow-medium)] border border-border bg-card">
          <img
            src={selectedImage}
            alt="Selected corn leaf"
            className="w-full h-auto max-h-[500px] object-contain"
          />
          {isClassifying && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-foreground font-medium">Analyzing leaf...</p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground border border-border/50">
        <p className="font-medium text-foreground mb-2">Tips for best results:</p>
        <ul className="space-y-1 list-disc list-inside">
          <li>Ensure the leaf fills most of the frame</li>
          <li>Use good lighting with minimal shadows</li>
          <li>Avoid blurry or out-of-focus images</li>
          <li>Include visible symptoms if present</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageUpload;
