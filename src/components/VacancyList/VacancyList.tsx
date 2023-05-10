import { VacancyItem } from "./VacancyItem";
import "./VacancyList.css";
import Search from "./Search.svg";
import { Pagination } from "@mantine/core";
import { useState } from "react";

export function VacancyList() {
  const [activePage, setPage] = useState(1);
  return (
    <div className="vacancyList">
      <div className="vacancyList__search">
        <img src={Search} />
        <input type="text" placeholder="Введите название вакансии" />
        <button>Поиск</button>
      </div>
      <div className="vacancyList__main">
        <VacancyItem />
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
