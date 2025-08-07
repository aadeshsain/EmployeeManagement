import {  Col, Row } from "antd";
import axiosInstance from "../../api/axiosInstance";

export default function AuthLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <>
    
   <div
      className="min-h-screen w-screen bg-cover bg-center flex justify-center items-center"
      style={{
        backgroundImage: `url("https://media.istockphoto.com/id/962135002/photo/abstract-blue-halftone-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=fchPxcQn_EzywQwAzTL5irFA4Ao6vPZnYxKI2YsUcRs=")`,
      }}
    >
  <Row  gutter={24} justify="center" style={{ minHeight: '100vh', alignItems: 'center' }}>
    <Col>
      
        {/* First Row: Branding */}
        <Row justify="center" style={{ minHeight: '90vh', borderRadius:'10px', backgroundColor:"white",  alignItems: 'center' }}>
          <Col>
           
              <Row gutter={24} align="middle" justify="center">
                {/* Left Column: Branding */}
                <Col span={12} style={{ textAlign: 'center' }}>
                  <img src="https://images.unsplash.com/photo-1660303238885-c9853ddb6feb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGxvZ28lMjBiaXJkfGVufDB8fDB8fHww" alt="Company Logo" style={{
    display: 'block',
    margin: '0 auto',
    height: 60, // increased height
    width: 60,  // added width for consistency
    marginBottom: 16
  }}  />
                  <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>{title}</h1>
                  <p style={{ color: '#666' }}>{subtitle}</p>
                </Col>

                {/* Right Column: Form */}
                <Col span={12}>
                  <div style={{ width: '100%', maxWidth: 300, margin: '0 auto',paddingRight:'50' }}>{children}</div>
                </Col>
              </Row>
           
          </Col>
        </Row>
    
    </Col>
  </Row>
  </div>
 </> 
  );
}
export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axiosInstance.post('/auth/login', credentials, {
      headers: {
        'ngrok-skip-browser-warning': '69420',
        'Content-Type': 'application/json',
      },
    });
    return response.data; // should return { token: '...', user: {...} }
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      'Login failed. Please try again.';
    throw new Error(message);
  }
};
