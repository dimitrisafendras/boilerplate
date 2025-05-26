import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Layout, Button, Space, Typography } from 'antd';
import './App.css';
import { NotificationList } from '@/common/features/notification';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

export const App: React.FC = () => {
  return (
    <Layout className="app-container">
      <NotificationList />
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Title level={3} style={{ color: 'white', margin: 0, marginRight: '48px' }}>
          Feature-Based Architecture Example
        </Title>
        <Space>
          <Button type="link" className="header-button" style={{ color: 'white' }}>
            <Link to="/" style={{ color: 'white' }}>Home</Link>
          </Button>
          <Button type="link" className="header-button" style={{ color: 'white' }}>
            <Link to="/users" style={{ color: 'white' }}>Users</Link>
          </Button>
        </Space>
      </Header>

      <Content style={{ padding: '24px', minHeight: 'calc(100vh - 64px - 70px)' }}>
        {/* This is where the route components will be rendered */}
        <Outlet />
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        <Text>
          Built with React, Redux Toolkit, Redux-Saga, React Router, MirageJS, and Ant Design
        </Text>
      </Footer>
    </Layout>
  );
};

