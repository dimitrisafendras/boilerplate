import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchUserById } from '../slice';
import type { RootState } from '@/app/store';

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { selectedUser, loading, error } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(id));
    }
  }, [dispatch, id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!selectedUser) return <div>User not found</div>;

  return (
    <div>
      <h1>{selectedUser.name}</h1>
      <p>Email: {selectedUser.email}</p>
      <p>Role: {selectedUser.role}</p>
      <p>Created: {new Date(selectedUser.createdAt).toLocaleDateString()}</p>
      <Link to="/users">Back to Users</Link>
    </div>
  );
};

export default UserDetail;
