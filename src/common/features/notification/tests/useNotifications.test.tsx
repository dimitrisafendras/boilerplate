import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useNotifications } from '../model';
import notificationReducer from '../model';

describe('useNotifications', () => {
  // Create a test store with only the notification reducer
  const createTestStore = () => configureStore({
    reducer: {
      notification: notificationReducer
    }
  });

  // Wrapper component to provide the Redux store
  const wrapper = ({ children }: { children: React.ReactNode }) => {
    const store = createTestStore();
    return <Provider store={store}>{children}</Provider>;
  };

  it('should add a notification', () => {
    const { result } = renderHook(() => useNotifications(), { wrapper });

    act(() => {
      result.current.showNotification({
        type: 'success',
        message: 'Test notification',
        duration: 3000
      });
    });

    expect(result.current.notifications.length).toBe(1);
    expect(result.current.notifications[0].message).toBe('Test notification');
    expect(result.current.notifications[0].type).toBe('success');
  });

  it('should remove a notification', () => {
    const { result } = renderHook(() => useNotifications(), { wrapper });

    // Add a notification
    act(() => {
      result.current.showNotification({
        type: 'success',
        message: 'Test notification',
        duration: 3000
      });
    });

    // Verify notification was added and get its ID
    expect(result.current.notifications.length).toBe(1);
    const notificationId = result.current.notifications[0].id;

    // Remove the notification
    act(() => {
      result.current.hideNotification(notificationId);
    });

    // Verify notification was removed
    expect(result.current.notifications.length).toBe(0);
  });

  it('should clear all notifications', () => {
    const { result } = renderHook(() => useNotifications(), { wrapper });

    act(() => {
      result.current.showNotification({
        type: 'success',
        message: 'Notification 1',
        duration: 3000
      });
      result.current.showNotification({
        type: 'error',
        message: 'Notification 2',
        duration: 3000
      });
    });

    expect(result.current.notifications.length).toBe(2);

    act(() => {
      result.current.clearAllNotifications();
    });

    expect(result.current.notifications.length).toBe(0);
  });
});
