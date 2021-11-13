import styles from "./ClickButton.module.css";

function ClickButton({ label, onClick, disabled = false }) {
  // console.log(disabled);
  return (
    <button onClick={onClick} disabled={disabled} className={styles.btn}>
      {label}
    </button>
  );
}

export default ClickButton;
