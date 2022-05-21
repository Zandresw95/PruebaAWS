import "./ContInput.css";

function ContInput({ label = "", children, icono, disabled = false }) {
  return (
    <div className="cont-input ">
      {label !== "" && <p>{label}</p>}
      <div className={"cont-input-ico " + (disabled ? "disabled" : "")}>
        {icono && icono !== "" && (
          <div className={icono + " format-ico-form"}></div>
        )}
        <div
          className={
            "input-content " + (icono && icono !== "" ? "" : "input-no-ico")
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default ContInput;
