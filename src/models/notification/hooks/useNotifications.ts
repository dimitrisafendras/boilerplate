import { useSelector, useDispatch } from 'react-redux';
import { selectNotifications, selectLoading, selectError } from '../selectors';
import { addNotification, removeNotification, clearNotifications } from '../slice';
import type { Notification } from '@/common/types/notification';

export const useNotifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(selectNotifications);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const showNotification = (notification: Omit<Notification, 'id' | 'createdAt'>) => {
    dispatch(addNotification(notification));
  };

  const hideNotification = (id: string) => {
    dispatch(removeNotification(id));
  };

  const clearAllNotifications = () => {
    dispatch(clearNotifications());
  };

  return {
    notifications,
    loading,
    error,
    showNotification,
    hideNotification,
    clearAllNotifications,
  };
};
