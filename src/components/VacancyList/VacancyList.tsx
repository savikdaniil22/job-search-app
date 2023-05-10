import { VacancyItem } from "./VacancyItem";
import "./VacancyList.css";
import Search from "./Search.svg";

export function VacancyList() {
  return (
    <div className="vacancyList">
      <div className="vacancyList__search">
        <img src={Search}></img>
        <input type="text" placeholder="Введите название вакансии" />
        <button>Поиск</button>
      </div>
      <div className="vacancyList__main">
        <VacancyItem />
      </div>
    </div>
  );
}
