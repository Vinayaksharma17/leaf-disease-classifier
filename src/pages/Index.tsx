import { useState } from "react";
import { Upload, Leaf, Activity } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";
import ClassificationResult from "@/components/ClassificationResult";
import HeroSection from "@/components/HeroSection";
import { ClassificationResponse } from "@/types/classification";

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [classification, setClassification] = useState<ClassificationResponse | null>(null);
  const [isClassifying, setIsClassifying] = useState(false);

  const handleImageSelect = async (imageData: string) => {
    setSelectedImage(imageData);
    setClassification(null);
    
    // Simulate classification - replace with actual API call
    setIsClassifying(true);
    setTimeout(() => {
      // Mock classification result
      const mockResult: ClassificationResponse = {
        predictedClass: ["Common Rust", "Gray Leaf Spot", "Blight", "Healthy"][Math.floor(Math.random() * 4)] as any,
        confidence: 0.85 + Math.random() * 0.14,
        allPredictions: {
          "Common Rust": Math.random() * 0.3,
          "Gray Leaf Spot": Math.random() * 0.25,
          "Blight": Math.random() * 0.2,
          "Healthy": Math.random() * 0.25,
        }
      };
      
      // Normalize to ensure highest is the predicted class
      const maxConf = mockResult.confidence;
      mockResult.allPredictions[mockResult.predictedClass] = maxConf;
      
      setClassification(mockResult);
      setIsClassifying(false);
    }, 1500);
  };

  const handleReset = () => {
    setSelectedImage(null);
    setClassification(null);
    setIsClassifying(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <HeroSection />
      
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <ImageUpload 
              onImageSelect={handleImageSelect}
              selectedImage={selectedImage}
              isClassifying={isClassifying}
              onReset={handleReset}
            />
          </div>
          
          <div className="lg:sticky lg:top-8">
            <ClassificationResult 
              classification={classification}
              isClassifying={isClassifying}
            />
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="bg-card rounded-xl p-6 shadow-[var(--shadow-soft)] border border-border/50">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Upload className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Simple Upload</h3>
            <p className="text-muted-foreground text-sm">
              Drag and drop or click to upload corn leaf images for instant analysis
            </p>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-[var(--shadow-soft)] border border-border/50">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
              <Activity className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Real-time Analysis</h3>
            <p className="text-muted-foreground text-sm">
              Advanced deep learning models provide accurate disease classification in seconds
            </p>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-[var(--shadow-soft)] border border-border/50">
            <div className="w-12 h-12 rounded-lg bg-healthy/10 flex items-center justify-center mb-4">
              <Leaf className="w-6 h-6 text-healthy" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Actionable Insights</h3>
            <p className="text-muted-foreground text-sm">
              Get detailed confidence scores and recommendations for crop management
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
