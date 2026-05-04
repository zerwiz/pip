# Investigation Report: Custom Tools Migration Warning

## Overview
When running `just run-pi "agent-team,theme-cycler"`, the following warning is displayed:
> `Warning: Project tools/ directory contains custom tools. Custom tools have been merged into extensions.`

This report explains why this warning appears, what the files in your `.pi/tools` directory are doing, and how to address the warning.

---

## 1. Why the Warning is Triggered
The Pi Coding Agent (version 0.35.0+) unified the legacy **Custom Tools** and **Hooks** systems into a single **Extensions** system. 

The agent's loader scans for a directory named `tools/` (either in `~/.pi/agent/tools/` or your project's `.pi/tools/`). If it finds one, it assumes you are using the deprecated "Custom Tools" format and issues this warning to encourage migration to the `extensions/` directory and the new `ExtensionAPI`.

In your case, you have a directory at `/home/zerwiz/pip/.pi/tools/`. Even though it doesn't contain legacy TypeScript tools, the mere existence of the directory name triggers the alert.

---

## 2. Analysis of `.pi/tools/`
The files in this directory are part of a custom Python package management strategy for your "PIP" platform. They are **not** legacy Pi Coding Agent tools, but rather utility scripts for the local environment.

### A. `pip-manager.sh`
This is a centralized bash script for managing Python packages.
- **Purpose:** Routes all `pip` operations through a single, controlled script to ensure consistency across the platform.
- **Key Features:**
    - **Environment Isolation:** Creates and manages a virtual environment (`.venv`) in the project root.
    - **Smart Installation:** Attempts several installation methods (prefix to venv, user-space, system-level) to ensure packages are successfully added.
    - **Maintenance:** Includes functions to clean the pip cache, verify the installation, and batch-install from requirements files.
    - **Safety:** Explicitly avoids non-standard pip locations and prefers `python3 -m pip` to ensure the correct Python version is targeted.

### B. `py_requirements.txt`
This file serves as the manifest for the `pip-manager.sh` script.
- **Standardized Locations:** It includes strict instructions on which Python/Pip paths to use and which to avoid (e.g., avoiding `brew` without isolation).
- **Managed Packages:**
    - **Core:** `pip`, `setuptools`, `wheel`, `build`.
    - **Platform:** `pip-manager`, `pip-shims`.
    - **Dev Tools:** `black`, `flake8`, `pytest`, `mypy`, `ruff`, `isort`.
    - **Infrastructure:** `pyyaml`, `requests`, `httpx`.

---

## 3. Findings & Diagnostic
The warning is a **false positive** in the sense that you are not using "deprecated tools," but it is **correctly triggered** by the directory naming convention.

### Current Conflict
- **Pi Agent Expectation:** `.pi/tools/` should contain legacy `.ts` files for the LLM to use as tools.
- **Your Usage:** `.pi/tools/` contains bash/text utilities for Python environment management.

---

## 4. Recommendations

### Option A: Rename the Directory (Recommended)
To stop the warning without changing your logic, rename the `.pi/tools/` directory to something that doesn't conflict with the agent's reserved names.
- **New Path:** `.pi/util-scripts/` or `.pi/env-tools/`
- **Action:** Rename the folder and update any references to `pip-manager.sh` (e.g., in `justfile` or other scripts).

### Option B: Ignore the Warning
If you don't mind the console noise, you can leave it as-is. The agent will attempt to load the files as tools, fail (since they aren't `.ts` files), and continue normally.

### Option C: Migrate to Extensions
If you eventually want these scripts to be usable **as tools by the agent**, you would move them to `extensions/` and wrap them in a TypeScript extension that uses `pi.registerTool()` and `pi.exec()` to call the shell script.

---

## References
- **Migration Guide:** [Pi Coding Agent Extensions Migration](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/CHANGELOG.md#extensions-migration)
- **Extension Documentation:** [Pi Extensions API](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/docs/extensions.md)
