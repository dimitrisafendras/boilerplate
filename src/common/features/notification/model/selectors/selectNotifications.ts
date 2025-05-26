import type {RootState} from '@/app/store';
import type {NotificationState} from '@/common/types/notification';

export const selectNotifications = (state: RootState) => (state.notification as NotificationState).notifications;
