import { AuthContainer } from "@/components/auth/layout/AuthContainer";
import { LoginForm } from "@/components/auth/forms/LoginForm";

export const StudentLoginPage = () => {
  return (
    <AuthContainer
      title="Student Login"
      subtitle="Welcome back to ESL Explorers"
    >
      <LoginForm platform="student" />
    </AuthContainer>
  );
};

export default StudentLoginPage;
