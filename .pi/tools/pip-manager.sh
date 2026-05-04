#!/bin/bash
# =============================================================================
# PIP Manager - Centralized Package Management Strategy
# =============================================================================
# This script provides unified pip management across the entire PIP platform
# All pip operations are routed through this centralized location
# =============================================================================

set -euo pipefail

# =============================================================================
# CONFIGURATION
# =============================================================================

# Standard pip locations (do NOT hardcode these - use variables)
readonly PIP_CMD="pip"
readonly PIP_PATH="$(command -v pip3 || command -v pip)"
readonly PROJECT_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
readonly CACHE_DIR="$PROJECT_ROOT/.cache/pip-packages"
readonly VIRTUAL_ENV="${VIRTUAL_ENV:-$PROJECT_ROOT/.venv}"
readonly PYTHON_PATH="${PYTHONPATH:-}"

# =============================================================================
# FUNCTIONS
# =============================================================================

# Install pip itself if not available
ensure_pip() {
    if ! command -v pip3 &>/dev/null; then
        echo "Installing pip..."
        python3 -m ensurepip --upgrade || python -m ensurepip --upgrade
    fi
}

# Install package with proper path handling
install_package() {
    local package="$1"
    shift
    local args=("$@")
    
    echo "Installing: $package ${args[*]:-}"
    python3 -m pip install -q --prefix "$VIRTUAL_ENV" "$package "${args[@]}:+" 2>/dev/null || \
    python3 -m pip install -q --user "$package" "$@ 2>/dev/null || \
    python3 -m pip install -q "$package $@" 2>/dev/null || {
        echo "Install failed, trying system pip..."
        pip3 install -q "$package $@" 2>/dev/null || \
        pip install -q --break-system-packages "$package $@" 2>/dev/null
    }
}

# Uninstall package
uninstall_package() {
    local package="$1"
    shift
    local args=("$@")
    
    echo "Uninstalling: $package"
    python3 -m pip uninstall -q -y "$package"${args[*]:-} || true
}

# Check if package is installed
check_package() {
    local package="$1"
    python3 -c "import $package" 2>/dev/null && echo "installed" || echo "not_installed"
}

# =============================================================================
# MAINTENANCE OPERATIONS
# =============================================================================

# Clean pip cache
clean_cache() {
    echo "Cleaning pip cache..."
    python3 -m pip cache purge 2>/dev/null || true
    rm -rf "$CACHE_DIR"/* 2>/dev/null || true
}

# Install dependencies from requirements.txt
install_requirements() {
    local requirements_file="$1"
    echo "Installing from: $requirements_file"
    
    [ -f "$requirements_file" ] || return 0
    
    while IFS= read -r line || [ -n "$line" ]; do
        # Skip empty lines and comments
        line=$(echo "$line" | sed 's/#.*$//' | xargs)  # Remove comments leading/trailing whitespace
        [[ -z "$line" ]] && continue
        [[ "$line" == -* ]] && continue  # Skip pip options
        
        install_package "$line"
    done < "$requirements_file"
}

# =============================================================================
# ENVIRONMENT SETUP
# =============================================================================

setup_env() {
    echo "Setting up PIP environment..."
    
    # Create cache directory
    mkdir -p "$CACHE_DIR"
    
    # Ensure venv exists
    if [ ! -d "$VIRTUAL_ENV" ]; then
        echo "Creating virtual environment at $VIRTUAL_ENV"
        python3 -m venv "$VIRTUAL_ENV"
    fi
    
    # Upgrade pip in venv
    python3 -m venv -q "$VIRTUAL_ENV"
    source "$VIRTUAL_ENV/bin/activate" 2>/dev/null || true
    python -m pip install --upgrade pip setuptools wheel 2>/dev/null || true
}

# =============================================================================
# MAIN
# =============================================================================

main() {
    local subcommand="${1:-help}"
    shift 2>/dev/null || true
    
    case "$subcommand" in
        install)
            ensure_pip
            install_package "$@"
            ;;
        uninstall)
            ensure_pip
            uninstall_package "$@"
            ;;
        check)
            check_package "$@"
            ;;
        setup)
            setup_env
            ;;
        clean-cache)
            clean_cache
            ;;
        verify)
            echo "Verifying pip installation..."
            command -v pip path
            echo "Pip version:"
            ${PIP_CMD} --version
            echo "Cache directory: $CACHE_DIR"
            ;;
        help|*)
            echo "Usage: $(basename "$0") <command> [options]"
            echo ""
            echo "Commands:"
            echo "  install <package> [options]  - Install a package"
            echo "  uninstall <package> [options] - Uninstall a package"
            echo "  check <package>              - Check if package is installed"
            echo "  setup                        - Setup environment and venv"
            echo "  clean-cache                  - Clean pip cache"
            echo "  verify                       - Verify pip installation"
            echo "  help                         - Show this help message"
            echo ""
            echo "Environment:"
            echo "  VIRTUAL_ENV: $VIRTUAL_ENV"
            echo "  CACHE_DIR: $CACHE_DIR"
            ;;
    esac
}

main "$@"
