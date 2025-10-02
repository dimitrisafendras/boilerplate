export interface UserProfile {
  avatarUrl: string;
  bio: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
  profile?: UserProfile; // optional to maintain backward compatibility in components/tests
  tags?: string[];
  active?: boolean;
}

export interface UserState {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
}

// Optional pagination metadata for list endpoints (not currently used by UI)
export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface PaginatedUsersResponse {
  data: User[];
  meta: PaginationMeta;
}
