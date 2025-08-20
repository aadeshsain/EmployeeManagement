import { useState } from 'react';
import {
  UserOutlined,
  CalendarOutlined,
  FileDoneOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Menu, Button, Modal, Input, Select, notification, theme } from 'antd';
import { useNavigate, useLocation } from 'react-router';
import axiosInstance from '../api/axiosInstance';

const Sidebar = () => {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const location = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const items = [
  { key: 'profile', icon: <UserOutlined />, label: 'Profile' },
  { key: 'user', icon: <UserOutlined />, label: 'User' },
  { key: 'attendance', icon: <CalendarOutlined />, label: 'Attendance' },
  { key: 'leave', icon: <FileDoneOutlined />, label: 'Leave' },
  { key: 'tasks', icon: <FileDoneOutlined />, label: 'Tasks' },
];


  const pathParts = location.pathname.split('/');
  const selectedKey = pathParts[1] === 'd' ? pathParts[2] : '';

  const handleMenuClick = (key: string) => navigate(`/d/${key}`);

  const handleInvite = async () => {
    try {
      await axiosInstance.post('/invite', { email, role });
      notification.success({
        message: 'Invite Sent',
        description: `Invitation sent to ${email} as ${role}`,
      });
      setIsModalOpen(false);
      setEmail('');
      setRole('');
    } catch (error: any) {
      notification.error({
        message: 'Invite Failed',
        description: error.response?.data?.error || 'Something went wrong',
      });
    }
  };

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: token.colorBgContainer,
      }}
    >
      <div>
        <div style={{ padding: 16, textAlign: 'center' }}>
          <img
            src="https://images.unsplash.com/photo-1660303238885-c9853ddb6feb?w=600"
            alt="logo"
            style={{ height: 60, width: 60, borderRadius: '50%', marginBottom: 12 }}
          />
          <h2 style={{ color: token.colorTextBase }}>Dashboard</h2>
        </div>

        <Menu
          mode="inline"
          theme="light"
          selectedKeys={[selectedKey]}
          items={items}
          onClick={({ key }) => handleMenuClick(key)}
          style={{ borderRight: 0 }}
        />
      </div>

      <div style={{ padding: 16, borderTop: '1px solid #f0f0f0' }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          block
          onClick={() => setIsModalOpen(true)}
        >
          Send Invite
        </Button>
      </div>

      {/* Invite Modal */}
      <Modal
        title="Send Invite"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleInvite}
        okButtonProps={{ disabled: !email || !role }}
      >
        <Input
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        <Select
          placeholder="Select role"
          value={role}
          onChange={(val) => setRole(val)}
          options={[
            { label: 'Manager', value: 'Manager' },
            { label: 'Employee', value: 'Employee' },
            { label: 'Team-Leader', value: 'Team-Leader' },
          ]}
          style={{ width: '100%' }}
        />
      </Modal>
    </div>
  );
};

export default Sidebar;
