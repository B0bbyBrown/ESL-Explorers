import { AuthContainer } from "@/components/auth/layout/AuthContainer";
import { RegistrationForm } from "@/components/auth/forms/RegistrationForm";

export const StudentRegistrationPage = () => {
  return (
    <AuthContainer
      title="Student Registration"
      subtitle="Create your student account to get started"
    >
      <RegistrationForm platform="student" />
    </AuthContainer>
  );
};

export default StudentRegistrationPage;
