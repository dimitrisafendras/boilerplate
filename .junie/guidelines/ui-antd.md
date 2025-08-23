# UI Components & Ant Design

Use Ant Design as the primary UI component library for consistent user experience.

- Always use Ant Design components instead of HTML elements when an equivalent component exists.
- Import components individually to optimize bundle size: `import { Button } from 'antd'` not `import * from 'antd'`.
- Use Ant Design's layout components (`Layout`, `Row`, `Col`) for page structure.
- Follow Ant Design's form patterns and validation approach.
- Use Ant Design's `Typography` components for text elements.
- Customize theme through the `ConfigProvider` in main.tsx only.
- For custom styling, use CSS modules or styled-components with Ant Design's design tokens.
- Refer to the [Ant Design documentation](https://ant.design/components/overview/) for component usage guidelines.
