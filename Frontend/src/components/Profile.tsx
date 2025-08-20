import React from "react";
import { Card, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const ProfilePage: React.FC = () => {
  const user = JSON.parse(localStorage.getItem("user") || '{}');

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
      <Card
        title="Profile"
        style={{ width: 400, textAlign: "center" }}
      >
        <Avatar 
          size={100}
          icon={<UserOutlined />} 
          src={user?.avatar || undefined} 
          style={{ marginBottom: 16 }}
        />
        <h2>{user?.name || "Guest"}</h2>
        <p><strong>Email:</strong> {user?.email || "-"}</p>
        <p><strong>Other Info:</strong> {user?.other || "-"}</p>
      </Card>
    </div>
  );
};

export default ProfilePage;