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
  required = true,
  defaultValue,
}) {
  return (
    <div className={styles.formGroup}>
      <input
        id={id}
        type={type}
        name={name}
        defaultValue={defaultValue}
        // value={value ? value : ""}
        placeholder={placeholder}
        className={styles.formField}
        disabled={isDisabled}
        onChange={onChange && ((e) => onChange(e.target.value))}
        onInput={onInput && ((e) => onInput(e))}
        checked={checked}
        required={required && true}
      />
      <label className={styles.formLabel} htmlFor={id}>
        {label}
      </label>
    </div>
  );
}

export default FormField;
