import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, fetchUserById } from '../slice';
import type {RootState} from '@/app/store';

export const useUsers = () => {
  const dispatch = useDispatch();
  const { users, selectedUser, loading, error } = useSelector((state: RootState) => state.users);

  const getUsers = () => {
    dispatch(fetchUsers());
  };

  const getUserById = (id: string) => {
    dispatch(fetchUserById(id));
  };

  return {
    users,
    selectedUser,
    loading,
    error,
    getUsers,
    getUserById,
  };
};
