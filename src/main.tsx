import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import './index.css';
import Router from '@/routes';
import { store } from '@/app/store';

// Initialize MirageJS in development if VITE_USE_MOCKS is true
if (import.meta.env.DEV && import.meta.env.VITE_USE_MOCKS === 'true') {
  import('@/mirage').then(({ makeServer }) => {
    makeServer({ environment: 'development' });
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={{
        token: {
          colorPrimary: '#646cff',
        },
      }}>
        <Router />
      </ConfigProvider>
    </Provider>
  </StrictMode>,
)
