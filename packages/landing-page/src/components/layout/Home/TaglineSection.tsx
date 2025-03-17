import styles from "./TaglineSection.module.css";

export const TaglineSection = () => {
  return (
    <section className={styles.tagline}>
      <h2 className={styles.taglineText}>Explore the universe of language!</h2>
      <p className={styles.taglineSubtext}>
        We provide teachers with stellar ESL resources and guide students on an
        exciting journey to English mastery!
      </p>
    </section>
  );
};

export default TaglineSection;
