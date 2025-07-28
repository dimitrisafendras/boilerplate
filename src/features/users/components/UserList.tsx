import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { List, Typography, Spin, Alert, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useUsers } from "@/models/users";

const { Title } = Typography;

export const UserList: React.FC = () => {
  const { users, loading, error, getUsers } = useUsers();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (loading)
    return (
      <Spin size="large" tip="Loading users...">
        <div className="spinner-container" />
      </Spin>
    );
  if (error)
    return <Alert message="Error" description={error} type="error" showIcon />;

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
              avatar={<UserOutlined className="avatar-icon" />}
              title={<Link to={`/users/${user.id}`}>{user.name}</Link>}
              description={`${user.email} (${user.role})`}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};
