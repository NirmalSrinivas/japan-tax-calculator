import { calculateJapanTax } from '../src';

describe('calculateJapanTax', () => {
  it('should calculate taxes correctly for low income', () => {
    const result = calculateJapanTax(1800000);
    expect(result.nationalTax).toBe(90000); // 5% of 1.8M
    expect(result.taxableIncome).toBe(1800000);
  });

  it('should handle deductions correctly', () => {
    const result = calculateJapanTax(5000000, 1000000);
    expect(result.taxableIncome).toBe(4000000);
  });

  it('should handle dependent deductions', () => {
    const result = calculateJapanTax(5000000, 0, 2);
    expect(result.taxableIncome).toBe(4240000); // 5M - (380K * 2)
  });

  it('should return zero tax for zero income', () => {
    const result = calculateJapanTax(0);
    expect(result.nationalTax).toBe(0);
    expect(result.totalDeductions).toBe(0);
  });
});