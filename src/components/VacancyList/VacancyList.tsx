import { VacancyItem } from "../VacancyItem/VacancyItem";
import "./VacancyList.css";
import Search from "../assets/images/Search.svg";
import { Loader, Pagination } from "@mantine/core";
import { useEffect, useState } from "react";
import { FormValues } from "../Filter/Filter";
import { NotFound } from "../NotFound/NotFound";

export interface Vacancies {
  id: number;
  profession: string;
  firmName: string;
  townTitle: string;
  typeOfWorkTitle: string;
  paymentFrom: number;
  paymentTo: number;
  currency: string;
  vacancyRichText: string;
}

export interface VacanciesObjectsDto {
  id: number;
  profession: string;
  firm_name: string;
  town: {
    id: number;
    title: string;
  };
  type_of_work: {
    id: number;
    title: string;
  };
  payment_from: number;
  payment_to: number;
  currency: string;
  vacancyRichText: string;
}

interface VacanciesDto {
  objects: VacanciesObjectsDto[];
  total: number;
}

interface VacancyListProps {
  formValues?: FormValues;
}

export function VacancyList({ formValues }: VacancyListProps) {
  const [vacancyList, setVacancyList] = useState<Vacancies[]>([]);
  const [activePage, setActivePage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [updateList, setUpdateList] = useState("");

  function calcTotal(totalPage: number) {
    const total = Math.ceil(
      totalPage /
        ((process.env.REACT_APP_PAGE_COUNT &&
          +process.env.REACT_APP_PAGE_COUNT) ||
          10)
    );
    //Максимальное количество сущностей, выдаваемых API равно 500.
    //Это значит, например, при поиске резюме по 10 резюме на страницу, всего можно просмотреть 50 страниц.
    let maxTotal = Math.ceil(
      500 /
        ((process.env.REACT_APP_PAGE_COUNT &&
          +process.env.REACT_APP_PAGE_COUNT) ||
          10)
    );
    setTotal(total > maxTotal ? maxTotal : total);
  }

  useEffect(() => {
    setIsLoaded(true);

    let formParams = "&published=1";
    if (formValues?.catalogues) {
      formParams += `&catalogues=${formValues?.catalogues}`;
    }
    if (formValues?.paymentFrom) {
      formParams += `&payment_from=${formValues?.paymentFrom}`;
    }
    if (formValues?.paymentTo) {
      formParams += `&payment_to=${formValues?.paymentTo}`;
    }

    let keyword = "";
    if (updateList) {
      keyword += `&keyword=${updateList}`;
    }

    fetch(
      `${process.env.REACT_APP_API_URL}/vacancies?count=${
        process.env.REACT_APP_PAGE_COUNT
      }&page=${activePage - 1}${formParams}${keyword}`,
      {
        headers: {
          "x-secret-key": `${process.env.REACT_APP_SECRET_KEY}`,
          "x-Api-App-Id": `${process.env.REACT_APP_CLIENT_SECRET}`,
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then(
        (result: VacanciesDto) => {
          calcTotal(result.total);
          const vacancyList: Vacancies[] = result.objects.map(
            (data: VacanciesObjectsDto): Vacancies => {
              return {
                id: data.id,
                profession: data.profession,
                firmName: data.firm_name,
                townTitle: data.town.title,
                typeOfWorkTitle: data.type_of_work.title,
                paymentFrom: data.payment_from,
                paymentTo: data.payment_to,
                currency: data.currency,
                vacancyRichText: data.vacancyRichText,
              };
            }
          );
          setVacancyList(vacancyList);
          setIsLoaded(false);
        },
        (error) => {
          setIsLoaded(false);
          Error(error);
        }
      );
  }, [activePage, formValues, updateList]);

  return (
    <div className="vacancyList">
      <div className="vacancyList__search">
        <img src={Search} alt="search" />
        <input
          data-elem="search-input"
          type="text"
          placeholder="Введите название вакансии"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <button data-elem="search-button" onClick={() => setUpdateList(search)}>
          Поиск
        </button>
      </div>
      {isLoaded ? (
        <div className="loader">
          <Loader size="xl" />
        </div>
      ) : (
        <div className="vacancyList__main">
          {vacancyList.map((el) => (
            <VacancyItem vacancy={el} key={el.id} />
          ))}
        </div>
      )}
      {total > 1 ? (
        <Pagination
          value={activePage}
          onChange={setActivePage}
          total={total}
          className="vacancyList__pagination"
        />
      ) : null}
      {total === 0 && !isLoaded ? <NotFound withoutButton={true} /> : null}
    </div>
  );
}
