import { Leaf, Microscope } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden border-b border-border/50">
      <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(145_55%_35%/0.05),transparent_50%)]" />
      
      <div className="container relative mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            <Microscope className="w-4 h-4" />
            <span>AI-Powered Disease Detection</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight">
            Corn Leaf Disease
            <span className="block text-primary mt-2">Classifier</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Upload an image of a corn leaf to instantly identify diseases including Common Rust, 
            Gray Leaf Spot, Blight, or confirm healthy plants with deep learning precision.
          </p>

          <div className="flex items-center justify-center gap-8 pt-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">4</div>
              <div className="text-sm text-muted-foreground">Disease Types</div>
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">95%+</div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">&lt;2s</div>
              <div className="text-sm text-muted-foreground">Analysis Time</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
