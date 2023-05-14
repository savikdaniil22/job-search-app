import Frame from "../assets/images/Frame.svg";
import "./NotFound.css";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="notFound">
      <img src={Frame} alt="frame"></img>
      <h1>Упс, здесь еще ничего нет!</h1>
      <Link to="/">Поиск Вакансий</Link>
    </div>
  );
}
