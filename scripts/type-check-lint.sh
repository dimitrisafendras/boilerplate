#!/bin/sh
# This script ignores any arguments passed to it and just runs TypeScript with our custom configuration
pnpm exec tsc --noEmit --skipLibCheck -p tsconfig.lint.json
