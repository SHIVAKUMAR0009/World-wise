import styles from "./Applayout.module.css";
import Map from "./Map";
import Sidebar from "./Sidebar";
import User from "./User";

function AppLayout() {
  return (
    <div className={styles.app}>
      <User />
      <Sidebar />
      <Map />
    </div>
  );
}

export default AppLayout;
