// =============================================================================
// METRC (SEED-TO-SALE TRACKING) INTEGRATION
// =============================================================================

interface MetrcPackage {
  id: number;
  label: string;
  packageType: string;
  sourcePackageLabels: string[];
  item: {
    name: string;
    category: string;
    strainName?: string;
  };
  quantity: number;
  unitOfMeasure: string;
  packagedDate: string;
  lastModified: string;
  isActive: boolean;
}

interface MetrcSale {
  packageLabel: string;
  quantity: number;
  unitOfMeasure: string;
  totalAmount: number;
  salesDateTime: string;
  salesCustomerType: 'Consumer' | 'Patient';
  patientLicenseNumber?: string;
}

class MetrcService {
  private baseUrl: string;
  private apiKey: string;
  private userKey: string;

  constructor() {
    this.baseUrl = process.env.METRC_API_URL || 'https://api-ca.metrc.com';
    this.apiKey = process.env.METRC_API_KEY!;
    this.userKey = process.env.METRC_USER_KEY!;
  }

  private async makeRequest(endpoint: string, method: string = 'GET', data?: any) {
    const url = `${this.baseUrl}${endpoint}`;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(`${this.apiKey}:${this.userKey}`).toString('base64')}`,
    };

    const config: RequestInit = {
      method,
      headers,
      ...(data && { body: JSON.stringify(data) }),
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`METRC API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('METRC API request failed:', error);
      throw error;
    }
  }

  // Get active packages (inventory)
  async getPackages(licenseNumber: string): Promise<MetrcPackage[]> {
    return this.makeRequest(`/packages/v1/active?licenseNumber=${licenseNumber}`);
  }

  // Get package by label
  async getPackageByLabel(label: string, licenseNumber: string): Promise<MetrcPackage> {
    return this.makeRequest(`/packages/v1/${label}?licenseNumber=${licenseNumber}`);
  }

  // Record a sale
  async recordSale(sales: MetrcSale[], licenseNumber: string): Promise<void> {
    return this.makeRequest(`/sales/v1/receipts?licenseNumber=${licenseNumber}`, 'POST', sales);
  }

  // Update package (when inventory changes)
  async updatePackage(packageLabel: string, licenseNumber: string, updates: Partial<MetrcPackage>): Promise<void> {
    return this.makeRequest(`/packages/v1/change/locations?licenseNumber=${licenseNumber}`, 'POST', [
      {
        label: packageLabel,
        ...updates,
      },
    ]);
  }

  // Get lab results for package
  async getLabResults(packageLabel: string, licenseNumber: string) {
    return this.makeRequest(`/labtests/v1/results?packageLabel=${packageLabel}&licenseNumber=${licenseNumber}`);
  }

  // Validate package for sale
  async validatePackageForSale(packageLabel: string, licenseNumber: string): Promise<boolean> {
    try {
      const packageInfo = await this.getPackageByLabel(packageLabel, licenseNumber);

      // Check if package is active and has sufficient quantity
      if (!packageInfo.isActive || packageInfo.quantity <= 0) {
        return false;
      }

      // Check if package has valid lab results
      const labResults = await this.getLabResults(packageLabel, licenseNumber);
      return labResults && labResults.length > 0;
    } catch (error) {
      console.error('Package validation failed:', error);
      return false;
    }
  }
}

export const metrcService = new MetrcService();

// Utility functions for METRC integration
export const trackInventoryChange = async (
  productId: string,
  variantId: string,
  quantityChange: number,
  reason: string,
  licenseNumber: string
) => {
  try {
    // This would be called whenever inventory changes
    // Implementation would depend on how you map your products to METRC packages
    console.log(`Tracking inventory change for product ${productId}:`, {
      quantityChange,
      reason,
      timestamp: new Date().toISOString(),
    });

    // In a real implementation, you would:
    // 1. Find the METRC package label for this product/variant
    // 2. Update the package in METRC
    // 3. Log the change in your audit trail
  } catch (error) {
    console.error('Failed to track inventory change in METRC:', error);
    throw error;
  }
};

export const recordOrderSale = async (orderId: string, licenseNumber: string) => {
  try {
    // This would be called when an order is delivered
    // Implementation would map order items to METRC sales
    console.log(`Recording sale for order ${orderId} in METRC`);

    // In a real implementation, you would:
    // 1. Get order details from database
    // 2. Map each order item to METRC package
    // 3. Submit sales record to METRC
    // 4. Update inventory quantities
  } catch (error) {
    console.error('Failed to record sale in METRC:', error);
    throw error;
  }
};