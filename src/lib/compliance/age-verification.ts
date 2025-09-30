// =============================================================================
// AGE VERIFICATION SERVICE FOR CANNABIS DELIVERY
// =============================================================================

interface IdDocument {
  frontImage: string; // Base64 or URL
  backImage?: string;
  selfieImage: string;
  idType: 'drivers_license' | 'state_id' | 'passport';
}

interface VerificationResult {
  isValid: boolean;
  confidence: number;
  extractedData: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    documentNumber: string;
    expirationDate: string;
    state?: string;
    address?: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
  };
  warnings: string[];
  errors: string[];
}

interface AgeVerificationResponse {
  success: boolean;
  isEligible: boolean;
  age: number;
  verificationId: string;
  result: VerificationResult;
  message: string;
}

class AgeVerificationService {
  private apiKey: string;
  private apiUrl: string;

  constructor() {
    this.apiKey = process.env.AGE_VERIFICATION_API_KEY!;
    this.apiUrl = process.env.AGE_VERIFICATION_API_URL!;
  }

  async verifyId(document: IdDocument, userId: string): Promise<AgeVerificationResponse> {
    try {
      // In production, this would call a real ID verification service like Jumio, Onfido, etc.
      const mockResult = await this.mockIdVerification(document);

      // Calculate age
      const birthDate = new Date(mockResult.extractedData.dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      const isEligible = age >= 21; // Cannabis age requirement

      // Log verification attempt
      console.log(`Age verification for user ${userId}:`, {
        age,
        isEligible,
        documentType: document.idType,
        timestamp: new Date().toISOString(),
      });

      return {
        success: mockResult.isValid,
        isEligible: mockResult.isValid && isEligible,
        age,
        verificationId: `VER-${Date.now()}-${userId}`,
        result: mockResult,
        message: mockResult.isValid
          ? (isEligible ? 'ID verified successfully' : 'Must be 21 or older')
          : 'ID verification failed',
      };
    } catch (error) {
      console.error('Age verification error:', error);
      throw new Error('Age verification service temporarily unavailable');
    }
  }

  // Mock ID verification for development/testing
  private async mockIdVerification(document: IdDocument): Promise<VerificationResult> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock successful verification
    return {
      isValid: true,
      confidence: 0.95,
      extractedData: {
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1990-05-15', // This would be extracted from the ID
        documentNumber: 'D12345678',
        expirationDate: '2028-05-15',
        state: 'CA',
        address: {
          street: '123 Main St',
          city: 'Los Angeles',
          state: 'CA',
          zipCode: '90210',
        },
      },
      warnings: [],
      errors: [],
    };
  }

  // Validate existing verification
  async validateVerification(verificationId: string): Promise<boolean> {
    try {
      // In production, you would check the verification status with the service
      // and/or check your database for the verification record
      return true;
    } catch (error) {
      console.error('Verification validation error:', error);
      return false;
    }
  }

  // Check if verification has expired
  isVerificationExpired(verifiedAt: Date, expirationMonths: number = 12): boolean {
    const expirationDate = new Date(verifiedAt);
    expirationDate.setMonth(expirationDate.getMonth() + expirationMonths);
    return new Date() > expirationDate;
  }
}

export const ageVerificationService = new AgeVerificationService();

// Compliance utilities
export const VERIFICATION_REQUIREMENTS = {
  RECREATIONAL: {
    MIN_AGE: 21,
    REQUIRED_DOCUMENTS: ['drivers_license', 'state_id', 'passport'],
    VERIFICATION_EXPIRY_MONTHS: 12,
  },
  MEDICAL: {
    MIN_AGE: 18,
    REQUIRED_DOCUMENTS: ['drivers_license', 'state_id', 'passport', 'medical_card'],
    VERIFICATION_EXPIRY_MONTHS: 6, // Medical cards may expire more frequently
  },
} as const;

// Helper function to check age eligibility
export const checkAgeEligibility = (dateOfBirth: string, customerType: 'recreational' | 'medical' = 'recreational'): boolean => {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  const minAge = customerType === 'medical'
    ? VERIFICATION_REQUIREMENTS.MEDICAL.MIN_AGE
    : VERIFICATION_REQUIREMENTS.RECREATIONAL.MIN_AGE;

  return age >= minAge;
};

// Audit trail for verification attempts
export interface VerificationAudit {
  userId: string;
  verificationId: string;
  documentType: string;
  result: 'success' | 'failed' | 'expired';
  ipAddress?: string;
  userAgent?: string;
  timestamp: Date;
}

export const logVerificationAttempt = async (audit: VerificationAudit): Promise<void> => {
  try {
    // In production, save to database and/or compliance logging service
    console.log('Age verification audit:', audit);

    // This would typically be saved to an audit log table
    // await prisma.verificationAudit.create({ data: audit });
  } catch (error) {
    console.error('Failed to log verification attempt:', error);
  }
};