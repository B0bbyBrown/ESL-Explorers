import { useRouter } from "next/router";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const router = useRouter();

  return (
    <aside className={styles.sidebar}>
      <ul>
        <li>
          <button onClick={() => router.push("/")}>🏠 Dashboard</button>
        </li>
        <li>
          <button onClick={() => router.push("/lessons")}>📖 Lessons</button>
        </li>
        <li>
          <button onClick={() => router.push("/progress")}>📊 Progress</button>
        </li>
        <li>
          <button onClick={() => router.push("/settings")}>⚙️ Settings</button>
        </li>
      </ul>
    </aside>
  );
}
