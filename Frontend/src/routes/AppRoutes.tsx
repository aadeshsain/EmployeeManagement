import { Routes, Route } from "react-router";
import Register from "../pages/auth/Register";
import LoginPage from "../pages/auth/Login";
import CompanyRegisteration from "../pages/auth/CompanyRegisteration";
import LayoutWrapper from "../Layout/LayoutWrapper";
import UserPage from "../pages/Dashboard/UserPage";
import LeaveRequest from "../components/LeaveRequest";
import ProfilePage from "../components/Profile";
import TasksPage from "../pages/TasksPage";
import ProjectsList from "../pages/ProjectsList";
import ProjectForm from "../pages/ProjectForm";
import ProjectDetails from "../pages/ProjectDetails";
import NewProject from "../pages/NewProject";

const AppRouter = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/create-company" element={<CompanyRegisteration />} /> 

      {/* Dashboard Routes */}
      <Route path="/d" element={<LayoutWrapper />}>
        <Route path="profile" element={<ProfilePage />} />
        <Route path="user" element={<UserPage />} />
        <Route path="leave" element={<LeaveRequest />} />
        <Route path="tasks" element={<TasksPage />} />

        {/* 🔥 Projects Module */}
        <Route path="projects" element={<ProjectsList />} />
        <Route path="/d/projects/new" element={<NewProject />} />
        <Route path="projects/edit/:id" element={<ProjectForm />} />
        <Route path="projects/:id" element={<ProjectDetails />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
