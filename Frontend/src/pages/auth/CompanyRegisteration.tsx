import { Form, Input, Button, message } from "antd";
import AuthLayout from "./AuthLayout";
 // corrected from "react-router"
import axios from "axios";
import { createCompany } from "./authApi";
import { useNavigate } from "react-router";
export default function CompanyRegisteration() {
  const onFinish = async (values: any) => {
  try {
    const navigate = useNavigate();
    const response = await createCompany({
      companyEmail: values.companyEmail,
      companyName: values.companyName,
    });

    message.success("Company created successfully!");
    navigate("/d/user"); // Navigate to user page after successful company creation
    console.log("Response:", response);

  } catch (error: any) {
    message.error(error.message || "Company creation failed.");
  }
};

  return (
    <AuthLayout
      title="Welcome!"
      subtitle="Register to access Projects workspace and manage your team efficiently."
    >
      <h2 className="text-2xl font-semibold mb-6 text-center text-black">Register</h2>
      <Form layout="vertical" onFinish={onFinish}>
        

       

      
    <Form.Item
          label="Comapny Name"
          name="companyName"
          rules={[{ required: true, message: "Please input your Email Id!" }]}
        >
          <Input size="large" />
        </Form.Item>
 <Form.Item
          label="Comapny Email"
          name="companyEmail"
          rules={[{ required: true, message: "Please input your Company Name!" }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full" size="large">
            Register Company
         
          </Button>
        </Form.Item>

        
      </Form>
    </AuthLayout>
  );
}
