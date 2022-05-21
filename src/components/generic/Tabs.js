import "./Tabs.css";

function Tabs({ lista = [], selected, setSelected }) {
  return (
    <ul className="cont-tabs">
      {lista.map((el, i) => {
        return (
          <li
            className={selected === i ? "active" : ""}
            key={Math.trunc(Math.random() * 10000000)}
            onClick={() => {
              setSelected(i);
            }}
          >
            {el}
          </li>
        );
      })}
    </ul>
  );
}

export default Tabs;
