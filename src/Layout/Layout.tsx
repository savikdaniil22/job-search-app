import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Logo from "../components/assets/images/logo.svg";
import LogoSmall from "../components/assets/images/LogoSmall.svg";
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
          <picture>
            <source media="(max-width: 520px)" srcSet={LogoSmall}></source>
            <img src={Logo} className="logo" alt="logo"></img>
          </picture>
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
