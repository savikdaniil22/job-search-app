import "./VacancyInfo.css";
import { useState } from "react";
import Star from "../assets/images/Star.svg";
import ShadedStar from "../assets/images/ShadedStar.svg";
import Icon from "../assets/images/Icon.svg";

export function VacancyInfo() {
  const [isFavorites, setFavorites] = useState(false);

  function changeFavorites() {
    setFavorites(!isFavorites);
  }

  return (
    <div className="vacancyInfo">
      <div className="vacancyInfo__short">
        <div className="vacancyInfo__short__header">
          <p className="vacancyInfo__short__header name">Менеджер-дизайнер</p>
          <img
            src={isFavorites ? ShadedStar : Star}
            alt="Star"
            onClick={changeFavorites}
          />
        </div>
        <div className="vacancyInfo__short__description">
          <p className="vacancyInfo__short__description salary">
            з/п от 70000 rub{" "}
          </p>
          <p className="vacancyInfo__short__description delimiter">•</p>
          <p className="vacancyInfo__short__description info">
            Полный рабочий день
          </p>
        </div>
        <div className="vacancyInfo__short__location">
          <img
            src={Icon}
            alt="Icon"
            className="vacancyInfo__short__location icon"
          />
          <p className="vacancyInfo__short__location city">Новый Урегной</p>
        </div>
      </div>
      <div className="vacancyInfo__description">
        Разработка дизайн-макетов для наружной, интерьерной рекламы, полиграфии,
        сувенирной продукции. Подготовка и вёрстка макетов в CorelDraw, Adobe
        photoshop. Создание дизайна логотипов и брендбуков Управленческая
        функция: обучение, адаптация дизайнеров, их контроль, оценка
        Собеседование – после успешного прохождения тестового задания
        Рассматриваются кандидаты только с опытом работы Обязательно - наличие
        портфолио Умение самостоятельно принимать решения, умение объективно
        оценивать свою работу, работать в режиме многозадачности и переключаться
        с одного задания к другому и планировать свой день. Соблюдать сроки.
        Ответственный, исполнительный, целеустремленный, большим плюсом будет
        опыт управления Оформление по контракту Полный социальный пакет
        Премирование по результатам работы
      </div>
    </div>
  );
}
