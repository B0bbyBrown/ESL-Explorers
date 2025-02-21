import styles from "./StudentProfile.module.css";

const StudentProfile = () => {
  return (
    <div className={styles.profileContainer}>
      <h2>Student Profile</h2>
      <p>👤 Name: John Doe</p>
      <p>📧 Email: john.doe@example.com</p>
      <p>🏆 Level: Intermediate</p>
    </div>
  );
};

export default StudentProfile;
