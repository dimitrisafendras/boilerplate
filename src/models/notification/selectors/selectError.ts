import type {RootState} from '@/app/store';
import type {NotificationState} from '@/common/types/notification';

export const selectError = (state: RootState) => (state.notification as NotificationState).error;
