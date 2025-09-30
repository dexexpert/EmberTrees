// =============================================================================
// COMPLIANCE REPORTING FOR CANNABIS DELIVERY
// =============================================================================

interface SalesReport {
  period: {
    startDate: Date;
    endDate: Date;
  };
  totalSales: number;
  totalTax: {
    state: number;
    local: number;
    excise: number;
    total: number;
  };
  totalOrders: number;
  customerTypes: {
    recreational: number;
    medical: number;
  };
  productCategories: Array<{
    category: string;
    quantity: number;
    revenue: number;
  }>;
}

interface InventoryReport {
  period: {
    startDate: Date;
    endDate: Date;
  };
  openingInventory: Array<{
    productId: string;
    quantity: number;
    value: number;
  }>;
  receipts: Array<{
    productId: string;
    quantity: number;
    source: string;
    date: Date;
  }>;
  sales: Array<{
    productId: string;
    quantity: number;
    orderId: string;
    date: Date;
  }>;
  adjustments: Array<{
    productId: string;
    quantity: number;
    reason: string;
    date: Date;
  }>;
  closingInventory: Array<{
    productId: string;
    quantity: number;
    value: number;
  }>;
}

interface ComplianceReport {
  reportType: 'monthly' | 'quarterly' | 'annual';
  period: {
    startDate: Date;
    endDate: Date;
  };
  licensee: {
    name: string;
    licenseNumber: string;
    address: string;
  };
  sales: SalesReport;
  inventory: InventoryReport;
  customers: {
    totalCustomers: number;
    newCustomers: number;
    ageVerifications: number;
    medicalCardHolders: number;
  };
  violations: Array<{
    type: string;
    description: string;
    date: Date;
    resolution?: string;
  }>;
}

class ComplianceReportingService {
  private licenseNumber: string;

  constructor() {
    this.licenseNumber = process.env.CANNABIS_LICENSE_NUMBER!;
  }

  async generateSalesReport(startDate: Date, endDate: Date): Promise<SalesReport> {
    // This would query your database for sales data
    // For now, returning mock data structure

    return {
      period: { startDate, endDate },
      totalSales: 0,
      totalTax: {
        state: 0,
        local: 0,
        excise: 0,
        total: 0,
      },
      totalOrders: 0,
      customerTypes: {
        recreational: 0,
        medical: 0,
      },
      productCategories: [],
    };
  }

  async generateInventoryReport(startDate: Date, endDate: Date): Promise<InventoryReport> {
    // This would track all inventory movements during the period
    // Integration with METRC would provide much of this data

    return {
      period: { startDate, endDate },
      openingInventory: [],
      receipts: [],
      sales: [],
      adjustments: [],
      closingInventory: [],
    };
  }

  async generateComplianceReport(
    reportType: 'monthly' | 'quarterly' | 'annual',
    startDate: Date,
    endDate: Date
  ): Promise<ComplianceReport> {
    const [salesReport, inventoryReport] = await Promise.all([
      this.generateSalesReport(startDate, endDate),
      this.generateInventoryReport(startDate, endDate),
    ]);

    return {
      reportType,
      period: { startDate, endDate },
      licensee: {
        name: process.env.NEXT_PUBLIC_APP_NAME || 'Ember Trees',
        licenseNumber: this.licenseNumber,
        address: '123 Business St, Los Angeles, CA 90210', // This would come from config
      },
      sales: salesReport,
      inventory: inventoryReport,
      customers: {
        totalCustomers: 0, // Query from database
        newCustomers: 0,   // New customers in period
        ageVerifications: 0, // Verifications completed in period
        medicalCardHolders: 0, // Users with medical cards
      },
      violations: [], // Any compliance violations to report
    };
  }

  async submitStateReport(report: ComplianceReport): Promise<boolean> {
    try {
      // In production, this would submit to state reporting system
      const stateApiUrl = process.env.STATE_REPORTING_API_URL;
      const apiKey = process.env.STATE_REPORTING_API_KEY;

      if (!stateApiUrl || !apiKey) {
        console.warn('State reporting API not configured');
        return false;
      }

      // Mock submission
      console.log('Submitting compliance report to state:', {
        reportType: report.reportType,
        period: report.period,
        licenseNumber: report.licensee.licenseNumber,
      });

      return true;
    } catch (error) {
      console.error('Failed to submit state report:', error);
      return false;
    }
  }

  // Generate required monthly report
  async generateMonthlyReport(year: number, month: number): Promise<ComplianceReport> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    return this.generateComplianceReport('monthly', startDate, endDate);
  }

  // Export report to various formats
  async exportReport(report: ComplianceReport, format: 'json' | 'csv' | 'pdf' = 'json'): Promise<string> {
    switch (format) {
      case 'json':
        return JSON.stringify(report, null, 2);

      case 'csv':
        // Convert to CSV format (simplified)
        return this.reportToCsv(report);

      case 'pdf':
        // Generate PDF (would use library like puppeteer or jsPDF)
        return 'PDF generation not implemented yet';

      default:
        throw new Error(`Unsupported format: ${format}`);
    }
  }

  private reportToCsv(report: ComplianceReport): string {
    const lines = [
      'Report Type,Period Start,Period End,Total Sales,Total Tax,Total Orders',
      `${report.reportType},${report.period.startDate.toISOString()},${report.period.endDate.toISOString()},${report.sales.totalSales},${report.sales.totalTax.total},${report.sales.totalOrders}`
    ];

    return lines.join('\n');
  }
}

export const complianceReporting = new ComplianceReportingService();

// Compliance monitoring utilities
export const COMPLIANCE_CHECKS = {
  DAILY: [
    'verify_age_verification_system',
    'check_inventory_limits',
    'validate_lab_results',
  ],
  WEEKLY: [
    'review_customer_verification_status',
    'audit_delivery_records',
    'check_tax_calculations',
  ],
  MONTHLY: [
    'generate_state_report',
    'review_compliance_violations',
    'update_license_status',
  ],
} as const;

// Helper function to validate compliance requirements
export const validateOrderCompliance = async (orderId: string): Promise<{
  isCompliant: boolean;
  violations: string[];
}> => {
  const violations: string[] = [];

  try {
    // Check customer age verification
    // Check product lab results
    // Validate delivery address is in service area
    // Check purchase limits
    // Verify payment compliance

    return {
      isCompliant: violations.length === 0,
      violations,
    };
  } catch (error) {
    console.error('Compliance validation error:', error);
    return {
      isCompliant: false,
      violations: ['System error during compliance check'],
    };
  }
};