// React and React-related imports
import React from 'react';

// Third-party library imports
import { Alert, Space } from 'antd';

// Local imports
import { useNotifications } from '@/models/notification';

export const NotificationList: React.FC = () => {
  const { notifications, hideNotification } = useNotifications();

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 20,
        right: 20,
        zIndex: 1000,
        maxWidth: '400px',
      }}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        {notifications.map((notification) => (
          <Alert
            key={notification.id}
            message={notification.message}
            type={notification.type}
            showIcon
            closable
            onClose={() => hideNotification(notification.id)}
          />
        ))}
      </Space>
    </div>
  );
};
