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
        role: "employee",
      };

      const data = await registerUser(payload);
      console.log("Registration successful:", data);

      navigate("/dashboard");
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
        >
          <Input size="small" />
        </Form.Item>

        <Form.Item
          label="Email address"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input size="small" />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="number"
          rules={[{ required: true, message: "Please input your mobile number" }]}
        >
          <Input size="small" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password size="small" />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("Passwords do not match!");
              },
            }),
          ]}
        >
          <Input.Password size="small" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full" size="large">
            Create Account
          </Button>
        </Form.Item>

        <div>
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </div>
      </Form>
    </AuthLayout>
  );
}
