import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Card, Typography, Descriptions, Spin, Alert, Button } from 'antd';
import { UserOutlined, MailOutlined, TeamOutlined, CalendarOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { fetchUserById } from '../slice';
import type { RootState } from '@/app/store';

const { Title } = Typography;

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { selectedUser, loading, error } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(id));
    }
  }, [dispatch, id]);

  if (loading) return <Spin size="large" tip="Loading user details..." />;
  if (error) return <Alert message="Error" description={error} type="error" showIcon />;
  if (!selectedUser) return <Alert message="User not found" type="warning" showIcon />;

  return (
    <Card className="site-content">
      <Title level={2}>
        <UserOutlined /> {selectedUser.name}
      </Title>

      <Descriptions bordered column={1}>
        <Descriptions.Item label={<><MailOutlined /> Email</>}>
          {selectedUser.email}
        </Descriptions.Item>
        <Descriptions.Item label={<><TeamOutlined /> Role</>}>
          {selectedUser.role}
        </Descriptions.Item>
        <Descriptions.Item label={<><CalendarOutlined /> Created</>}>
          {new Date(selectedUser.createdAt).toLocaleDateString()}
        </Descriptions.Item>
      </Descriptions>

      <div style={{ marginTop: '24px' }}>
        <Button type="primary" icon={<ArrowLeftOutlined />}>
          <Link to="/users" style={{ color: 'inherit' }}>Back to Users</Link>
        </Button>
      </div>
    </Card>
  );
};

export default UserDetail;
