import { useState } from "react";
import { NotFound } from "../NotFound/NotFound";
import { VacancyItem } from "../VacancyItem/VacancyItem";
import { Vacancies } from "../VacancyList/VacancyList";
import "./Favorites.css";

function setVacancyToLocalStorage(vacancy: Vacancies): void {
  let vacancyList = getVacancyFromLocalStorage();
  vacancyList.push(vacancy);
  localStorage.setItem("vacancy_list", JSON.stringify(vacancyList));
}

function getVacancyFromLocalStorage(): Vacancies[] {
  const vacancyListJson = localStorage.getItem("vacancy_list");
  if (vacancyListJson) {
    return JSON.parse(vacancyListJson);
  } else {
    return [];
  }
}

function deleteVacancyToLocalStorage(vacancy: Vacancies): void {
  let vacancyList = getVacancyFromLocalStorage();
  vacancyList = vacancyList.filter((data) => vacancy.id !== data.id);
  localStorage.setItem("vacancy_list", JSON.stringify(vacancyList));
}

export function isVacancyFavorite(vacancy: Vacancies): boolean {
  let vacancyList = getVacancyFromLocalStorage();
  vacancyList = vacancyList.filter((data) => vacancy.id === data.id);
  return vacancyList.length > 0;
}

export function changeFavorites(vacancy: Vacancies): void {
  if (isVacancyFavorite(vacancy)) {
    deleteVacancyToLocalStorage(vacancy);
  } else {
    setVacancyToLocalStorage(vacancy);
  }
}

export function Favorites() {
  const [clickFavorites, setClickFavorites] = useState(false);

  const onClickFavorites = () => {
    setClickFavorites(!clickFavorites);
  };

  return (
    <div className="favorites">
      {getVacancyFromLocalStorage().length === 0 ? (
        <NotFound />
      ) : (
        getVacancyFromLocalStorage().map((el) => (
          <VacancyItem
            onClickFavorites={onClickFavorites}
            vacancy={el}
            key={el.id}
          />
        ))
      )}
    </div>
  );
}
