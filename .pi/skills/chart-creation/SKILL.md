---
name: chart-creation
description: Create data visualizations using matplotlib, mermaid, or similar tools.
---

# Chart Creation

## Setup

```bash
# Install matplotlib for Python
pip install matplotlib

# No setup for Mermaid (renders in Markdown)
```

## Create Mermaid Diagrams

```bash
# Generate a flowchart
echo "graph TD; A-->B; B-->C; C-->D;" | llm "Add a node E and make it a decision point."
```

## Create Python Plots

```bash
# Plot simple line chart
python -c "import matplotlib.pyplot as plt; plt.plot([1,2,3], [4,5,6]); plt.savefig('plot.png')"

# Plot bar chart from data
python -c "import matplotlib.pyplot as plt; data={'A':10, 'B':20}; plt.bar(data.keys(), data.values()); plt.savefig('bar.png')"
```

## Workflow

1. **Gather Data** — Use `spreadsheet-processing` or `web_search` to get numbers.
2. **Choose Chart Type** — Select the best visualization (line, bar, pie, flowchart).
3. **Generate Code** — Create the Python or Mermaid script.
4. **Render** — Execute the code to produce an image or Markdown block.
5. **Review** — Ensure the visualization is clear and accurate.

## Notes

- Mermaid is best for structural diagrams (flows, sequences, Gantt).
- Matplotlib/Seaborn are best for statistical data visualization.
- Use `vision-language` to verify the generated charts.
