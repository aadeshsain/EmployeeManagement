import { BrowserRouter, Routes, Route } from 'react-router';
import Register from '../pages/auth/Register'
import LoginPage from '../pages/auth/Login'
import CompanyRegisteration from '../pages/auth/CompanyRegisteration';
import LayoutWrapper from '../Layout/LayoutWrapper';
import UserPage from '../pages/Dashboard/UserPage';
import LeaveRequest from '../components/LeaveRequest';
const AppRouter = () => {
  return (
  
      <Routes>
       
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-company" element={<CompanyRegisteration />} />
      
       <Route path="/d" element={<LayoutWrapper />}>
       
       <Route path="user" element={<UserPage />} />
       <Route path="leave" element={<LeaveRequest />} />
       </Route>
      </Routes>
      
      
  );
};

export default AppRouter;