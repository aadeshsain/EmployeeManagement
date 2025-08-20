import { Card, Row, Col, Avatar, Typography, Tag, message, Skeleton } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { fetchAllUsers } from './userApi';

const { Title } = Typography;

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchAllUsers();
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        message.error('Error fetching user data.');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const placeholderCards = new Array(4).fill(null);

  return (
    <div style={{ padding: '24px' }}>
      <Title level={3}>Organization Hierarchy</Title>
      <Row gutter={[24, 24]}>
        {(loading ? placeholderCards : users).map((user: any, index) => (
          <Col key={user?.id || index} xs={24} sm={12} md={8} lg={6}>
            <Card hoverable>
              {loading ? (
                <Skeleton avatar paragraph={{ rows: 3 }} active />
              ) : (
                <Card.Meta
                  avatar={
                    user.avatar ? (
                      <Avatar src={user.avatar} />
                    ) : (
                      <Avatar icon={<UserOutlined />} />
                    )
                  }
                  title={user.name}
                  description={
                    <>
                      <div>{user.email}</div>
                      <div>Role: {user.role}</div>
                      <Tag
                        color={user.status === 'Active' ? 'green' : 'volcano'}
                        style={{ marginTop: 8 }}
                      >
                        {user.status}
                      </Tag>
                    </>
                  }
                />
              )}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default UserPage;

// export default function UserPage() {
//   return (
//     <div>UserPage</div>
//   )
// }
