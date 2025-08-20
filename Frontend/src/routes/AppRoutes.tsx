import { Routes, Route } from 'react-router';
import Register from '../pages/auth/Register';
import LoginPage from '../pages/auth/Login';
import CompanyRegisteration from '../pages/auth/CompanyRegisteration';
import LayoutWrapper from '../Layout/LayoutWrapper';
import UserPage from '../pages/Dashboard/UserPage';
import LeaveRequest from '../components/LeaveRequest';
import ProfilePage from '../components/Profile';
import TasksPage from '../pages/TasksPage';

const AppRouter = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/create-company" element={<CompanyRegisteration />} />

      {/* Dashboard Routes */}
      <Route path="/d" element={<LayoutWrapper />}>
        {/* Nested routes (relative paths) */}
        <Route path="profile" element={<ProfilePage />} />
        <Route path="user" element={<UserPage />} />
        <Route path="leave" element={<LeaveRequest />} />
        <Route path="tasks" element={<TasksPage />} /> {/* 👈 New route */}
      </Route>
    </Routes>
  );
};

export default AppRouter;
