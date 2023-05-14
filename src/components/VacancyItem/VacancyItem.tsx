import "./VacancyItem.css";
import Icon from "../assets/images/Icon.svg";
import Star from "../assets/images/Star.svg";
import ShadedStar from "../assets/images/ShadedStar.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function VacancyItem() {
  const [isFavorites, setFavorites] = useState(false);

  const navigate = useNavigate();

  function changeFavorites() {
    setFavorites(!isFavorites);
  }

  return (
    <div className="vacancy">
      <div className="vacancy__header">
        <button
          className="vacancy__header link"
          onClick={async (event) => {
            navigate(`/vacancy/1`);
          }}
        >
          Менеджер-дизайнер
        </button>
        <img
          src={isFavorites ? ShadedStar : Star}
          alt="Star"
          className="vacancy__header star"
          onClick={changeFavorites}
        />
      </div>
      <div className="vacancy__info">
        <p className="vacancy__salary">з/п от 70000 rub </p>
        <p className="vacancy__delimiter">•</p>
        <p className="vacancy__description">Полный рабочий день</p>
      </div>
      <div className="vacancy__location">
        <img src={Icon} alt="Icon" className="vacancy__location icon" />
        <p className="vacancy__location .city">Новый Урегной</p>
      </div>
    </div>
  );
}
