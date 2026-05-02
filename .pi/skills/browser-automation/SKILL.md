---
name: browser-automation
description: Automate web interactions and data extraction using Playwright.
---

# Browser Automation

## Setup

```bash
# Install Playwright
npm install -g playwright
playwright install
```

## Basic Interactions

```bash
# Take a screenshot of a website
playwright screenshot https://example.com example.png

# Search and extract data (requires script)
# playwright script.js --query "term"
```

## Complex Workflows

```bash
# Example script: Login and scrape
# const { chromium } = require('playwright');
# (async () => {
#   const browser = await chromium.launch();
#   const page = await browser.newPage();
#   await page.goto('https://example.com/login');
#   await page.fill('#user', 'username');
#   await page.click('#submit');
#   const data = await page.textContent('.dashboard');
#   console.log(data);
#   await browser.close();
# })();
```

## Workflow

1. **Identify Task** — Determine the browser actions to be automated (scraping, testing, form filling).
2. **Script Design** — Map out the sequence of clicks, inputs, and waits.
3. **Implementation** — Write the Playwright script.
4. **Execution** — Run the script and handle errors or CAPTCHAs.
5. **Validation** — Verify the output or state change.

## Notes

- Playwright supports multiple browsers (Chromium, Firefox, WebKit).
- Use `headless: true` for faster execution in CLI environments.
- Great for testing UI/UX designs created with `ui-design`.
