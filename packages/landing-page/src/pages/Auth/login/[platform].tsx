import { useRouter } from "next/router";
import { LoginForm } from "@/components/auth/LoginForm";
import styles from "@/styles/Auth.module.css";

export const PlatformLoginPage = () => {
  const router = useRouter();
  const { platform } = router.query;

  // Validate platform type
  if (platform !== "student" && platform !== "teacher") {
    router.push("/Auth/login");
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>
          {platform === "student" ? "Student Login" : "Teacher Login"}
        </h1>
        <LoginForm platform={platform} />
      </div>
    </div>
  );
};

export default PlatformLoginPage;
