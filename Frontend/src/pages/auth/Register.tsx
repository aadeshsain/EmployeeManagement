import { useNavigate, Link } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { registerUser } from "./authApi";

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = async (values: any) => {
    try {
      const payload = {
        name: values.fullname,
        email: values.email,
        password: values.password,
        companyName: values.CompanyName,
        number: values.number,
      };

      const data = await registerUser(payload);

      if (data.success) {
        toast.success("✅ Registration successful!", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/login");
      } else if (data.error === "EmailExists") {
        toast.warning("⚠️ Email already exists!", {
          position: "top-right",
          autoClose: 3000,
        });
      } else if (data.error === "CompanyExists") {
        toast.warning("⚠️ Company name already exists!", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.error(data.message || "❌ Registration failed!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "❌ Something went wrong!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <ToastContainer
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="colored"
  className="!z-[99999]"
/>


      <div className="flex w-full max-w-5xl rounded-2xl overflow-hidden bg-white shadow-2xl">
        {/* Left Side */}
        <div
          className="hidden md:flex w-1/2 bg-cover bg-center relative"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/736x/2b/5f/4c/2b5f4c0ee3d6a050a21ba97092a12013.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-10">
            <div className="text-center text-white">
              <h1 className="text-3xl font-bold mb-4">Create your Account</h1>
              <p className="text-gray-200">
                Share your artwork and Get projects!
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-2xl font-semibold mb-6 text-center text-black">
            Sign Up
          </h2>

          <Form layout="vertical" onFinish={handleRegister}>
            <Form.Item
              label="Full Name"
              name="fullname"
              rules={[{ required: true, message: "Please input your full name!" }]}
            >
              <Input size="large" placeholder="Enter your full name" />
            </Form.Item>

            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input size="large" placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="number"
              rules={[{ required: true, message: "Please input your mobile number!" }]}
            >
              <Input size="large" placeholder="Enter your phone number" />
            </Form.Item>

            <Form.Item
              label="Company Name"
              name="CompanyName"
              rules={[{ required: true, message: "Please input your company name!" }]}
            >
              <Input size="large" placeholder="Enter your company name" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password size="large" placeholder="Enter your password" />
            </Form.Item>

            <Form.Item>
              <Button
                type="default"
                htmlType="submit"
                className="w-full !bg-green-600 !hover:bg-green-700 border-none !text-white"
                size="large"
              >
                Join us →
              </Button>
            </Form.Item>

            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="!text-green-600 hover:underline">
                Sign In
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
