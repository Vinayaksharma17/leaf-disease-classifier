import { CheckCircle2, AlertCircle, Info } from "lucide-react";
import { ClassificationResponse, diseaseInfo } from "@/types/classification";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ClassificationResultProps {
  classification: ClassificationResponse | null;
  isClassifying: boolean;
}

const ClassificationResult = ({ classification, isClassifying }: ClassificationResultProps) => {
  if (!classification && !isClassifying) {
    return (
      <Card className="shadow-[var(--shadow-soft)] border-border/50">
        <CardHeader>
          <CardTitle className="text-2xl">Classification Result</CardTitle>
          <CardDescription>Upload an image to see the analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Info className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">
              Results will appear here after image analysis
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isClassifying) {
    return (
      <Card className="shadow-[var(--shadow-soft)] border-border/50">
        <CardHeader>
          <CardTitle className="text-2xl">Analyzing...</CardTitle>
          <CardDescription>Processing your image</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 py-8">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary animate-pulse w-3/4 transition-all duration-1000" />
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Running deep learning inference...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!classification) return null;

  const info = diseaseInfo[classification.predictedClass];
  const isHealthy = classification.predictedClass === "Healthy";
  const confidencePercent = Math.round(classification.confidence * 100);

  return (
    <Card className="shadow-[var(--shadow-medium)] border-border/50">
      <CardHeader>
        <div className="flex items-start gap-3">
          <div 
            className={cn(
              "w-12 h-12 rounded-lg flex items-center justify-center",
              isHealthy ? "bg-healthy/10" : "bg-destructive/10"
            )}
          >
            {isHealthy ? (
              <CheckCircle2 className="w-6 h-6 text-healthy" />
            ) : (
              <AlertCircle className="w-6 h-6 text-destructive" />
            )}
          </div>
          <div className="flex-1">
            <CardTitle className="text-2xl">{info.name}</CardTitle>
            <CardDescription className="mt-1">{info.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Confidence</span>
            <span className="text-2xl font-bold" style={{ color: info.color }}>
              {confidencePercent}%
            </span>
          </div>
          <Progress 
            value={confidencePercent} 
            className="h-3"
            style={{
              // @ts-expect-error Custom CSS property for progress bar color is not recognized by TypeScript
              "--progress-background": info.color,
            }}
          />
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-foreground">All Predictions</h4>
          <div className="space-y-2">
            {Object.entries(classification.allPredictions)
              .sort((a, b) => b[1] - a[1])
              .map(([disease, confidence]) => {
                const diseaseColor = diseaseInfo[disease as keyof typeof diseaseInfo].color;
                return (
                  <div key={disease} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{disease}</span>
                      <span className="font-medium text-muted-foreground">
                        {Math.round(confidence * 100)}%
                      </span>
                    </div>
                    <Progress 
                      value={confidence * 100} 
                      className="h-2"
                      style={{
                        // @ts-expect-error -- Custom CSS property not recognized by TypeScript
                        "--progress-background": diseaseColor,
                      }}
                    />
                  </div>
                );
              })}
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-border">
          <h4 className="font-semibold text-foreground">Symptoms</h4>
          <ul className="space-y-2">
            {info.symptoms.map((symptom, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                <span>{symptom}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2 pt-4 border-t border-border">
          <h4 className="font-semibold text-foreground">Treatment</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {info.treatment}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassificationResult;
