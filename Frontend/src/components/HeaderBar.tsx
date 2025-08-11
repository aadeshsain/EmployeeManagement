import React from 'react';
import { Layout } from 'antd';

const { Header } = Layout;

const HeaderBar: React.FC = () => {
  return (
    <Header
      style={{
        background: '#1280e8ff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 24px',
      }}
    >
      <div style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>
      Overview
      </div>
      <div style={{ color: 'white', fontSize: '16px', paddingRight: 76 }}>
        Welcome User
      </div>
    </Header>
  );
};

export default HeaderBar;