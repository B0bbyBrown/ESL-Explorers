import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./HeroSection.module.css";

export const HeroSection = () => {
  const router = useRouter();

  const handlePlatformSelect = (platform: "student" | "teacher") => {
    router.push(`/register/${platform}`);
  };

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1>Welcome to ESL Explorers</h1>
        <p>Enhance your English skills with interactive lessons.</p>
        <div className={styles.buttonGroup}>
          <button
            onClick={() => handlePlatformSelect("student")}
            className={styles.button}
          >
            Student Registration
          </button>
          <button
            onClick={() => handlePlatformSelect("teacher")}
            className={styles.button}
          >
            Teacher Registration
          </button>
        </div>
      </div>
      {/* <img
        src="/images/hero.jpg"
        alt="Students learning English"
        className={styles.heroImage}
      /> */}
    </section>
  );
};

export default HeroSection;
