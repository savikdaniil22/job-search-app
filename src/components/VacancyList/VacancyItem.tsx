import "./VacancyItem.css";
import Icon from "./Icon.svg";
import Star from "./Star.svg";
import ShadedStar from "./ShadedStar.svg";
import { useState } from "react";

// исправить vacancy__header-link
export function VacancyItem() {
  const [isFavorites, setFavorites] = useState(false);

  function changeFavorites() {
    setFavorites(!isFavorites);
  }

  return (
    <div className="vacancy">
      <div className="vacancy__header">
        <a className="vacancy__header-link">Менеджер-дизайнер</a>
        <img
          src={isFavorites ? ShadedStar : Star}
          alt="Star"
          className="vacancy__header-star"
          onClick={changeFavorites}
        />
      </div>
      <div className="vacancy__info">
        <p className="vacancy__salary">з/п от 70000 rub </p>
        <p className="vacancy__delimiter">•</p>
        <p className="vacancy__description">Полный рабочий день</p>
      </div>
      <div className="vacancy__location">
        <img src={Icon} alt="Icon" className="vacancy__location-icon" />
        <p className="vacancy__location-city">Новый Урегной</p>
      </div>
    </div>
  );
}
