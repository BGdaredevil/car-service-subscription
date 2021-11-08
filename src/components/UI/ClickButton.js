import styles from "./ClickButton.module.css";

function ClickButton({ label, onClick }) {
  return (
    <button onClick={onClick} className={styles.btn}>
      {label}
    </button>
  );
}

export default ClickButton;
