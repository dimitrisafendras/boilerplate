# Code Style & Conventions

Maintain consistent code formatting and organization.

- Use the `@/` alias for absolute imports from `src/`.
- Run `pnpm format` and `pnpm lint` before commits.
- Shared types/interfaces/models must not be duplicated—extract them into `src/common/types/`.
- Ensure Mirage, Redux slices, and component props all share the same source of truth for types.
- When importing types, use the `import type` syntax: `import type { RootState } from '@/app/store';` instead of `import { RootState } from '@/app/store';`.
- Every folder should have an index file and everything should be exported from there.
- Import from directories instead of specific files (e.g., `import { Component } from './components'` instead of `import Component from './components/Component'`).
- Group related imports together with clear separation and comments:

```typescript
// React and React-related imports
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// Third-party library imports
import { Button, Card, Form } from 'antd';
import { UserOutlined } from '@ant-design/icons';

// Local imports
import { useUsers } from '@/models/users';
import { formatDate } from '@/common/utils/date';
```

- Follow this specific ordering for imports:
  1. React core imports first
  2. React-related libraries (React Router, React Redux, etc.)
  3. Third-party libraries (alphabetically ordered when possible)
  4. Local imports (from most general to most specific)
- Separate each import group with a blank line and a comment header
- When importing types, use the `import type` syntax and group with their respective categories
- Always use named exports with `export const` instead of `export default` for better tree-shaking, easier refactoring, and consistent import style. Exception: React components can use default exports when they are the only export from a file.
