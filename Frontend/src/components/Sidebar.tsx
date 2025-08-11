import { useState, useRef } from 'react';
import { UserOutlined, CalendarOutlined, FileDoneOutlined, PlusOutlined } from '@ant-design/icons';
import { Menu, Button, Input, theme } from 'antd';
import { useNavigate } from 'react-router';
import axios from 'axios';

const Sidebar = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [email, setEmail] = useState('');
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const showModal = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setModalPosition({
        top: rect.top - 200,
        left: rect.left,
      });
    }
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/send-invite', {
        email,
        role: selectedRole,
      });

      console.log('Invite sent:', response.data);
      // Optionally show toast/notification here

      setIsModalOpen(false);
      setSelectedRole('');
      setEmail('');
    } catch (error) {
      console.error('Error sending invite:', error);
      // Optionally show error notification
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedRole('');
    setEmail('');
  };

  // ✅ Sidebar menu items
  const items = [
    { key: 'user', icon: <UserOutlined />, label: 'User' },
    { key: 'attendance', icon: <CalendarOutlined />, label: 'Attendance' },
    { key: 'leave', icon: <FileDoneOutlined />, label: 'Leave' },
  ];
  <Menu
  mode="inline"
  items={items}
  onClick={({ key }) => navigate(`/d/${key}`)} 
/>

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', background: colorBgContainer }}>
        <div>
          <div style={{ padding: 16, textAlign: 'center' }}>
            <img
              src="https://images.unsplash.com/photo-1660303238885-c9853ddb6feb?w=600"
              alt="logo"
              style={{ height: 60, width: 60, margin: '0 auto 16px' }}
            />
          </div>

          {/* ✅ Navigate to /d/user, /d/attendance, /d/leave */}
          <Menu mode="inline" items={items} onClick={({ key }) => navigate(`/d/${key}`)} />
        </div>

        <div style={{ padding: 16, borderTop: '1px solid #f0f0f0' }}>
          <Button type="primary" icon={<PlusOutlined />} block ref={buttonRef} onClick={showModal}>
            Send Invite
          </Button>
        </div>
      </div>

      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: modalPosition.top,
            left: modalPosition.left,
            zIndex: 1300,
            background: 'white',
            border: '1px solid #ccc',
            borderRadius: 8,
            padding: 16,
            width: 300,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        >
          <h3 style={{ marginBottom: 12 }}>Send Invite</h3>
          <Input
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: 16 }}
          />
          <input
            placeholder="Enter role"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '16px',
              borderRadius: '4px',
              border: '1px solid #d9d9d9',
            }}
          />
          <div style={{ textAlign: 'right' }}>
            <Button onClick={handleCancel} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button type="primary" onClick={handleOk} disabled={!selectedRole || !email}>
              Send
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
