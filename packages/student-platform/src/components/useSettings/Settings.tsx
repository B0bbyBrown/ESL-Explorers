import styles from "./Settings.module.css";

const Settings = () => {
  return (
    <div className={styles.settingsContainer}>
      <h2>Account Settings</h2>
      <p>🔒 Change Password</p>
      <p>🔔 Notification Preferences</p>
    </div>
  );
};

export default Settings;
