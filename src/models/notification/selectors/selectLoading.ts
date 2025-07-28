import type {RootState} from '@/app/store';
import type {NotificationState} from '@/common/types/notification';

export const selectLoading = (state: RootState) => (state.notification as NotificationState).loading;
