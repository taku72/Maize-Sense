'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabase } from '@/contexts/SupabaseContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { ProtectedRoute } from '@/components/auth/protected-route';

export default function ScanPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  
  const router = useRouter();
  const { submitScan } = useSupabase();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast.error('Please select an image to scan');
      return;
    }

    setIsUploading(true);
    setProgress(30);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 300);

      // Submit the scan with Supabase
      const result = await submitScan(selectedFile, location, notes);
      clearInterval(progressInterval);
      setProgress(100);
      
      // Show success message
      toast.success('Scan completed successfully!', {
        description: result.disease 
          ? `Detected: ${result.disease.name}` 
          : 'No diseases detected',
      });
      
      // Redirect to results page
      setTimeout(() => {
        router.push(`/results/${result.id}`);
      }, 1000);
      
    } catch (error) {
      console.error('Scan failed:', error);
      toast.error('Scan failed. Please try again.');
      setProgress(0);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  return (
    <ProtectedRoute>
      <div className="container py-8">
        <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Scan Maize Leaf</h1>
        <p className="text-muted-foreground">
          Upload an image of a maize leaf to detect potential diseases
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Upload Section */}
        <div className="space-y-6">
          <div 
            className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-6 text-center transition-colors hover:border-primary/50"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-primary"
              >
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
                <line x1="16" x2="22" y1="5" y2="5" />
                <line x1="19" x2="19" y1="2" y2="8" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21.5" />
              </svg>
            </div>
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground">
                {selectedFile ? selectedFile.name : 'Click to upload or drag and drop'}
              </p>
              <p className="mt-1">
                {selectedFile 
                  ? 'Click to change or drop a different file' 
                  : 'PNG, JPG, or JPEG (max 5MB)'}
              </p>
            </div>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Analyzing image...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location (optional)</Label>
              <Input
                id="location"
                placeholder="E.g., Field A, Row 5"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                disabled={isUploading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <textarea
                id="notes"
                rows={3}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Any additional observations about the plant or field conditions..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                disabled={isUploading}
              />
            </div>
          </div>

          <Button 
            className="w-full" 
            size="lg" 
            onClick={handleSubmit}
            disabled={!selectedFile || isUploading}
          >
            {isUploading ? 'Analyzing...' : 'Scan Leaf'}
          </Button>
        </div>

        {/* Preview Section */}
        <div className="space-y-6">
          <h2 className="text-lg font-medium">Preview</h2>
          {previewUrl ? (
            <div className="relative aspect-square w-full overflow-hidden rounded-lg border bg-muted/25">
              <img
                src={previewUrl}
                alt="Preview"
                className="h-full w-full object-contain"
              />
            </div>
          ) : (
            <div className="flex aspect-square w-full items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/25">
              <p className="text-muted-foreground">No image selected</p>
            </div>
          )}

          <div className="rounded-lg border bg-muted/25 p-4">
            <h3 className="mb-2 font-medium">Tips for best results:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-green-500"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span>Use a well-lit area when taking photos</span>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-green-500"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span>Capture the entire leaf in the frame</span>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-green-500"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span>Place the leaf on a contrasting background</span>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-green-500"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span>Ensure the image is clear and in focus</span>
              </li>
            </ul>
          </div>
        </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
