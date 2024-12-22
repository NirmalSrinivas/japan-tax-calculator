# Japan Tax Calculator

A comprehensive TypeScript/JavaScript package for calculating Japanese income tax and social security deductions. This calculator handles national tax, local tax, and social security contributions based on the latest Japanese tax regulations.

[![npm version](https://img.shields.io/npm/v/japan-tax-calculator.svg)](https://www.npmjs.com/package/japan-tax-calculator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🧮 Accurate Japanese income tax calculation
- 📊 Progressive tax rate implementation
- 👨‍👩‍👧‍👦 Support for dependent deductions
- 🏥 Social security calculations (health insurance, pension, employment insurance)
- 📝 TypeScript support with full type definitions
- ✅ Comprehensive test coverage

## Table of Contents

- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [API Documentation](#api-documentation)
- [Detailed Examples](#detailed-examples)
- [Tax Brackets](#tax-brackets-2024)
- [Social Insurance Rates](#social-insurance-rates)
- [Contributing](#contributing)
- [Support](#support)
- [License](#license)

## Installation

Using npm:
```bash
npm install japan-tax-calculator
```

Using yarn:
```bash
yarn add japan-tax-calculator
```

Using pnpm:
```bash
pnpm add japan-tax-calculator
```

## Basic Usage

```typescript
import { calculateJapanTax } from 'japan-tax-calculator';

// Basic usage with just income
const basicResult = calculateJapanTax(5000000);
console.log(basicResult.netIncome);

// With deductions and dependents
const result = calculateJapanTax(5000000, 1000000, 2);
console.log(result);
```

## API Documentation

### Interfaces

#### TaxBracket
Represents a tax bracket in the Japanese tax system.

```typescript
interface TaxBracket {
  upper: number;    // Upper limit of the tax bracket in JPY
  rate: number;     // Tax rate for this bracket (e.g., 0.05 for 5%)
  deduction: number; // Standard deduction amount for this bracket
}
```

#### TaxCalculationResult
Contains the detailed breakdown of tax calculations.

```typescript
interface TaxCalculationResult {
  income: number;            // Gross annual income
  deductions: number;        // Total deductions applied
  dependents: number;        // Number of dependents claimed
  taxableIncome: number;     // Income after all deductions
  nationalTax: number;       // National income tax
  surtax: number;           // Surtax (2.1% of national tax)
  localTax: number;         // Local inhabitant tax
  healthInsurance: number;   // Health insurance premium
  pension: number;          // Pension insurance premium
  employmentInsurance: number; // Employment insurance premium
  totalDeductions: number;   // Sum of all deductions
  netIncome: number;        // Final take-home income
}
```

### Functions

#### calculateJapanTax(income, deductions?, dependents?)
Calculates Japanese income tax and social security deductions.

##### Parameters

| Parameter  | Type     | Required | Default | Description                          |
|------------|----------|----------|---------|--------------------------------------|
| income     | number   | Yes      | -       | Annual income in JPY                 |
| deductions | number   | No       | 0       | Additional deductions in JPY         |
| dependents | number   | No       | 0       | Number of dependent family members   |

##### Returns
Returns a `TaxCalculationResult` object with the following properties:

| Property           | Type   | Description                                    |
|--------------------|--------|------------------------------------------------|
| income             | number | Input annual income                            |
| deductions         | number | Input deductions amount                        |
| dependents         | number | Number of dependents                           |
| taxableIncome      | number | Income after all deductions                    |
| nationalTax        | number | National income tax amount                     |
| surtax             | number | Additional tax on national tax (2.1%)          |
| localTax           | number | Local inhabitant tax (10%)                     |
| healthInsurance    | number | Health insurance premium                       |
| pension            | number | Pension insurance premium                      |
| employmentInsurance| number | Employment insurance premium                   |
| totalDeductions    | number | Sum of all taxes and insurance premiums        |
| netIncome          | number | Final income after all deductions              |

### Constants

#### TAX_RATES
Array of tax brackets used in calculations:
```typescript
const TAX_RATES: TaxBracket[] = [
  { upper: 1950000, rate: 0.05, deduction: 0 },
  { upper: 3300000, rate: 0.10, deduction: 97500 },
  { upper: 6950000, rate: 0.20, deduction: 427500 },
  { upper: 9000000, rate: 0.23, deduction: 636000 },
  { upper: 18000000, rate: 0.33, deduction: 1536000 },
  { upper: 40000000, rate: 0.40, deduction: 2796000 },
  { upper: Infinity, rate: 0.45, deduction: 4796000 }
];
```

#### Other Constants
```typescript
const DEPENDENT_DEDUCTION = 380000;        // Per dependent deduction amount
const SURTAX_RATE = 0.021;                // Surtax rate
const LOCAL_TAX_RATE = 0.10;              // Local tax rate
const HEALTH_INSURANCE_RATE = 0.05;       // Health insurance rate
const PENSION_RATE = 0.0915;              // Pension insurance rate
const EMPLOYMENT_INSURANCE_RATE = 0.005;   // Employment insurance rate
```

## Detailed Examples

### 1. Basic Salary Calculation
```typescript
import { calculateJapanTax } from 'japan-tax-calculator';

// Calculate tax for ¥4,000,000 annual salary
const result = calculateJapanTax(4000000);

console.log(`Annual Salary: ¥${result.income.toLocaleString()}`);
console.log(`National Tax: ¥${result.nationalTax.toLocaleString()}`);
console.log(`Net Income: ¥${result.netIncome.toLocaleString()}`);
```

### 2. With Additional Deductions
```typescript
// Calculate with ¥500,000 in additional deductions
const withDeductions = calculateJapanTax(4000000, 500000);

console.log(`Taxable Income: ¥${withDeductions.taxableIncome.toLocaleString()}`);
console.log(`Total Deductions: ¥${withDeductions.totalDeductions.toLocaleString()}`);
```

### 3. Family with Dependents
```typescript
// Family with 2 dependents
const familyTax = calculateJapanTax(6000000, 0, 2);

console.log(`Dependent Deductions: ¥${(2 * 380000).toLocaleString()}`);
console.log(`Net Family Income: ¥${familyTax.netIncome.toLocaleString()}`);
```

### 4. Complete Tax Breakdown
```typescript
const breakdown = calculateJapanTax(8000000);

console.log('Tax Breakdown:');
console.log(`- National Tax: ¥${breakdown.nationalTax.toLocaleString()}`);
console.log(`- Surtax: ¥${breakdown.surtax.toLocaleString()}`);
console.log(`- Local Tax: ¥${breakdown.localTax.toLocaleString()}`);
console.log('\nSocial Security:');
console.log(`- Health Insurance: ¥${breakdown.healthInsurance.toLocaleString()}`);
console.log(`- Pension: ¥${breakdown.pension.toLocaleString()}`);
console.log(`- Employment Insurance: ¥${breakdown.employmentInsurance.toLocaleString()}`);
```

## Tax Brackets (2024)

| Taxable Income (JPY)   | Tax Rate | Deduction Amount  |
|------------------------|----------|-------------------|
| Up to ¥1,950,000       | 5%       | ¥0                |
| Up to ¥3,300,000       | 10%      | ¥97,500           |
| Up to ¥6,950,000       | 20%      | ¥427,500          |
| Up to ¥9,000,000       | 23%      | ¥636,000          |
| Up to ¥18,000,000      | 33%      | ¥1,536,000        |
| Up to ¥40,000,000      | 40%      | ¥2,796,000        |
| Over ¥40,000,000       | 45%      | ¥4,796,000        |

## Social Insurance Rates

- Health Insurance: 5% (approximate, varies by prefecture)
- Pension Insurance: 9.15%
- Employment Insurance: 0.5%

## Error Handling

The function will throw an Error in the following cases:
- If unable to determine the tax bracket
- If income is negative
- If deductions are negative
- If number of dependents is negative

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Support

If you encounter any issues or have questions:
1. Check the [GitHub Issues](https://github.com/yourusername/japan-tax-calculator/issues)
2. Open a new issue if needed
3. Join our community discussions

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by [Nirmalkumar]