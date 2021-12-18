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
  readonly,
  className,
  pattern,
}) {
  return (
    <div className={["inputGroup", className].join(" ")}>
      <input
        id={id}
        type={type}
        name={name}
        defaultValue={defaultValue}
        // value={value ? value : ""}
        placeholder={placeholder}
        className="inputField"
        disabled={isDisabled}
        onChange={onChange && ((e) => onChange(e.target.value))}
        onInput={onInput && ((e) => onInput(e))}
        checked={checked}
        required={required && true}
        readOnly={readonly}
        pattern={pattern}
      />
      <label className="inputLabel" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}

export default FormField;
