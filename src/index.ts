import { TaxCalculationResult } from './types';
import {
  TAX_RATES,
  DEPENDENT_DEDUCTION,
  SURTAX_RATE,
  LOCAL_TAX_RATE,
  HEALTH_INSURANCE_RATE,
  PENSION_RATE,
  EMPLOYMENT_INSURANCE_RATE,
} from './constants';

export * from './types';

export function calculateJapanTax(
  income: number,
  deductions = 0,
  dependents = 0
): TaxCalculationResult {
  // Calculate taxable income
  const dependentDeduction = dependents * DEPENDENT_DEDUCTION;
  const taxableIncome = Math.max(income - deductions - dependentDeduction, 0);

  // Find the appropriate tax bracket
  const bracket = TAX_RATES.find((b) => taxableIncome <= b.upper);
  if (!bracket) throw new Error('Unable to determine tax bracket');

  // Calculate taxes
  const nationalTax = Math.max(taxableIncome * bracket.rate - bracket.deduction, 0);
  const surtax = nationalTax * SURTAX_RATE;
  const localTax = taxableIncome * LOCAL_TAX_RATE;

  // Social security contributions
  const healthInsurance = income * HEALTH_INSURANCE_RATE;
  const pension = income * PENSION_RATE;
  const employmentInsurance = income * EMPLOYMENT_INSURANCE_RATE;

  // Total deductions
  const totalDeductions = Math.round(
    nationalTax + surtax + localTax + healthInsurance + pension + employmentInsurance
  );

  return {
    income,
    deductions,
    dependents,
    taxableIncome,
    nationalTax: Math.round(nationalTax),
    surtax: Math.round(surtax),
    localTax: Math.round(localTax),
    healthInsurance: Math.round(healthInsurance),
    pension: Math.round(pension),
    employmentInsurance: Math.round(employmentInsurance),
    totalDeductions,
    netIncome: income - totalDeductions,
  };
}