import "./VacancyInfo.css";
import { useEffect, useState } from "react";
import Star from "../assets/images/Star.svg";
import ShadedStar from "../assets/images/ShadedStar.svg";
import Icon from "../assets/images/Icon.svg";
import { useLocation } from "react-router-dom";
import { Vacancies, VacanciesObjectsDto } from "../VacancyList/VacancyList";
import { Loader } from "@mantine/core";
import { changeFavorites, isVacancyFavorite } from "../Favorites/Favorites";

export function VacancyInfo() {
  const [vacancyInfo, setVacancyInfo] = useState<Vacancies>();
  const [isFavorites, setFavorites] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const location = useLocation();

  function clickFavorites(vacancyItem: Vacancies): void {
    setFavorites(!isFavorites);
    changeFavorites(vacancyItem);
  }

  useEffect(() => {
    setIsLoaded(true);
    fetch(`${process.env.REACT_APP_API_URL}${location.pathname}`, {
      headers: {
        "x-secret-key": `${process.env.REACT_APP_SECRET_KEY}`,
        "x-Api-App-Id": `${process.env.REACT_APP_CLIENT_SECRETE}`,
      },
    })
      .then((res) => res.json())
      .then(
        (data: VacanciesObjectsDto) => {
          let vacancyInfo: Vacancies = {
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
          setVacancyInfo(vacancyInfo);
          setIsLoaded(false);
        },
        (error) => {
          setIsLoaded(false);
          Error(error);
        }
      );
  }, [location]);

  return (
    <div className="vacancyInfo">
      {isLoaded ? (
        <div className="loader">
          <Loader size="xl" />
        </div>
      ) : (
        <>
          <div className="vacancyInfo__short">
            <div className="vacancyInfo__short__header">
              <p className="vacancyInfo__short__header name">
                {vacancyInfo?.profession}
              </p>
              <img
                data-elem={`vacancy-${vacancyInfo?.id}-shortlist-button`}
                src={
                  vacancyInfo && isVacancyFavorite(vacancyInfo)
                    ? ShadedStar
                    : Star
                }
                alt="Star"
                onClick={() => vacancyInfo && clickFavorites(vacancyInfo)}
              />
            </div>
            <div className="vacancyInfo__short__description">
              <p className="vacancyInfo__short__description salary">
                {vacancyInfo?.paymentFrom && vacancyInfo?.paymentTo
                  ? `з/п ${vacancyInfo?.paymentFrom} - ${vacancyInfo?.paymentTo} `
                  : vacancyInfo?.paymentFrom
                  ? `з/п от ${vacancyInfo?.paymentFrom} `
                  : vacancyInfo?.paymentTo
                  ? `з/п до ${vacancyInfo?.paymentTo} `
                  : ""}
                {vacancyInfo?.paymentFrom || vacancyInfo?.paymentTo
                  ? vacancyInfo?.currency
                  : ""}
              </p>
              <p className="vacancyInfo__short__description delimiter">•</p>
              <p className="vacancyInfo__short__description info">
                {vacancyInfo?.typeOfWorkTitle}
              </p>
            </div>
            <div className="vacancyInfo__short__location">
              <img
                src={Icon}
                alt="Icon"
                className="vacancyInfo__short__location icon"
              />
              <p className="vacancyInfo__short__location city">
                {vacancyInfo?.townTitle}
              </p>
            </div>
          </div>
          <div className="vacancyInfo__description">
            <div
              dangerouslySetInnerHTML={{
                __html: vacancyInfo?.vacancyRichText || "",
              }}
            ></div>
          </div>
          <div className="vacancyInfo__footer"></div>
        </>
      )}
    </div>
  );
}
