// src/auth/Register.tsx
import { useNavigate } from "react-router"; // 👈 Correct if using react-router v6 (but see note below)
import { Form, Input, Button } from "antd";
import { Link } from "react-router"; 
import { registerUser } from "./authApi";
import AuthLayout from "./AuthLayout";

export default function Register() {
  const navigate = useNavigate(); 

  const handleRegister = async (values: any) => {
    try {
      const payload = {
        name: values.fullname,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
        companyName: values.CompanyName,
      };

      const data = await registerUser(payload);
      console.log("Registration successful:", data);

      navigate("/login");
    } catch (error: any) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <AuthLayout
      title="Welcome!"
      subtitle="Register to access Projects workspace and manage your team efficiently."
    >
      <h2 className="text-2xl font-semibold mb-6 text-center text-black">Register</h2>
     <Form layout="vertical" onFinish={handleRegister}>

  <Form.Item
    label="Full Name"
    name="fullname"
    rules={[{ required: true, message: "Please input your full name!" }]}
    style={{ marginBottom: 12 }} // reduced spacing
  >
    <Input size="large" />
  </Form.Item>

  <Form.Item
    label="Email address"
    name="email"
    rules={[{ required: true, message: "Please input your email!" }]}
    style={{ marginBottom: 12 }}
  >
    <Input size="large" />
  </Form.Item>

  <Form.Item
    label="Phone Number"
    name="number"
    rules={[{ required: true, message: "Please input your mobile number" }]}
    style={{ marginBottom: 12 }}
  >
    <Input size="large" />
  </Form.Item>
   <Form.Item
    label="Comapany Name"
    name="CompanyName"
    rules={[{ required: true, message: "Please input your Comapny name!" }]}
    style={{ marginBottom: 12 }} // reduced spacing
  >
    <Input size="large" />
  </Form.Item>


  <Form.Item
    label="Password"
    name="password"
    rules={[{ required: true, message: "Please input your password!" }]}
    style={{ marginBottom: 12 }}
  >
    <Input.Password size="large" />
  </Form.Item>

  

  <Form.Item style={{ marginBottom: 16 }}>
    <Button type="primary" htmlType="submit" className="w-full" size="large">
      Create Account
    </Button>
  </Form.Item>
   <div className="text-center text-sm">
    Already have an account?{" "}
    <Link to="/login" className="text-blue-600 hover:underline">
      Sign In
    </Link>
  </div>
  </Form>

    </AuthLayout>
  );
}
