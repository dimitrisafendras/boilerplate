import type {RootState} from '@/app/store';

export const selectLoading = (state: RootState) => state.notification.loading;
