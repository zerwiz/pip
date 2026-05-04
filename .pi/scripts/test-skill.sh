#!/bin/bash
# test-skill.sh - Basic validation for PIP skills
# Usage: ./test-skill.sh <skill-name>

set -e

SKILL_NAME="$1"
BASE_DIR="/home/zerwiz/pip/.pi/skills"
SKILL_DIR="$BASE_DIR/$SKILL_NAME"

if [ -z "$SKILL_NAME" ]; then
    echo "Usage: $0 <skill-name>"
    echo "Available skills:"
    ls -1 "$BASE_DIR" | head -20
    exit 1
fi

if [ ! -d "$SKILL_DIR" ]; then
    echo "❌ Skill directory not found: $SKILL_DIR"
    exit 1
fi

echo "=== Testing skill: $SKILL_NAME ==="
echo ""

# Test 1: Check skill.json exists and is valid JSON
echo "[1/5] Checking skill.json..."
if [ -f "$SKILL_DIR/skill.json" ]; then
    python3 -c "import json; json.load(open('$SKILL_DIR/skill.json')); print('  ✅ skill.json is valid JSON')"
else
    echo "  ⚠️  skill.json not found"
fi

# Test 2: Check SKILL.md exists
echo "[2/5] Checking SKILL.md..."
if [ -f "$SKILL_DIR/SKILL.md" ]; then
    echo "  ✅ SKILL.md exists ($(wc -l < "$SKILL_DIR/SKILL.md") lines)"
else
    echo "  ⚠️  SKILL.md not found"
fi

# Test 3: Check scripts exist and are syntactically valid
echo "[3/5] Checking scripts..."
if [ -d "$SKILL_DIR/scripts" ]; then
    script_count=$(ls -1 "$SKILL_DIR/scripts/" 2>/dev/null | wc -l)
    echo "  ✅ scripts/ directory exists ($script_count files)"
    
    # Check Python syntax
    for py in "$SKILL_DIR/scripts/"*.py; do
        if [ -f "$py" ]; then
            python3 -m py_compile "$py" 2>/dev/null && echo "    ✅ $(basename $py) - valid Python" || echo "    ❌ $(basename $py) - syntax error"
        fi
    done
    
    # Check TypeScript syntax (basic check)
    for ts in "$SKILL_DIR/scripts/"*.ts; do
        if [ -f "$ts" ]; then
            # Basic syntax check - just verify it's not empty and has valid structure
            if [ -s "$ts" ]; then
                echo "    ✅ $(basename $ts) - exists"
            else
                echo "    ⚠️  $(basename $ts) - empty"
            fi
        fi
    done
else
    echo "  ⚠️  No scripts/ directory"
fi

# Test 4: Check for Chinese characters
echo "[4/5] Checking for Chinese characters..."
chinese_count=$(grep -r $'[\u4e00-\u9fff]' "$SKILL_DIR" --include="*.py" --include="*.ts" --include="*.js" 2>/dev/null | wc -l)
if [ "$chinese_count" -eq 0 ]; then
    echo "  ✅ No Chinese characters found"
else
    echo "  ⚠️  Found $chinese_count lines with Chinese characters"
fi

# Test 5: Check for remaining zai references
echo "[5/5] Checking for zai/ZAI references..."
zai_count=$(grep -r "from.*zai\|import.*ZAI\|zai\." "$SKILL_DIR" --include="*.py" --include="*.ts" 2>/dev/null | wc -l)
if [ "$zai_count" -eq 0 ]; then
    echo "  ✅ No zai/ZAI references found"
else
    echo "  ⚠️  Found $zai_count lines with zai/ZAI references"
    grep -r "from.*zai\|import.*ZAI\|zai\." "$SKILL_DIR" --include="*.py" --include="*.ts" 2>/dev/null | head -5
fi

echo ""
echo "=== Test Summary for $SKILL_NAME ==="
echo "✅ Basic structure validation complete"
