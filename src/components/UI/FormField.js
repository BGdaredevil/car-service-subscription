import styles from "./FormField.module.css";

function FormField({
  type = "text",
  isDisabled = false,
  id,
  placeholder,
  value,
  onChange,
  onInput,
  label,
  name,
  checked,
}) {
  return (
    <div className={styles.formGroup}>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        className={styles.formField}
        disabled={isDisabled}
        onChange={onChange && ((e) => onChange(e.target.value))}
        onInput={onInput && ((e) => onInput(e))}
        checked={checked}
        required
      ></input>
      <label className={styles.formLabel} htmlFor={id}>
        {label}
      </label>
    </div>
  );
}

export default FormField;
