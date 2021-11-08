import styles from "./RadioBtn.module.css";

function RadioBtn({ label, name, value, id, onChange }) {
  return (
    <div className={styles.base}>
      <label className={styles.container}>
        <input
          onChange={(e) => onChange(e.target.value)}
          id={id}
          type="radio"
          name={name}
          value={value}
        />
        {/* <i></i> */}
        <span>{label}</span>
      </label>
    </div>
  );
}

export default RadioBtn;
