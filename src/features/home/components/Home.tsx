import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Layout,
  Space,
  Card,
  Divider,
  Tag,
  Button,
  Row,
  Col,
} from "antd";
import {
  CodeOutlined,
  ApiOutlined,
  AppstoreOutlined,
  EnvironmentOutlined,
  BugOutlined,
  FormOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { useNotifications } from "@/models/notification";

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;

export const Home: React.FC = () => {
  const [columns, setColumns] = useState(1);
  const { showNotification } = useNotifications();

  useEffect(() => {
    const handleResize = () => {
      setColumns(window.innerWidth >= 992 ? 2 : 1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const directoryStructure = `
/                            # Project root
├── .env                     # Environment variables
├── .env.example             # Example environment variables
├── .eslintrc.js             # ESLint configuration
├── .gitignore               # Git ignore file
├── index.html               # HTML entry point
├── jest.config.js           # Jest configuration
├── package.json             # Package configuration
├── pnpm-lock.yaml           # PNPM lock file
├── README.md                # Project documentation
├── tsconfig.json            # TypeScript configuration
├── tsconfig.app.json        # App-specific TypeScript configuration
├── tsconfig.node.json       # Node-specific TypeScript configuration
├── vite.config.ts           # Vite configuration
│
├── public/                  # Static assets
│   ├── favicon.ico          # Favicon
│   ├── feature-architecture-flowchart.svg  # Architecture diagram
│   └── vite.svg             # Vite logo
│
└── src/                     # Source code
    ├── App.tsx              # Root App component
    ├── App.css              # App styles
    ├── index.css            # Global styles
    ├── main.tsx             # Application entry point
    ├── setupTests.ts        # Test setup
    ├── vite-env.d.ts        # Vite environment types
    │
    ├── assets/              # Static assets
    │   └── react.svg        # React logo
    │
    ├── app/                 # Application setup
    │   ├── store.ts         # Redux store configuration
    │   └── rootSaga.ts      # Root saga
    │
    ├── common/              # Shared code
    │   ├── types/           # Shared types and interfaces
    │   └── utils/           # Shared utilities
    │
    ├── features/            # Feature modules
    │   ├── users/           # Users feature
    │   │   ├── components/  # React components
    │   │   ├── tests/       # Tests
    │   │   └── routes.tsx   # Feature routes
    │   └── home/            # Home feature
    │       ├── components/  # React components
    │       └── routes.tsx   # Feature routes
    │
    ├── models/              # Centralized models
    │   ├── users/           # Users model
    │   │   ├── hooks/       # Custom hooks
    │   │   ├── selectors/   # Redux selectors
    │   │   ├── slice.ts     # Redux slice
    │   │   └── saga.ts      # Redux-Saga
    │   └── notification/    # Notification model
    │       ├── hooks/       # Custom hooks
    │       ├── selectors/   # Redux selectors
    │       ├── slice.ts     # Redux slice
    │       └── saga.ts      # Redux-Saga
    │
    ├── mirage/              # Mock API server
    │   ├── index.ts         # Mirage setup
    │   ├── models.ts        # Data models
    │   ├── factories.ts     # Data factories
    │   ├── seeds.ts         # Initial data
    │   └── routes.ts        # API endpoints
    │
    └── routes/              # Routing
        └── index.tsx        # Centralized routes
  `;

  const guidelineSections = [
    {
      title: "Build Setup",
      icon: <CodeOutlined />,
      content: (
        <>
          <Paragraph>
            Ensure developers can install, develop, and build the project.
          </Paragraph>
          <ul>
            <li>
              <Text code>pnpm install</Text> - Install dependencies
            </li>
            <li>
              <Text code>pnpm dev</Text> - Start the development server
            </li>
            <li>
              <Text code>pnpm build</Text> - Build the production bundle
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "Feature-Based Architecture",
      icon: <AppstoreOutlined />,
      content: (
        <>
          <Paragraph>
            Enforce modular feature-based file structure with shared models and
            types extracted.
          </Paragraph>
          <ul>
            <li>
              Each feature must live in{" "}
              <Text code>src/features/&lt;feature-name&gt;/</Text>
            </li>
            <li>
              Each feature should include its own <Text code>components/</Text>,{" "}
              <Text code>routes.tsx</Text>, and <Text code>tests/</Text>
            </li>
            <li>
              Models are centralized in{" "}
              <Text code>src/models/&lt;model-name&gt;/</Text> with a
              one-to-many relationship to features
            </li>
            <li>
              Avoid cross-feature imports directly—extract shared code to{" "}
              <Text code>src/common/</Text>
            </li>
            <li>
              Place reusable types, interfaces, and models in{" "}
              <Text code>src/common/types/</Text> or{" "}
              <Text code>src/common/models/</Text>
            </li>
            <li>
              Utilities shared across features should be located in{" "}
              <Text code>src/common/utils/</Text> or similar
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "Routing",
      icon: <EnvironmentOutlined />,
      content: (
        <>
          <Paragraph>
            Organize routing via centralized and feature-specific route files.
          </Paragraph>
          <ul>
            <li>
              Centralized routing logic is in{" "}
              <Text code>src/routes/index.tsx</Text>
            </li>
            <li>
              Each feature exports its own route(s) via{" "}
              <Text code>routes.tsx</Text> inside the feature folder
            </li>
            <li>Use React Router v6+ with JSX route definitions</li>
          </ul>
        </>
      ),
    },
    {
      title: "Redux & Redux-Saga",
      icon: <ApiOutlined />,
      content: (
        <>
          <Paragraph>
            Ensure proper Redux Toolkit + Saga integration with centralized
            models.
          </Paragraph>
          <ul>
            <li>
              Use <Text code>createSlice</Text> inside each model's directory in
              the slice file (e.g.,{" "}
              <Text code>src/models/&lt;model-name&gt;/slice.ts</Text>)
            </li>
            <li>
              Place side-effects in{" "}
              <Text code>src/models/&lt;model-name&gt;/saga.ts</Text>,
              registered in <Text code>src/app/rootSaga.ts</Text>
            </li>
            <li>
              Slices and sagas must be registered in{" "}
              <Text code>src/app/store.ts</Text> and{" "}
              <Text code>rootSaga.ts</Text> respectively
            </li>
            <li>
              Create a dedicated <Text code>selectors/</Text> directory in each
              model folder for Redux selectors
            </li>
            <li>
              Every selector should be a standalone file and the index should
              just export all of them
            </li>
            <li>
              Place hooks in the{" "}
              <Text code>src/models/&lt;model-name&gt;/hooks/</Text> directory
            </li>
            <li>
              Use selectors to access Redux state in components and hooks
              instead of direct state access
            </li>
            <li>
              Import models in components using{" "}
              <Text code>
                import {"{ useModelName }"} from '@/models/model-name'
              </Text>
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "MirageJS Mock Server",
      icon: <ApiOutlined />,
      content: (
        <>
          <Paragraph>
            Follow official MirageJS structure for robust and type-consistent
            mocks.
          </Paragraph>
          <ul>
            <li>
              All Mirage configuration must reside in{" "}
              <Text code>src/mirage/</Text>
            </li>
            <li>
              Separate files must exist for <Text code>models.ts</Text>,{" "}
              <Text code>factories.ts</Text>, <Text code>seeds.ts</Text>, and{" "}
              <Text code>routes.ts</Text>
            </li>
            <li>
              Define models in <Text code>models.ts</Text> using Mirage's{" "}
              <Text code>Model</Text>
            </li>
            <li>
              Use <Text code>factories.ts</Text> to generate mock data with
              Faker or sample data
            </li>
            <li>
              Use <Text code>seeds.ts</Text> to populate mock DB at server boot
              time
            </li>
            <li>
              Define REST-style endpoints in <Text code>routes.ts</Text> using{" "}
              <Text code>this.namespace = 'api'</Text>
            </li>
            <li>
              All mock data must conform to shared types from{" "}
              <Text code>src/common/types/</Text>
            </li>
            <li>
              Extend Mirage's TypeScript support in{" "}
              <Text code>mirage.d.ts</Text>
            </li>
            <li>
              Initialize Mirage in <Text code>main.tsx</Text> only if the env
              variable <Text code>VITE_USE_MOCKS=true</Text>
            </li>
            <li>
              Use <Text code>environment: 'test'</Text> in test suites
            </li>
            <li>Ensure no mock server is booted in production builds</li>
          </ul>
        </>
      ),
    },
    {
      title: "Environment Variables",
      icon: <FormOutlined />,
      content: (
        <>
          <Paragraph>
            Use environment variables consistently for mocks, endpoints, and
            feature flags.
          </Paragraph>
          <ul>
            <li>
              Define all environment variables with <Text code>VITE_</Text>{" "}
              prefix (Vite convention) in <Text code>.env</Text> files
            </li>
            <li>
              Use <Text code>VITE_API_BASE_URL</Text> for all HTTP calls
            </li>
            <li>
              Use <Text code>VITE_USE_MOCKS</Text> to conditionally start Mirage
            </li>
            <li>
              Access environment variables via{" "}
              <Text code>import.meta.env.VITE_*</Text> with proper fallback
              logic
            </li>
            <li>
              Avoid hardcoding values like base URLs or mocking flags directly
              in code
            </li>
            <li>
              All environment variable keys should be documented in{" "}
              <Text code>.env.example</Text>
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "Testing Setup",
      icon: <BugOutlined />,
      content: (
        <>
          <Paragraph>
            Follow standardized testing practices with React Testing Library +
            Jest.
          </Paragraph>
          <ul>
            <li>
              Use React Testing Library and Mirage for integration-style tests
            </li>
            <li>
              Each feature must have a <Text code>tests/</Text> folder
            </li>
            <li>
              Mock backend behavior in tests via Mirage (with proper seeding)
            </li>
            <li>
              Run tests with <Text code>pnpm test</Text>. Use{" "}
              <Text code>-- &lt;path&gt;</Text> to target specific files
            </li>
            <li>
              Use <Text code>screen</Text>, <Text code>waitFor</Text>, and{" "}
              <Text code>userEvent</Text> for clean test interaction logic
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "UI Components & Ant Design",
      icon: <AppstoreOutlined />,
      content: (
        <>
          <Paragraph>
            Use Ant Design as the primary UI component library for consistent
            user experience.
          </Paragraph>
          <ul>
            <li>
              Always use Ant Design components instead of HTML elements when an
              equivalent component exists
            </li>
            <li>
              Import components individually to optimize bundle size:{" "}
              <Text code>import {"{ Button }"} from 'antd'</Text> not{" "}
              <Text code>import * from 'antd'</Text>
            </li>
            <li>
              Use Ant Design's layout components (<Text code>Layout</Text>,{" "}
              <Text code>Row</Text>, <Text code>Col</Text>) for page structure
            </li>
            <li>Follow Ant Design's form patterns and validation approach</li>
            <li>
              Use Ant Design's <Text code>Typography</Text> components for text
              elements
            </li>
            <li>
              Customize theme through the <Text code>ConfigProvider</Text> in
              main.tsx only
            </li>
            <li>
              For custom styling, use CSS modules or styled-components with Ant
              Design's design tokens
            </li>
            <li>
              Refer to the{" "}
              <a
                href="https://ant.design/components/overview/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ant Design documentation
              </a>{" "}
              for component usage guidelines
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "Code Style & Conventions",
      icon: <CodeOutlined />,
      content: (
        <>
          <Paragraph>
            Maintain consistent code formatting and organization.
          </Paragraph>
          <ul>
            <li>
              Use the <Text code>@/</Text> alias for absolute imports from{" "}
              <Text code>src/</Text>
            </li>
            <li>
              Run <Text code>pnpm format</Text> and <Text code>pnpm lint</Text>{" "}
              before commits
            </li>
            <li>
              Shared types/interfaces/models must not be duplicated—extract them
              into <Text code>src/common/types/</Text>
            </li>
            <li>
              Ensure Mirage, Redux slices, and component props all share the
              same source of truth for types
            </li>
            <li>
              When importing types, use the <Text code>import type</Text>{" "}
              syntax:{" "}
              <Text code>
                import type {"{ RootState }"} from '@/app/store';
              </Text>{" "}
              instead of{" "}
              <Text code>import {"{ RootState }"} from '@/app/store';</Text>
            </li>
            <li>
              Every folder should have an index file and everything should be
              exported from there
            </li>
            <li>
              Import from directories instead of specific files (e.g.,{" "}
              <Text code>import {"{ Component }"} from './components'</Text>{" "}
              instead of{" "}
              <Text code>import Component from './components/Component'</Text>)
            </li>
            <li>
              Group related imports together: React imports first, followed by
              third-party libraries, then local imports
            </li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <Layout>
      <Content className="site-content" style={{ margin: "0 auto" }}>
        <Typography>
          <Title level={2}>Project Guidelines</Title>
          <Paragraph>
            This project follows a modular, feature-based architecture for React
            applications using Redux Toolkit, Redux-Saga, React Router, and
            MirageJS with Ant Design components.
          </Paragraph>
        </Typography>

        <Row gutter={24}>
          {/* Left side - Directory Structure */}
          <Col xs={24} md={10} lg={8}>
            <Card title="Directory Structure" className="mb-lg">
              <pre className="code-block">{directoryStructure}</pre>
            </Card>
          </Col>

          {/* Right side - Masonry Layout */}
          <Col xs={24} md={14} lg={16}>
            <Divider orientation="left">Example Features</Divider>
            <Card className="mb-lg">
              <Space>
                <Button>
                  <Link to="/users">Users Feature</Link>
                </Button>
                <Tag color="blue">View a list of users and user details</Tag>
              </Space>
            </Card>

            <Card
              className="mb-lg"
              title={
                <Space>
                  <BellOutlined />
                  Notification Demo
                </Space>
              }
            >
              <Space wrap>
                <Button
                  type="primary"
                  onClick={() =>
                    showNotification({
                      type: "success",
                      message: "Success notification",
                      duration: 3000,
                    })
                  }
                >
                  Success
                </Button>
                <Button
                  type="primary"
                  danger
                  onClick={() =>
                    showNotification({
                      type: "error",
                      message: "Error notification",
                      duration: 3000,
                    })
                  }
                >
                  Error
                </Button>
                <Button
                  onClick={() =>
                    showNotification({
                      type: "info",
                      message: "Info notification",
                      duration: 3000,
                    })
                  }
                >
                  Info
                </Button>
                <Button
                  onClick={() =>
                    showNotification({
                      type: "warning",
                      message: "Warning notification",
                      duration: 3000,
                    })
                  }
                >
                  Warning
                </Button>
                <Button
                  onClick={() =>
                    showNotification({
                      type: "success",
                      message: "Persistent notification",
                    })
                  }
                >
                  Persistent
                </Button>
              </Space>
              <div className="mt-sm">
                <Tag color="green">Click buttons to trigger notifications</Tag>
              </div>
            </Card>

            <div
              className="masonry-layout"
              style={{
                columnCount: columns,
                columnGap: "16px",
              }}
            >
              {guidelineSections.map((item, index) => (
                <Card
                  key={index}
                  title={
                    <Space>
                      {item.icon}
                      {item.title}
                    </Space>
                  }
                  hoverable
                  className="masonry-card"
                >
                  {item.content}
                </Card>
              ))}
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
