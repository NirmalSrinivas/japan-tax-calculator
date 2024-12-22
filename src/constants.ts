import { TaxBracket } from './types';

export const TAX_RATES: TaxBracket[] = [
  { upper: 1950000, rate: 0.05, deduction: 0 },
  { upper: 3300000, rate: 0.10, deduction: 97500 },
  { upper: 6950000, rate: 0.20, deduction: 427500 },
  { upper: 9000000, rate: 0.23, deduction: 636000 },
  { upper: 18000000, rate: 0.33, deduction: 1536000 },
  { upper: 40000000, rate: 0.40, deduction: 2796000 },
  { upper: Infinity, rate: 0.45, deduction: 4796000 },
];

export const DEPENDENT_DEDUCTION = 380000;
export const SURTAX_RATE = 0.021;
export const LOCAL_TAX_RATE = 0.10;
export const HEALTH_INSURANCE_RATE = 0.05;
export const PENSION_RATE = 0.0915;
export const EMPLOYMENT_INSURANCE_RATE = 0.005;