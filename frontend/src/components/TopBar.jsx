const ITEMS = ["SUPA", "WS", "KGS", "RAG", "GRAL"];
const SUPA_SUBS = ["Carga", "Consulta"];
const WS_SUBS = ["Msj1"];

export default function TopBar({ activeItem, activeSub, onItemClick, onSubClick }) {
  const subs = activeItem === "SUPA" ? SUPA_SUBS : activeItem === "WS" ? WS_SUBS : null;

  return (
    <nav className="topbar">
      <ul className="topbar-items">
        {ITEMS.map((item) => (
          <li key={item}>
            <button
              className={`topbar-btn${activeItem === item ? " topbar-btn--active" : ""}`}
              onClick={() => onItemClick(item)}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
      {subs && (
        <ul className="topbar-subs">
          {subs.map((sub) => (
            <li key={sub}>
              <button
                className={`topbar-sub-btn${activeSub === sub ? " topbar-sub-btn--active" : ""}`}
                onClick={() => onSubClick(sub)}
              >
                {sub}
              </button>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
