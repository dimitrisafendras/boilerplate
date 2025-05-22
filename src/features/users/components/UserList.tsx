import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { List, Typography, Spin, Alert, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { fetchUsers } from '../slice';
import type { RootState } from '@/app/store';

const { Title } = Typography;

const UserList: React.FC = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return (
    <Spin size="large" tip="Loading users...">
      <div style={{ height: 100, width: '100%' }} />
    </Spin>
  );
  if (error) return <Alert message="Error" description={error} type="error" showIcon />;

  return (
    <Card className="site-content">
      <Title level={2}>Users</Title>
      <List
        itemLayout="horizontal"
        dataSource={Array.isArray(users) ? users : []}
        locale={{ emptyText: <Alert message="No users found" type="info" /> }}
        renderItem={(user) => (
          <List.Item>
            <List.Item.Meta
              avatar={<UserOutlined style={{ fontSize: '24px' }} />}
              title={<Link to={`/users/${user.id}`}>{user.name}</Link>}
              description={`${user.email} (${user.role})`}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default UserList;
