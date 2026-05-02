---
name: spreadsheet-processing
description: Process and analyze Excel (XLSX) and CSV data using pandas.
---

# Spreadsheet Processing

## Setup

```bash
# Install pandas and openpyxl
pip install pandas openpyxl
```

## Data Extraction and Cleaning

```bash
# Load and display the first 5 rows
python -c "import pandas as pd; df=pd.read_excel('data.xlsx'); print(df.head())"

# Filter data
python -c "import pandas as pd; df=pd.read_csv('data.csv'); print(df[df['Status'] == 'Active'])"
```

## Data Summarization

```bash
# Group and aggregate data
python -c "import pandas as pd; df=pd.read_excel('sales.xlsx'); print(df.groupby('Region')['Revenue'].sum())"
```

## Workflow

1. **Data Ingestion** — Load the CSV or XLSX file into a pandas DataFrame.
2. **Cleaning** — Remove duplicates, handle missing values, and fix formatting.
3. **Analysis** — Use grouping, filtering, and aggregation to find insights.
4. **Export** — Save the processed data back to a file or use it for `chart-creation`.

## Notes

- `pandas` is the industry standard for data manipulation in Python.
- `openpyxl` is required for reading and writing `.xlsx` files.
- Great for large datasets that are difficult to manage manually in Excel.
