// pages/index.tsx
import { useSession } from "../contexts/SessionContext";
import { getPlatformUrl } from "../../../global-comps/src/utils/platformUrls";
import styles from "../styles/pages/Home.module.css";
import appStyles from "../styles/layout/App.module.css";

export function LandingPage() {
  const { session, loading } = useSession();

  if (loading) {
    return <div className={appStyles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.hero}>
          <h1 className={styles.title}>Welcome to ESL Explorers</h1>
          <p className={styles.subtitle}>
            The perfect platform for language learning and teaching
          </p>
          {session && (
            <a
              href={getPlatformUrl(session.user.user_metadata.platform)}
              className={styles.dashboardLink}
            >
              Go to Dashboard
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
