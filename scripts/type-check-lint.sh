#!/bin/sh
# This script ignores any arguments passed to it and just runs TypeScript with our custom configuration
tsc --noEmit --skipLibCheck -p tsconfig.lint.json
