import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, AlertTriangle, CheckCircle } from "lucide-react";

// Mock data - replace with actual data from your API
const scanHistory = [
  {
    id: 1,
    date: "2023-11-25",
    time: "14:30",
    disease: "Common Rust",
    confidence: 92,
    image: "/placeholder.jpg",
    status: "completed"
  },
  {
    id: 2,
    date: "2023-11-24",
    time: "09:15",
    disease: "Gray Leaf Spot",
    confidence: 85,
    image: "/placeholder.jpg",
    status: "completed"
  },
  {
    id: 3,
    date: "2023-11-20",
    time: "16:45",
    disease: "Northern Corn Leaf Blight",
    confidence: 78,
    image: "/placeholder.jpg",
    status: "completed"
  }
];

export default function HistoryPage() {
  return (
    <div className="container py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Scan History</h1>
        <p className="text-muted-foreground">
          View your previous disease scans and results.
        </p>
      </div>
      
      <div className="space-y-4">
        {scanHistory.map((scan) => (
          <Card key={scan.id} className="overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/4 p-4 border-r">
                <div className="aspect-square bg-muted rounded-md overflow-hidden">
                  <img
                    src={scan.image}
                    alt={`Scan ${scan.id}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1 p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{scan.disease}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mt-1 space-x-4">
                      <div className="flex items-center">
                        <CalendarDays className="h-4 w-4 mr-1" />
                        <span>{scan.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{scan.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium mr-2">
                      {scan.confidence}% confidence
                    </span>
                    {scan.confidence > 80 ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    )}
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    Rescan
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
