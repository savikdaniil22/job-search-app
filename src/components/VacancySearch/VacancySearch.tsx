import "./VacancySearch.css";
import { Filter } from "../Filter/Filter";
import { VacancyList } from "../VacancyList/VacancyList";

export function VacancySearch() {
  return (
    <div className="vacancySearch">
      <Filter />
      <VacancyList />
    </div>
  );
}
