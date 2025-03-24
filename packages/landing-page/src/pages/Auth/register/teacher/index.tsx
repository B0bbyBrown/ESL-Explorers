import { RegistrationForm } from "@/components/auth/RegistrationForm";
import styles from "@/styles/Auth.module.css";

export const TeacherRegistrationPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Teacher Registration</h1>
        <RegistrationForm platform="teacher" />
      </div>
    </div>
  );
};

export default TeacherRegistrationPage;
