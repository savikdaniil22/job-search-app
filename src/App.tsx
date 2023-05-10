import { VacancySearch } from "./components/VacancySearch/VacancySearch";
import Logo from "/Users/Savik/Paralect/job-search-app/src/logo.svg";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <header>
        <img src={Logo} className="logo"></img>
        <div className="header__buttons">
          <button className="active">Поиск вакансий</button>
          <button>Избранные</button>
        </div>
      </header>
      <main>
        <VacancySearch />
      </main>
    </div>
  );
}
