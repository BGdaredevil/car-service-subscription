function ClickButton({ label, onClick, disabled = false, type }) {
  // console.log(disabled);
  return (
    <button onClick={onClick} disabled={disabled} type={type} className="btn">
      {label}
    </button>
  );
}

export default ClickButton;
