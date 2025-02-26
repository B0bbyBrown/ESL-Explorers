import styles from "../styles/pages/Content.module.css";

export function AboutPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>About ESL Explorers</h1>
      <div className={styles.content}>
        <p>
          ESL Explorers is a comprehensive online platform dedicated to making
          English language learning accessible, engaging, and effective.
        </p>
        {/* Add more content */}
      </div>
    </div>
  );
}

export default AboutPage;
