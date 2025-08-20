// import {  Col, Row } from "antd";
// import axiosInstance from "../../api/axiosInstance";

// export default function AuthLayout({
//   title,
//   subtitle,
//   children,
// }: {
//   title: string;
//   subtitle: string;
//   children: React.ReactNode;
// }) {      
//   return (
//     <>
    
//    <div
//       className="min-h-screen w-screen bg-cover bg-center flex justify-center items-center"
//       style={{
//         backgroundImage: `url("https://media.istockphoto.com/id/962135002/photo/abstract-blue-halftone-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=fchPxcQn_EzywQwAzTL5irFA4Ao6vPZnYxKI2YsUcRs=")`,
//       }}
//     >
//   <Row  gutter={24} justify="center" style={{ minHeight: '100vh', alignItems: 'center' }}>
//     <Col>
      
//         <Row justify="center" style={{ minHeight: '90vh', borderRadius:'10px', backgroundColor:"white",  alignItems: 'center' }}>
//           <Col>
           
//               <Row gutter={24} align="middle" justify="center">
//                 <Col span={12} style={{ textAlign: 'center' }}>
//                   <img src="https://images.unsplash.com/photo-1660303238885-c9853ddb6feb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGxvZ28lMjBiaXJkfGVufDB8fDB8fHww" alt="Company Logo" style={{
//     display: 'block',
//     margin: '0 auto',
//     height: 60, 
//     width: 60, 
//     marginBottom: 16
//   }}  />
//                   <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>{title}</h1>
//                   <p style={{ color: '#666' }}>{subtitle}</p>
//                 </Col>

//                 <Col span={12}>
//                   <div style={{ width: '100%', maxWidth: 300, margin: '0 auto',paddingRight:'50' }}>{children}</div>
//                 </Col>
//               </Row>
           
//           </Col>
//         </Row>
    
//     </Col>
//   </Row>
//   </div>
//  </> 
//   );
// }
// export const loginUser = async (credentials: {
//   email: string;
//   password: string;
// }) => {
//   try {
//     const response = await axiosInstance.post('/auth/login', credentials, {
//       headers: {
//         'ngrok-skip-browser-warning': '69420',
//         'Content-Type': 'application/json',
//       },
//     });
//     return response.data;
//   } catch (error: any) {
//     const message =
//       error?.response?.data?.message ||
//       error?.response?.data?.error ||
//       'Login failed. Please try again.';
//     throw new Error(message);
//   }
// };



import { Col, Row, message } from "antd";
import axiosInstance from "../../api/axiosInstance";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// -----------------
// Validation Schema
// -----------------
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
type LoginForm = z.infer<typeof loginSchema>;

// -----------------
// API Function
// -----------------
export const loginUser = async (credentials: LoginForm) => {
  try {
    const response = await axiosInstance.post("/auth/login", credentials, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
        "Content-Type": "application/json",
      },
    });
    return response.data; // { token, user }
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Login failed. Please try again.";
    throw new Error(message);
  }
};

// -----------------
// Layout
// -----------------
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
    <div
      className="min-h-screen w-screen bg-cover bg-center flex justify-center items-center"
      style={{
        backgroundImage: `url("https://media.istockphoto.com/id/962135002/photo/abstract-blue-halftone-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=fchPxcQn_EzywQwAzTL5irFA4Ao6vPZnYxKI2YsUcRs=")`,
      }}
    >
      <Row
        gutter={24}
        justify="center"
        style={{ minHeight: "100vh", alignItems: "center" }}
      >
        <Col>
          <Row
            justify="center"
            style={{
              minHeight: "90vh",
              borderRadius: "10px",
              backgroundColor: "white",
              alignItems: "center",
              boxShadow: "0px 6px 15px rgba(0,0,0,0.1)",
              padding: "20px",
            }}
          >
            <Col>
              <Row gutter={24} align="middle" justify="center">
                {/* Left Column: Branding */}
                <Col span={12} style={{ textAlign: "center" }}>
                  <img
                    src="https://images.unsplash.com/photo-1660303238885-c9853ddb6feb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGxvZ28lMjBiaXJkfGVufDB8fDB8fHww"
                    alt="Company Logo"
                    style={{
                      display: "block",
                      margin: "0 auto",
                      height: 70,
                      width: 70,
                      marginBottom: 16,
                    }}
                  />
                  <h1
                    style={{
                      fontSize: 26,
                      fontWeight: 700,
                      marginBottom: 8,
                      color: "#333",
                    }}
                  >
                    {title}
                  </h1>
                  <p style={{ color: "#666" }}>{subtitle}</p>
                </Col>

                {/* Right Column: Form */}
                <Col span={12}>
                  <div
                    style={{
                      width: "100%",
                      maxWidth: 350,
                      margin: "0 auto",
                      paddingRight: "20px",
                    }}
                  >
                    {children}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  );
}

// -----------------
// Login Form (Children)
// -----------------
export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      toast.success("Login successful!");
    },
    onError: (err: any) => {
      toast.error(err.message || "Login failed");
    },
  });

  const onSubmit = (values: LoginForm) => {
    mutation.mutate(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Email</label>
        <input
          type="email"
          {...register("email")}
          className="w-full border p-2 rounded"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          {...register("password")}
          className="w-full border p-2 rounded"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

<button
  type="submit"
  disabled={mutation.isPending}
  className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
>
  {mutation.isPending ? "Logging in..." : "Login"}
</button>
    </form>
  );
}
