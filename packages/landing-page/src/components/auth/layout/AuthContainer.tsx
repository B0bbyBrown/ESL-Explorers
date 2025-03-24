import { AuthContainerProps } from "../types/auth.types";
import styles from "../styles/AuthContainer.module.css";

export const AuthContainer = ({
  children,
  title,
  subtitle,
}: AuthContainerProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {children}
      </div>
    </div>
  );
};
