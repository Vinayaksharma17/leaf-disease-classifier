export type DiseaseClass = "Common Rust" | "Gray Leaf Spot" | "Blight" | "Healthy";

export interface ClassificationResponse {
  predictedClass: DiseaseClass;
  confidence: number;
  allPredictions: Record<DiseaseClass, number>;
}

export interface DiseaseInfo {
  name: string;
  description: string;
  symptoms: string[];
  treatment: string;
  color: string;
}

export const diseaseInfo: Record<DiseaseClass, DiseaseInfo> = {
  "Common Rust": {
    name: "Common Rust",
    description: "A fungal disease caused by Puccinia sorghi, characterized by rust-colored pustules.",
    symptoms: [
      "Circular to elongated rust-colored pustules",
      "Primarily on upper leaf surface",
      "Can reduce photosynthesis",
    ],
    treatment: "Apply fungicides when conditions favor disease. Use resistant hybrids.",
    color: "hsl(var(--rust))",
  },
  "Gray Leaf Spot": {
    name: "Gray Leaf Spot",
    description: "Caused by Cercospora zeae-maydis, leading to rectangular lesions on leaves.",
    symptoms: [
      "Rectangular gray or tan lesions",
      "Parallel to leaf veins",
      "Can cause severe yield loss",
    ],
    treatment: "Rotate crops, use resistant varieties, apply fungicides if severe.",
    color: "hsl(var(--spot))",
  },
  "Blight": {
    name: "Blight",
    description: "Bacterial or fungal infection causing rapid tissue death and leaf decay.",
    symptoms: [
      "Large dead areas on leaves",
      "Rapid tissue death",
      "May spread quickly in humid conditions",
    ],
    treatment: "Remove infected plants, improve air circulation, use appropriate treatments.",
    color: "hsl(var(--blight))",
  },
  "Healthy": {
    name: "Healthy Leaf",
    description: "No signs of disease or pest damage. Normal, vigorous growth.",
    symptoms: [
      "Uniform green color",
      "No lesions or spots",
      "Normal growth pattern",
    ],
    treatment: "Maintain good agricultural practices and monitor regularly.",
    color: "hsl(var(--healthy))",
  },
};
