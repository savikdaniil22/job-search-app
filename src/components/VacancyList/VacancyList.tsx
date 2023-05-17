import { VacancyItem } from "../VacancyItem/VacancyItem";
import "./VacancyList.css";
import Search from "../assets/images/Search.svg";
import { Loader, Pagination } from "@mantine/core";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

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

export function VacancyList() {
  const [vacancyList, setVacancyList] = useState<Vacancies[]>([]);
  const [activePage, setPage] = useState(1);
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);

  let isFavorites = location.pathname === "/favorites";

  useEffect(() => {
    setIsLoaded(true);
    fetch(`${process.env.REACT_APP_API_URL}/vacancies`, {
      headers: {
        "x-secret-key": `${process.env.REACT_APP_SECRET_KEY}`,
        "x-Api-App-Id": `${process.env.REACT_APP_APP_ID}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result: VacanciesDto) => {
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
  }, []);

  return (
    <div className="vacancyList">
      {!isFavorites && (
        <div className="vacancyList__search">
          <img src={Search} alt="search" />
          <input type="text" placeholder="Введите название вакансии" />
          <button>Поиск</button>
        </div>
      )}
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
      <Pagination
        value={activePage}
        onChange={setPage}
        total={10}
        className="vacancyList__pagination"
      />
    </div>
  );
}
