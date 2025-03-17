import { NextPage } from "next";
import styles from "./student.module.css";

export const TeacherPlatformsPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>Teacher Platforms</h1>
      <div className={styles.platformsGrid}>
        {/* Platform cards will be added here */}
      </div>
    </div>
  );
};

export default TeacherPlatformsPage;
