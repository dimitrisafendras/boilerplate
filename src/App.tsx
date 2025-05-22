import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Layout, Menu, Typography } from 'antd';
import './App.css';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

const App: React.FC = () => {
  return (
    <Layout className="app-container">
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Title level={3} style={{ color: 'white', margin: 0, marginRight: '48px' }}>
          Feature-Based Architecture Example
        </Title>
        <Menu
          theme="dark"
          mode="horizontal"
          items={[
            { key: 'home', label: <Link to="/">Home</Link> },
            { key: 'users', label: <Link to="/users">Users</Link> }
          ]}
        />
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

export default App;
