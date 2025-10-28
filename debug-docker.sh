#!/bin/bash

echo "=== Debugging Docker Build Issue ==="
echo "Current directory: $(pwd)"
echo "Date: $(date)"
echo

echo "=== Checking if index.ts files exist locally ==="
find . -name "index.ts" -type f | head -10
echo

echo "=== Checking features directory structure ==="
ls -la src/features/ 2>/dev/null || echo "src/features/ not found"
echo

echo "=== Checking login feature ==="
ls -la src/features/login/ 2>/dev/null || echo "src/features/login/ not found"
echo

echo "=== Checking register feature ==="
ls -la src/features/register/ 2>/dev/null || echo "src/features/register/ not found"
echo

echo "=== Checking molecules directory ==="
ls -la src/shared/components/molecules/ 2>/dev/null || echo "src/shared/components/molecules/ not found"
echo

echo "=== Checking if login index.ts exists ==="
if [ -f "src/features/login/index.ts" ]; then
    echo "✅ src/features/login/index.ts exists"
    cat src/features/login/index.ts
else
    echo "❌ src/features/login/index.ts NOT FOUND"
fi
echo

echo "=== Checking if register index.ts exists ==="
if [ -f "src/features/register/index.ts" ]; then
    echo "✅ src/features/register/index.ts exists"
    cat src/features/register/index.ts
else
    echo "❌ src/features/register/index.ts NOT FOUND"
fi
echo

echo "=== Checking Docker context ==="
echo "Files in current directory:"
ls -la | head -20
echo

echo "=== Checking if we're in the right directory ==="
if [ -f "docker-compose.prod.yml" ]; then
    echo "✅ Found docker-compose.prod.yml"
else
    echo "❌ docker-compose.prod.yml not found"
fi
