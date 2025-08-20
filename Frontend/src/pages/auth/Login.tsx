import { useState } from "react";
import { useNavigate } from "react-router";
import { Form, Input, Button, Checkbox } from "antd";
import { Link } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "./authApi";

export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const res = await loginUser({
        email: values.email,
        password: values.password,
      });

      localStorage.setItem("access_token", res.token);

      toast.success("✅ Login successful!", {
        position: "top-right",
        autoClose: 3000,
      });

      navigate("/d");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "❌ Invalid credentials!", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <ToastContainer />

      <div className="flex w-full max-w-5xl rounded-2xl overflow-hidden bg-white shadow-2xl animate-fadeIn">
        {/* Left Side with Image */}
        <div
          className="hidden md:flex w-1/2 bg-cover bg-center relative animate-fadeInLeft"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/736x/2b/5f/4c/2b5f4c0ee3d6a050a21ba97092a12013.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-10">
            <div className="text-center text-white">
              <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
              <p className="text-gray-200">
                Sign in to access your projects and manage your team efficiently.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-2xl font-semibold mb-6 text-center text-black">
            Sign In
          </h2>

          <Form layout="vertical" onFinish={handleLogin}>
            <Form.Item
              label="Email address"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input size="large" placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password
                size="large"
                placeholder="Enter your password"
                visibilityToggle={{ visible: false }}
              />
            </Form.Item>

            <div className="flex justify-between items-center mb-4">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a className="text-sm !text-green-600 hover:underline" href="#">
                Forgot password?
              </a>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full !bg-green-600 !hover:bg-green-800"
                size="large"
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </Form.Item>

            <div className="text-center text-sm mt-4">
              Don't have an account?{" "}
              <Link to="/register" className="!text-green-600 hover:underline">
                Sign Up
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
