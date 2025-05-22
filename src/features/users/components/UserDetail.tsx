import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Typography, Descriptions, Spin, Alert, Button } from 'antd';
import { UserOutlined, MailOutlined, TeamOutlined, CalendarOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useUsers } from '../model/hooks/useUsers';

const { Title } = Typography;

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { selectedUser, loading, error, getUserById } = useUsers();

  useEffect(() => {
    if (id) {
      getUserById(id);
    }
  }, [getUserById, id]);

  if (loading) return (
    <Spin size="large" tip="Loading user details...">
      <div style={{ height: 100, width: '100%' }} />
    </Spin>
  );
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
