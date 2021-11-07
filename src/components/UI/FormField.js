function FormField({
  type = "text",
  isDisabled = false,
  className,
  id,
  placeholder,
  value,
  onChange,
  onBlur,
  label,
  name,
  checked,
}) {
  return (
    <>
      <label className={className} htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        className={className}
        disabled={isDisabled}
        onChange={onChange && ((e) => onChange(e.target.value))}
        onBlur={onBlur && ((e) => onBlur(e))}
        checked={checked}
      ></input>
    </>
  );
}

export default FormField;
