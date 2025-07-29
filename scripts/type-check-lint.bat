@echo off
REM This script ignores any arguments passed to it and just runs TypeScript with our custom configuration
npx tsc --noEmit --skipLibCheck -p tsconfig.lint.json
