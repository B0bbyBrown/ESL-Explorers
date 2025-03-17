import styles from "./ServicesSection.module.css";

export const ServicesSection = () => {
  return (
    <section className={styles.services}>
      <h2 className={styles.sectionTitle}>Our Services</h2>

      <div className={styles.serviceCard}>
        <h3 className={styles.serviceTitle}>Our Student Portal</h3>
        <p className={styles.serviceDescription}>
          Our comprehensive student portal gives you everything you need to
          succeed in your learning journey.
        </p>
        <ul className={styles.serviceFeatures}>
          <li>Access to all courses and learning materials</li>
          <li>Track your progress and performance</li>
          <li>Connect with instructors and fellow students</li>
          <li>Personalized learning recommendations</li>
        </ul>
        <button className={styles.learnMoreButton}>Learn More</button>
      </div>
    </section>
  );
};

export default ServicesSection;
