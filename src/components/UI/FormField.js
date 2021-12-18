function FormField({
  type = "text",
  isDisabled = false,
  id,
  placeholder,
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
