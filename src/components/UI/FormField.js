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
}) {
  return (
    <div className="inputGroup">
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
      />
      <label className="inputLabel" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}

export default FormField;
