'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  ArrowLeft, 
  Share2,
  Download,
  Calendar,
  MapPin,
  FileText,
  Shield,
  AlertCircle,
  ChevronRight
} from 'lucide-react';

export default function ResultsPage() {
  const params = useParams();
  const router = useRouter();
  const { scanHistory } = useApp();
  const [scanResult, setScanResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResult = async () => {
      try {
        // Find the scan result by ID
        const result = scanHistory.find(scan => scan.id === params.id);
        
        if (result) {
          setScanResult(result);
        } else {
          // If not found in history, simulate loading a result
          // In a real app, this would be an API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock result for demo
          const mockResult = {
            id: params.id,
            imageUrl: '/api/placeholder/400/300',
            date: new Date().toISOString(),
            disease: {
              id: 'nlb',
              name: 'Northern Leaf Blight',
              scientificName: 'Exserohilum turcicum',
              description: 'A fungal disease that causes long, elliptical, gray-green or tan lesions on leaves.',
              symptoms: [
                'Elliptical, gray-green lesions on leaves',
                'Lesions turn tan or brown with age',
                'Lesions may have dark borders',
                'Severe infections can cause complete leaf death'
              ],
              treatment: [
                'Apply fungicides containing strobilurin or triazole',
                'Remove and destroy infected plant debris',
                'Rotate crops to non-host plants'
              ],
              prevention: [
                'Plant resistant varieties',
                'Practice crop rotation',
                'Ensure proper plant spacing for air circulation',
                'Avoid overhead irrigation'
              ],
              riskLevel: 'high'
            },
            confidence: 0.87,
            location: 'Field A, Row 5',
            notes: 'Found on multiple plants in the same row'
          };
          setScanResult(mockResult);
        }
      } catch (error) {
        console.error('Failed to load scan result:', error);
      } finally {
        setLoading(false);
      }
    };

    loadResult();
  }, [params.id, scanHistory]);

  const getRiskBadge = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">High Risk</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">Medium Risk</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Low Risk</Badge>;
      default:
        return <Badge>Unknown Risk</Badge>;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="container py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading scan results...</p>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (!scanResult) {
    return (
      <ProtectedRoute>
        <div className="container py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Result Not Found</h1>
            <p className="text-muted-foreground mb-6">The scan result you're looking for doesn't exist.</p>
            <Button onClick={() => router.push('/scan')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Scan
            </Button>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="container py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Scan Results</h1>
              <p className="text-muted-foreground">
                Analysis completed on {new Date(scanResult.date).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </div>

        {/* Main Results Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Image and Summary */}
          <div className="space-y-6">
            {/* Scanned Image */}
            <Card>
              <CardHeader>
                <CardTitle>Scanned Image</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square w-full overflow-hidden rounded-lg bg-muted">
                  <img
                    src={scanResult.imageUrl}
                    alt="Scanned leaf"
                    className="h-full w-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Quick Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Detection Status</span>
                  {scanResult.disease ? (
                    <div className="flex items-center text-red-600">
                      <AlertTriangle className="mr-1 h-4 w-4" />
                      <span className="text-sm">Disease Detected</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="mr-1 h-4 w-4" />
                      <span className="text-sm">Healthy</span>
                    </div>
                  )}
                </div>
                
                {scanResult.disease && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Confidence</span>
                      <span className={`text-sm font-medium ${getConfidenceColor(scanResult.confidence)}`}>
                        {Math.round(scanResult.confidence * 100)}%
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Risk Level</span>
                      {getRiskBadge(scanResult.disease.riskLevel)}
                    </div>
                  </>
                )}

                {scanResult.location && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Location</span>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="mr-1 h-3 w-3" />
                      {scanResult.location}
                    </div>
                  </div>
                )}

                {scanResult.notes && (
                  <div className="pt-2 border-t">
                    <span className="text-sm font-medium">Notes:</span>
                    <p className="text-sm text-muted-foreground mt-1">{scanResult.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Disease Details and Recommendations */}
          <div className="lg:col-span-2 space-y-6">
            {scanResult.disease ? (
              <>
                {/* Disease Information */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Disease Information</CardTitle>
                      {getRiskBadge(scanResult.disease.riskLevel)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{scanResult.disease.name}</h3>
                      <p className="text-sm text-muted-foreground italic mb-4">
                        {scanResult.disease.scientificName}
                      </p>
                      <p className="text-sm">{scanResult.disease.description}</p>
                    </div>

                    {/* Symptoms */}
                    <div>
                      <h4 className="font-medium mb-3 flex items-center">
                        <AlertCircle className="mr-2 h-4 w-4 text-orange-500" />
                        Symptoms
                      </h4>
                      <ul className="space-y-2">
                        {scanResult.disease.symptoms.map((symptom: string, index: number) => (
                          <li key={index} className="flex items-start text-sm">
                            <ChevronRight className="mr-2 h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                            {symptom}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Treatment Recommendations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="mr-2 h-5 w-5 text-blue-500" />
                      Treatment Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {scanResult.disease.treatment.map((treatment: string, index: number) => (
                        <li key={index} className="flex items-start text-sm">
                          <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0">
                            {index + 1}
                          </div>
                          <span>{treatment}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Prevention Measures */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Info className="mr-2 h-5 w-5 text-green-500" />
                      Prevention Measures
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {scanResult.disease.prevention.map((prevention: string, index: number) => (
                        <li key={index} className="flex items-start text-sm">
                          <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0">
                            {index + 1}
                          </div>
                          <span>{prevention}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </>
            ) : (
              /* No Disease Detected */
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-green-600">
                    <CheckCircle className="mr-2 h-5 w-5" />
                    No Disease Detected
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">
                    Great news! Our analysis didn't detect any signs of disease in the scanned leaf. 
                    The plant appears to be healthy.
                  </p>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <h4 className="font-medium text-green-800 dark:text-green-300 mb-2">
                      Recommendations for maintaining plant health:
                    </h4>
                    <ul className="space-y-2 text-sm text-green-700 dark:text-green-400">
                      <li className="flex items-start">
                        <ChevronRight className="mr-2 h-4 w-4 mt-0.5 flex-shrink-0" />
                        Continue regular monitoring of your crops
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="mr-2 h-4 w-4 mt-0.5 flex-shrink-0" />
                        Maintain proper irrigation and fertilization schedules
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="mr-2 h-4 w-4 mt-0.5 flex-shrink-0" />
                        Practice crop rotation to prevent future disease buildup
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="mr-2 h-4 w-4 mt-0.5 flex-shrink-0" />
                        Ensure adequate spacing between plants for good air circulation
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button onClick={() => router.push('/scan')} className="flex-1">
                Scan Another Leaf
              </Button>
              <Button variant="outline" onClick={() => router.push('/history')} className="flex-1">
                <FileText className="mr-2 h-4 w-4" />
                View Scan History
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
