import { VacancyItem } from "../VacancyItem/VacancyItem";
import "./VacancyList.css";
import Search from "../assets/images/Search.svg";
import { Pagination } from "@mantine/core";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export function VacancyList() {
  const [activePage, setPage] = useState(1);
  const location = useLocation();

  let isFavorites = location.pathname === "/favorites";

  return (
    <div className="vacancyList">
      {!isFavorites && (
        <div className="vacancyList__search">
          <img src={Search} alt="search" />
          <input type="text" placeholder="Введите название вакансии" />
          <button>Поиск</button>
        </div>
      )}

      <div className="vacancyList__main">
        <VacancyItem />
      </div>
      <Pagination
        value={activePage}
        onChange={setPage}
        total={10}
        className="vacancyList__pagination"
      />
    </div>
  );
}
