import styles from "./ServicesSection.module.css";

export const ServicesSection = () => {
  return (
    <section className={styles.services}>
      <h2 className={styles.title}>Our Services</h2>

      <div className={styles.servicesList}>
        <div className={styles.serviceItem}>
          <div className={styles.serviceContent}>
            <h3 className={styles.serviceTitle}>Our Student Portal</h3>
            <p className={styles.serviceDescription}>
              Our lessons make learning feel like an exciting adventure, where
              young learners can explore and grow. Each lesson keeps students
              feeling they&apos;re in class. With our games and interactive
              exploration features, each lesson immerses students in fun while
              helping them gain confidence. Our platform creates a safe,
              inclusive, informal in-a-feel environment for everyday use.
            </p>
            <button className={styles.learnMore}>Learn More</button>
          </div>
          <div className={styles.circleGrid}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className={styles.circle}>
                <div className={styles.circleInner} />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.serviceItem}>
          <div className={styles.stackedPapers}>
            <div className={styles.paper}>
              <div className={styles.paperHeader}>
                <div className={styles.paperTitle} />
                <div className={styles.paperSubtitle} />
              </div>
              <div className={styles.paperContent}>
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={styles.paperLine} />
                ))}
              </div>
            </div>
            <div className={styles.paper}>
              <div className={styles.paperHeader}>
                <div className={styles.paperTitle} />
                <div className={styles.paperSubtitle} />
              </div>
              <div className={styles.paperContent}>
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={styles.paperLine} />
                ))}
              </div>
            </div>
            <div className={styles.paper}>
              <div className={styles.paperHeader}>
                <div className={styles.paperTitle} />
                <div className={styles.paperSubtitle} />
              </div>
              <div className={styles.paperContent}>
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={styles.paperLine} />
                ))}
              </div>
            </div>
          </div>
          <div className={styles.serviceContent}>
            <h3 className={styles.serviceTitle}>Our Teacher Portal</h3>
            <p className={styles.serviceDescription}>
              We provide tools and resources that make &quot;in-culture
              teaching&quot; effortless, allowing teachers to focus on
              delivering the lesson while ensuring it&apos;s effectively
              prepared. Our all-in-one subscription includes comprehensive
              lesson plans, interactive materials, assessments, and visuals,
              ensuring teachers have everything they need to offer high-quality
              lessons for their students.
            </p>
            <button className={styles.learnMore}>Learn More</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
