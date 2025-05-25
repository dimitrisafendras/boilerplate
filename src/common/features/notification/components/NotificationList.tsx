import React from 'react';
import { Alert, Space } from 'antd';
import { useNotifications } from '../model';

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
