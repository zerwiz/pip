---
name: finance-tools
description: Tools for personal finance management, budgeting, and financial calculations.
---

# Finance Tools

## Setup

```bash
# Optional: Install pandas for data handling
pip install pandas
```

## Financial Calculations

```bash
# Calculate compound interest
python -c "P=10000; r=0.05; n=12; t=10; print(P*(1+r/n)**(n*t))"

# Calculate loan payments (PMT)
python -c "r=0.04/12; n=30*12; P=300000; print(P*(r*(1+r)**n)/((1+r)**n-1))"
```

## Budgeting and Tracking

```bash
# Summarize expenses from a CSV
python -c "import pandas as pd; df=pd.read_csv('expenses.csv'); print(df.groupby('Category')['Amount'].sum())"
```

## Workflow

1. **Define Goal** — Determine the financial question (e.g., "How much will I save?", "What is my monthly payment?").
2. **Gather Data** — Collect interest rates, principal amounts, or expense logs.
3. **Execute Calculation** — Use Python or specialized scripts to perform the math.
4. **Analyze Results** — Review the output to make informed financial decisions.

## Notes

- Always double-check interest rate conventions (annual vs. monthly).
- Use `pandas` for handling large sets of transaction data.
- Integrate with `stock-analysis` for a full financial picture.
