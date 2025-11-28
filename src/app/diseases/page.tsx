import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DiseasesPage() {
  const diseases = [
  {
    name: "Common Rust",
    description: "Caused by the fungus Puccinia sorghi, appears as small, circular to elongate pustules on leaves.",
    symptoms: [
      "Small, circular to elongate pustules on leaves",
      "Pustules are reddish-brown in color",
      "May cause yellowing and premature death of leaves"
    ],
    treatment: [
      "Plant resistant varieties",
      "Apply fungicides when necessary",
      "Practice crop rotation"
    ]
  },
  {
    name: "Gray Leaf Spot",
    description: "Caused by the fungus Cercospora zeae-maydis, it causes rectangular lesions on leaves.",
    symptoms: [
      "Rectangular, gray to tan lesions on leaves",
      "Lesions may have yellow halos",
      "Severe infections can cause premature death of leaves"
    ],
    treatment: [
      "Use resistant hybrids",
      "Apply foliar fungicides",
      "Practice crop rotation"
    ]
  },
  {
    name: "Northern Corn Leaf Blight",
    description: "Caused by the fungus Exserohilum turcicum, it causes long, elliptical, gray-green lesions.",
    symptoms: [
      "Long, elliptical, gray-green lesions",
      "Lesions may coalesce and kill entire leaves",
      "Most severe in wet, humid conditions"
    ],
    treatment: [
      "Plant resistant hybrids",
      "Use tillage to bury crop residue",
      "Apply foliar fungicides when needed"
    ]
  }
];

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Maize Diseases</h1>
        <p className="text-muted-foreground">
          Learn about common maize diseases and their treatment methods
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {diseases.map((disease) => (
          <Card key={disease.name} className="h-full">
            <CardHeader>
              <CardTitle>{disease.name}</CardTitle>
              <CardDescription>{disease.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Symptoms:</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {disease.symptoms.map((symptom, i) => (
                    <li key={i}>{symptom}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Treatment:</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {disease.treatment.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
