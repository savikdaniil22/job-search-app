import "./VacancySearch.css";
import { Filter } from "../Filter/Filter";
import { VacancyList } from "../VacancyList/VacancyList";
import { FormValues } from "../Filter/Filter";
import { useState } from "react";

export function VacancySearch() {
  const [formValues, setFormValues] = useState<FormValues>();

  return (
    <div className="vacancySearch">
      <Filter onSetFormValues={setFormValues} />
      <VacancyList formValues={formValues} />
    </div>
  );
}
