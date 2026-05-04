# Investigation Report: Custom Tools Migration Warning

## Overview
When running `just run-pi "agent-team,theme-cycler"`, the following warning was previously displayed:
> `Warning: Project tools/ directory contains custom tools. Custom tools have been merged into extensions.`

This report explains why this warning appeared, what the files in your `.pi/scripts/` directory (formerly `.pi/tools/`) are doing, and how the issue was resolved.

---

## 1. Why the Warning was Triggered
The Pi Coding Agent (version 0.35.0+) unified the legacy **Custom Tools** and **Hooks** systems into a single **Extensions** system. 

The agent's loader scans for a directory named `tools/` (either in `~/.pi/agent/tools/` or your project's `.pi/tools/`). If it finds one, it assumes you are using the deprecated "Custom Tools" format and issues this warning to encourage migration to the `extensions/` directory and the new `ExtensionAPI`.

Even if the directory doesn't contain legacy TypeScript tools, the mere existence of the directory name `tools/` triggers the alert.

---

## 2. Analysis of `.pi/scripts/`
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

## 3. Resolution
The warning was a **false positive** triggered by the directory naming convention. 

### Action Taken
To stop the warning while preserving your logic, the `.pi/tools/` directory has been renamed to **`.pi/scripts/`**. 

Since the Pi Coding Agent does not scan the `scripts/` directory for legacy tools, the warning is no longer triggered, and your Python management utilities remain fully functional.

---

## References
- **Migration Guide:** [Pi Coding Agent Extensions Migration](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/CHANGELOG.md#extensions-migration)
- **Extension Documentation:** [Pi Extensions API](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/docs/extensions.md)
