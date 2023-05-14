import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Logo from "../components/assets/images/logo.svg";
import "./Layout.css";

export const Layout = () => {
  const navigate = useNavigate();

  return (
    <div className="layout">
      <header>
        <button
          onClick={async (event) => {
            navigate(`/`);
          }}
        >
          <img src={Logo} className="logo" alt="logo"></img>
        </button>
        <div className="header__links">
          <NavLink to="/">Поиск Вакансий</NavLink>
          <NavLink to="/favorites">Избранные</NavLink>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
