import "./VacancySearch.css";
import { Filter } from "../Filter/Filter";
import { VacancyList } from "../VacancyList/VacancyList";
import { FormValues } from "../Filter/Filter";

export function VacancySearch() {
  const setFormValues = (form: FormValues) => {
    console.log(form);
  };

  return (
    <div className="vacancySearch">
      <Filter setFormValues={setFormValues} />
      <VacancyList />
    </div>
  );
}
