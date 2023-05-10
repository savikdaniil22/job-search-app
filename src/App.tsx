import { HeaderResponsive } from "./components/HeaderResponsive/HeaderResponsive";
import { VacancySearch } from "./components/VacancySearch/VacancySearch";
import "./App.css";

export default function App() {
  const props = {
    links: [
      { link: "head", label: "Поиск вакансий", className: "head__button" },
      { link: "head", label: "Избранное", className: "head__button" },
    ],
  };

  return (
    <div className="app">
      <HeaderResponsive {...props} />
      <div className="main">
        <VacancySearch />
      </div>
    </div>
  );
}
