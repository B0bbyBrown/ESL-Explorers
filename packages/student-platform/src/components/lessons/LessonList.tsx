import styles from "./LessonsList.module.css";

const LessonList = () => {
  return (
    <div className={styles.lessonContainer}>
      <h2>Your Lessons</h2>
      <ul>
        <li>📖 Lesson 1: English Basics</li>
        <li>📖 Lesson 2: Grammar Fundamentals</li>
        <li>📖 Lesson 3: Advanced Vocabulary</li>
      </ul>
    </div>
  );
};

export default LessonList;
