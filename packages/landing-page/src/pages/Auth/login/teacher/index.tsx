import { AuthContainer } from "@/components/auth/layout";
import { LoginForm } from "@/components/auth/forms";
import styles from "@/components/auth/styles/Auth.module.css";

export const TeacherLoginPage = () => {
  return (
    <AuthContainer
      title="Teacher Login"
      subtitle="Welcome back to ESL Explorers"
    >
      <LoginForm platform="teacher" />
    </AuthContainer>
  );
};

export default TeacherLoginPage;
