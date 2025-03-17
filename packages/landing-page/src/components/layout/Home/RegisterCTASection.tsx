import styles from "./RegisterCTASection.module.css";

export const RegisterCTASection = () => {
  return (
    <section className={styles.registerCta}>
      <h2 className={styles.ctaText}>
        Register today to start your learning journey!
      </h2>
      <button className={styles.registerButton}>Register</button>
    </section>
  );
};

export default RegisterCTASection;
