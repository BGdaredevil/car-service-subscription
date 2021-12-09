import "./RadioBtn.css";

function RadioBtn({ label, name, value, id, onChange, checked }) {
  return (
    <div className="radio-base">
      <label className="radio-container">
        <input
          onChange={(e) => onChange(e.target.value)}
          id={id}
          type="radio"
          name={name}
          value={value}
          checked={checked}
        />
        <span>{label}</span>
      </label>
    </div>
  );
}

export default RadioBtn;
