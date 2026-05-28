const ITEMS = ["SUPA", "WS", "KGS", "RAG", "GRAL"];
const SUPA_SUBS = ["Carga", "Consulta"];

export default function TopBar({ activeItem, activeSub, onItemClick, onSubClick }) {
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
      {activeItem === "SUPA" && (
        <ul className="topbar-subs">
          {SUPA_SUBS.map((sub) => (
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
