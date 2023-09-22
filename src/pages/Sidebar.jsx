import { Outlet } from "react-router-dom";
import Logo from "./Logo";

import styles from "./Sidebar.module.css";
import AppNav from "./Appnav";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} By world-wise INC
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
