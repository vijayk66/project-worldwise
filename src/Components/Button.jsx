import styles from "./Button.module.css";

export default function Button({ children, type, onClickBtn }) {
  return (
    <button onClick={onClickBtn} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}
