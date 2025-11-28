// Types
type Disease = {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  symptoms: string[];
  treatment: string[];
  prevention: string[];
  images: string[];
  riskLevel: 'low' | 'medium' | 'high';
};

type ScanResult = {
  id: string;
  imageUrl: string;
  date: string;
  disease: Disease | null;
  confidence: number;
  location: string;
  notes: string;
};

// Mock disease data
export const diseases: Disease[] = [
  {
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
    images: [
      'https://extension.umn.edu/sites/extension.umn.edu/files/styles/tr-crop_main/public/northern-leaf-blight-corn.jpg',
      'https://cropwatch.unl.edu/plantdisease/corn/northern-leaf-blight'
    ],
    riskLevel: 'high'
  },
  {
    id: 'gib',
    name: 'Gray Leaf Spot',
    scientificName: 'Cercospora zeae-maydis',
    description: 'A fungal disease that causes rectangular, yellow to tan lesions on leaves.',
    symptoms: [
      'Small, yellow to tan spots on leaves',
      'Spots develop into rectangular lesions',
      'Lesions may have a yellow halo',
      'Severe infections can cause premature death of leaves'
    ],
    treatment: [
      'Apply foliar fungicides',
      'Remove and destroy infected crop residue'
    ],
    prevention: [
      'Use resistant hybrids',
      'Practice crop rotation',
      'Avoid excessive nitrogen fertilization',
      'Use proper plant spacing'
    ],
    images: [
      'https://extension.umn.edu/sites/extension.umn.edu/files/styles/tr-crop_main/public/gray-leaf-spot-corn.jpg'
    ],
    riskLevel: 'medium'
  },
  {
    id: 'cln',
    name: 'Common Rust',
    scientificName: 'Puccinia sorghi',
    description: 'A fungal disease characterized by small, circular to elongate pustules on leaves.',
    symptoms: [
      'Small, circular to elongate pustules',
      'Pustules are reddish-brown to dark brown',
      'May appear on both leaf surfaces',
      'Severe infections can cause leaf yellowing and death'
    ],
    treatment: [
      'Apply fungicides if necessary',
      'Remove volunteer corn plants'
    ],
    prevention: [
      'Plant resistant hybrids',
      'Avoid late planting',
      'Maintain proper plant nutrition'
    ],
    images: [
      'https://extension.umn.edu/sites/extension.umn.edu/files/styles/tr-crop_main/public/common-rust-corn.jpg'
    ],
    riskLevel: 'low'
  }
];

// Mock scan history
export const mockScanHistory: ScanResult[] = [
  {
    id: 'scan1',
    imageUrl: 'https://extension.umn.edu/sites/extension.umn.edu/files/styles/tr-crop_main/public/northern-leaf-blight-corn.jpg',
    date: '2025-11-20T14:30:00Z',
    disease: diseases[0], // Northern Leaf Blight
    confidence: 0.92,
    location: 'Field A, Row 5',
    notes: 'Found in the northern section of the field. Multiple plants affected.'
  },
  {
    id: 'scan2',
    imageUrl: 'https://extension.umn.edu/sites/extension.umn.edu/files/styles/tr-crop_main/public/gray-leaf-spot-corn.jpg',
    date: '2025-11-18T09:15:00Z',
    disease: diseases[1], // Gray Leaf Spot
    confidence: 0.87,
    location: 'Field B, Row 12',
    notes: 'Early stage detection. Monitor closely.'
  },
  {
    id: 'scan3',
    imageUrl: 'https://extension.umn.edu/sites/extension.umn.edu/files/styles/tr-crop_main/public/common-rust-corn.jpg',
    date: '2025-11-15T16:45:00Z',
    disease: diseases[2], // Common Rust
    confidence: 0.78,
    location: 'Field C, Row 8',
    notes: 'Mild infection. No treatment needed yet.'
  }
];

// Mock API functions
export const mockDiseaseAPI = {
  // Get all diseases
  async getDiseases(): Promise<Disease[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(diseases), 500);
    });
  },

  // Get disease by ID
  async getDiseaseById(id: string): Promise<Disease | undefined> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(diseases.find(d => d.id === id));
      }, 300);
    });
  },

  // Get scan history
  async getScanHistory(): Promise<ScanResult[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(mockScanHistory), 700);
    });
  },

  // Submit a new scan (mock implementation)
  async submitScan(imageFile: File): Promise<ScanResult> {
    return new Promise(resolve => {
      setTimeout(() => {
        const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
        const newScan: ScanResult = {
          id: `scan${Date.now()}`,
          imageUrl: URL.createObjectURL(imageFile),
          date: new Date().toISOString(),
          disease: randomDisease,
          confidence: Math.random() * 0.2 + 0.7, // Random confidence between 0.7 and 0.9
          location: `Field ${String.fromCharCode(65 + Math.floor(Math.random() * 5))}, Row ${Math.floor(Math.random() * 20) + 1}`,
          notes: 'Automatically generated test scan'
        };
        mockScanHistory.unshift(newScan);
        resolve(newScan);
      }, 1500);
    });
  }
};

export type { Disease, ScanResult };
