import "./ContInputDon.css";

function ContInput({ label = "", children}) {
  return (
    <div className="cont-input-don">
      {label !== "" && <p>{label}</p>}
      <div className="cont-input-cont-don">
          {children}
      </div>
    </div>
  );
}

export default ContInput;
