function FormField({
  type = "text",
  isDisabled = false,
  className,
  id,
  placeholder,
  value,
  onChange,
  onBlur,
  name,
}) {
  return (
    <>
      <label className={className} htmlFor={id}>
        {name}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        className={className}
        disabled={isDisabled}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur && ((e) => onBlur(e))}
      ></input>
    </>
  );
}

export default FormField;
