
import Sidebar from "../Components/Sidebar.jsx";
import Map from "../Components/Map.jsx";
import styles from "./AppLayout.module.css"
import User from "../Components/User.jsx";

export default function AppLayout() {
  return (
    <div className={styles.app}>
        <Sidebar />
        <Map />
        <User />
    </div>
  );
}
