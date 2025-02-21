import styles from "./ProgressTracker.module.css";

const ProgressTracker = () => {
  return (
    <div className={styles.progressContainer}>
      <h2>Progress Overview</h2>
      <p>📊 3/10 Lessons Completed</p>
      <div className={styles.progressBar}>
        <div className={styles.progressFill}></div>
      </div>
    </div>
  );
};

export default ProgressTracker;
