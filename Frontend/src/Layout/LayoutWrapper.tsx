import { Layout } from 'antd';
import { Outlet } from 'react-router';
import HeaderBar from '../components/HeaderBar';
import Sidebar from '../components/Sidebar';

const { Header, Sider, Content } = Layout;

export default function LayoutWrapper() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200}>
        <Sidebar />
      </Sider>

      <Layout>
        <Header style={{ padding: 0 }}>
          <HeaderBar />
        </Header>

        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
          <Outlet /> {/* 🔸 This is where UserPage, AttendancePage, LeavePage will show */}
        </Content>
      </Layout>
    </Layout>
  );
}
