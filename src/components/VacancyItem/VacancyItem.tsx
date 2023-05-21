import "./VacancyItem.css";
import Icon from "../assets/images/Icon.svg";
import Star from "../assets/images/Star.svg";
import ShadedStar from "../assets/images/ShadedStar.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Vacancies } from "../VacancyList/VacancyList";
import { changeFavorites, isVacancyFavorite } from "../Favorites/Favorites";

interface VacancyItemProps {
  vacancy: Vacancies;
  onClickFavorites?: () => void;
}

export function VacancyItem({ vacancy, onClickFavorites }: VacancyItemProps) {
  const [isFavorites, setFavorites] = useState(false);

  const navigate = useNavigate();

  function clickFavorites(vacancyItem: Vacancies): void {
    setFavorites(!isFavorites);
    changeFavorites(vacancyItem);
    onClickFavorites && onClickFavorites();
  }

  return (
    <div className="vacancy" data-elem={`vacancy-${vacancy.id}`}>
      <div className="vacancy__header">
        <button
          className="vacancy__header link"
          onClick={async (event) => {
            navigate(`/vacancies/${vacancy.id}`);
          }}
        >
          {vacancy.profession}
        </button>
        <img
          data-elem={`vacancy-${vacancy.id}-shortlist-button`}
          src={isVacancyFavorite(vacancy) ? ShadedStar : Star}
          alt="Star"
          className="vacancy__header star"
          onClick={() => clickFavorites(vacancy)}
        />
      </div>
      <div className="vacancy__info">
        <p className="vacancy__salary">
          {vacancy.paymentFrom && vacancy.paymentTo
            ? `з/п ${vacancy.paymentFrom} - ${vacancy.paymentTo} `
            : vacancy.paymentFrom
            ? `з/п от ${vacancy.paymentFrom} `
            : vacancy.paymentTo
            ? `з/п ${vacancy.paymentTo} `
            : ""}
          {vacancy.paymentFrom || vacancy.paymentTo ? vacancy.currency : ""}
        </p>
        <p className="vacancy__delimiter">•</p>
        <p className="vacancy__description">{vacancy.typeOfWorkTitle}</p>
      </div>
      <div className="vacancy__location">
        <img src={Icon} alt="Icon" className="vacancy__location icon" />
        <p className="vacancy__location .city">{vacancy.townTitle}</p>
      </div>
    </div>
  );
}
