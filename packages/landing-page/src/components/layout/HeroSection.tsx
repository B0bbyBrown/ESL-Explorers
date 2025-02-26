import styles from "./HeroSection.module.css";

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1>Welcome to ESL Explorers</h1>
        <p>Enhance your English skills with interactive lessons.</p>
        <a href="/signup" className={styles.ctaButton}>
          Get Started
        </a>
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
