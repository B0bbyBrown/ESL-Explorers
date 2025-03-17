import styles from "./LearningToolsSection.module.css";

export const LearningToolsSection = () => {
  return (
    <section className={styles.learningTools}>
      <h2 className={styles.title}>Learning Tools Included</h2>

      <div className={styles.toolsGrid}>
        <div className={styles.tool}>
          <div className={styles.iconWrapper}>
            <svg
              className={styles.icon}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M15 10L12 13L9 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className={styles.toolTitle}>Games and Activities</h3>
          <p className={styles.toolDescription}>
            We offer a variety of fun games and activities designed to reinforce
            learning in an engaging way. From digital flashcards to interactive
            quizzes, these tools make practicing English both enjoyable and
            effective.
          </p>
        </div>

        <div className={styles.tool}>
          <div className={styles.iconWrapper}>
            <svg
              className={styles.icon}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6H20M4 12H20M4 18H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h3 className={styles.toolTitle}>Lessons</h3>
          <p className={styles.toolDescription}>
            Our lessons, meticulously structured and thoughtfully crafted, guide
            learners through essential English concepts. Each lesson builds upon
            previous knowledge, creating a comprehensive learning journey.
          </p>
        </div>

        <div className={styles.tool}>
          <div className={styles.iconWrapper}>
            <svg
              className={styles.icon}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>
          <h3 className={styles.toolTitle}>Assessments</h3>
          <p className={styles.toolDescription}>
            Monitor and track student progress with our comprehensive assessment
            tools. These evaluations help identify areas for improvement while
            measuring overall language development.
          </p>
        </div>

        <div className={styles.tool}>
          <div className={styles.iconWrapper}>
            <svg
              className={styles.icon}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4V20M4 12H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h3 className={styles.toolTitle}>Student Levels Offered</h3>
          <p className={styles.toolDescription}>
            We offer varied levels to suit the needs of all learners, from
            beginners to advanced students. Our adaptive system ensures each
            student progresses at their optimal pace through their learning
            journey.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LearningToolsSection;
