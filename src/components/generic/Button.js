import "./Button.css";

function Button({
  label,
  icono = "",
  onClick,
  disabled = false,
  rojo = false,
  type = "button",
}) {
  const handleClick = (e) => {
    e.preventDefault();
    if (!disabled) {
      onClick();
    }
  };

  return (
    <button
      className={"btn " + (disabled ? " disabled " : "")}
      onClick={handleClick}
      type={type}
    >
      <div
        className={
          "format-ico-btn " +
          icono +
          (disabled ? " disabled " : "") +
          (rojo ? " format-ico-btn-rojo " : "")
        }
      ></div>
      <span className={rojo ? " btn-label-rojo " : ""}>{label}</span>
    </button>
  );
}

export default Button;
