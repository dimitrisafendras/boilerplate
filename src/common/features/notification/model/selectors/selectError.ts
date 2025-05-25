import type {RootState} from '@/app/store';

export const selectError = (state: RootState) => state.notification.error;
