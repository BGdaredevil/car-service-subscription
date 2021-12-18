function ClickButton({ label, onClick, disabled = false, type }) {
  return (
    <button onClick={onClick} disabled={disabled} type={type} className="btn">
      {label}
    </button>
  );
}

export default ClickButton;
