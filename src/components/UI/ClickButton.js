import styles from "./ClickButton.module.css";

function ClickButton({ label, onClick, disabled = false, type }) {
  // console.log(disabled);
  return (
    <button onClick={onClick} disabled={disabled} type={type} className={styles.btn}>
      {label}
    </button>
  );
}

export default ClickButton;
