import "./IcoApp.css";

function IcoApp({ icono = "", label = "", onClick }) {
  const handleClick = (e) => {
    e.preventDefault();
    onClick();
  };

  return (
    <div
      className="cont-ico-app cont-card"
      onClick={(e) => {
        handleClick(e);
      }}
    >
      <div className={icono + " format-ico-app"}></div>
      <p>{label}</p>
    </div>
  );
}

export default IcoApp;
