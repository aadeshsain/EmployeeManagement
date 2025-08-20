import React from "react";
import { Layout, Dropdown, Menu, Avatar, Badge, Tooltip } from "antd";
import { BellOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const HeaderBar: React.FC = () => {
  const user = JSON.parse(localStorage.getItem("user") || '{}');
  const navigate = useNavigate();

  const menu = (
    <Menu>
      <Menu.Item 
        key="profile" 
        icon={<UserOutlined />}
        onClick={() => navigate("/profile")} // Profile page navigate
      >
        Profile
      </Menu.Item>
      <Menu.Item 
        key="logout" 
        icon={<LogoutOutlined />} 
        onClick={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      style={{
        background: "linear-gradient(90deg, #1e3a8a, #3b82f6)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 24px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        position: "sticky",
        top: 0,
        zIndex: 999,
      }}
    >
      {/* Left Side: Logo + Title */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Avatar
          src="https://images.unsplash.com/photo-1660303238885-c9853ddb6feb?w=60&auto=format&fit=crop&q=60"
          size="large"
        />
        <span style={{ color: "#fff", fontSize: 20, fontWeight: 600 }}>
          Dashboard
        </span>
      </div>

      {/* Right Side: Notifications + User */}
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <Tooltip title="Notifications">
          <Badge count={5} size="small">
            <BellOutlined style={{ color: "#fff", fontSize: 20, cursor: "pointer" }} />
          </Badge>    
        </Tooltip>

        <Dropdown overlay={menu} placement="bottomRight">
          <div style={{ display: "flex", alignItems: "center", cursor: "pointer", gap: 8 }}>
            <span style={{ color: "#fff", fontSize: 16 }}>
              {user?.name || "Guest"}
            </span>
            <Avatar icon={<UserOutlined />} />
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};

export default HeaderBar;
