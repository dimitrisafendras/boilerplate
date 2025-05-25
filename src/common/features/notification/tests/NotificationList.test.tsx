import { screen, waitFor } from '@testing-library/react';
import { NotificationList } from '../components';
import { renderWithProviders } from '@/common/utils/test-utils';
import { addNotification } from '../model';

describe('NotificationList', () => {
  it('renders nothing when there are no notifications', () => {
    const { container } = renderWithProviders(<NotificationList />);
    expect(container.firstChild).toBeNull();
  });

  it('displays notifications when they are added', async () => {
    const { store } = renderWithProviders(<NotificationList />);

    // Add a notification
    store.dispatch(addNotification({
      type: 'success',
      message: 'Test notification',
      duration: 3000
    }));

    // Check if the notification is displayed
    await waitFor(() => {
      expect(screen.getByText('Test notification')).toBeTruthy();
    });
  });

  it('displays multiple notifications', async () => {
    const { store } = renderWithProviders(<NotificationList />);

    // Add multiple notifications
    store.dispatch(addNotification({
      type: 'success',
      message: 'Success notification',
      duration: 3000
    }));

    store.dispatch(addNotification({
      type: 'error',
      message: 'Error notification',
      duration: 3000
    }));

    // Check if both notifications are displayed
    await waitFor(() => {
      expect(screen.getByText('Success notification')).toBeTruthy();
      expect(screen.getByText('Error notification')).toBeTruthy();
    });
  });
});
