// Import the compatibility package for Ant Design v5 with React 19
import '@ant-design/v5-patch-for-react-19';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import './index.css';
import { Router } from '@/routes';
import { store } from '@/app/store';
import { USE_MOCKS } from '@/common/utils/env';
import { theme } from '@/common/theme';

// Initialize MirageJS in development if USE_MOCKS is true
let miragePromise = Promise.resolve();
if (import.meta.env.DEV && USE_MOCKS === 'true') {
  miragePromise = import('@/mirage').then(({ makeServer }) => {
    makeServer({ environment: 'development' });
  });
}

// Wait for Mirage to initialize before rendering the app
miragePromise.then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Provider store={store}>
        <ConfigProvider
          theme={theme}
        >
          <Router />
        </ConfigProvider>
      </Provider>
    </StrictMode>,
  );
});
