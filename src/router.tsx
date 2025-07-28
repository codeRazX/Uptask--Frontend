import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import AuthLayout from "@/layouts/AuthLayout";
import DeashboardView from "@/views/DeashboardView";
import CreateProjectView from "@/views/projects/CreateProjectView";
import EditProjectView from "@/views/projects/EditProjectView";
import ProjectDetailsView from "@/views/projects/ProjectDetailsView";
import LoginView from "@/views/auth/LoginView";
import RegisterView from "@/views/auth/RegisterView";
import ConfirmAccountView from "@/views/auth/ConfirmAccountView";
import NotFoundPage from "@/views/NotFoundPage";
import RequestNewTokenView from "@/views/auth/RequestNewTokenView";
import ForgotPasswordView from "@/views/auth/ForgotPasswordView";
import NewPasswordView from "@/views/auth/NewPasswordView";
import ProjectTeamView from "@/views/projects/ProjectTeamView";
import ProfileLayout from "@/layouts/ProfileLayout";
import ProfileView from "@/views/profile/ProfileView";
import PasswordProfileView from "@/views/profile/PasswordProfileView";

export default function Router() {
  return (
  
    <BrowserRouter>
      <Routes>
        
        <Route element={<AppLayout />}>
          <Route path="/" element={<DeashboardView />} index />
          <Route path="/projects/create"  element={<CreateProjectView />} />
          <Route path="/projects/:projectId"  element={<ProjectDetailsView />} />
          <Route path="/projects/:projectId/edit"  element={<EditProjectView />} />
          <Route path="/projects/:projectId/team"  element={<ProjectTeamView />} />
          <Route element={<ProfileLayout />}>
            <Route path="/profile" element={<ProfileView />} />
            <Route path="/profile/password" element={<PasswordProfileView />} />
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView/>} index/>
          <Route path="/auth/register" element={<RegisterView/>} />
          <Route path="/confirm-account/:tokenConfirm" element={<ConfirmAccountView/>} />
          <Route path="/auth/request-token" element={<RequestNewTokenView/>} />
          <Route path="/auth/forgot-password" element={<ForgotPasswordView/>} />
          <Route path="/new-password/:tokenPassword" element={<NewPasswordView/>} />
        </Route>
        
        <Route element={<AuthLayout />}>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  
  )
}
