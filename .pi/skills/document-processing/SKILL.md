---
name: document-processing
description: Process and extract information from PDF and DOCX documents.
---

# Document Processing

## Setup

```bash
# Install required libraries
pip install pypdf2 python-docx
```

## Extract Text from PDF

```bash
# Extract text from all pages
python -c "import PyPDF2; reader=PyPDF2.PdfReader('doc.pdf'); print(' '.join([p.extract_text() for p in reader.pages]))"

# Use unpdf (if available)
unpdf doc.pdf
```

## Extract Text from DOCX

```bash
# Extract text from a Word document
python -c "import docx; doc=docx.Document('doc.docx'); print(' '.join([p.text for p in doc.paragraphs]))"
```

## Workflow

1. **Locate Document** — Identify the PDF or DOCX file path.
2. **Choose Tool** — Use `PyPDF2`, `python-docx`, or `unpdf` based on file type and complexity.
3. **Extraction** — Run the extraction script or command.
4. **Processing** — Use the extracted text for summarization, analysis, or translation.

## Notes

- Supports basic text extraction. Complex layouts or scanned PDFs may require OCR.
- Use `content-analysis` to process the extracted text.
- `unpdf` is a fast alternative for pure text extraction from PDFs.
