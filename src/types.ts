export interface TaxBracket {
    upper: number;
    rate: number;
    deduction: number;
  }
  
  export interface TaxCalculationResult {
    income: number;
    deductions: number;
    dependents: number;
    taxableIncome: number;
    nationalTax: number;
    surtax: number;
    localTax: number;
    healthInsurance: number;
    pension: number;
    employmentInsurance: number;
    totalDeductions: number;
    netIncome: number;
  }