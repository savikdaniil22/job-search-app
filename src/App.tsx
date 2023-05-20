import { VacancySearch } from "./components/VacancySearch/VacancySearch";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { NotFound } from "./components/NotFound/NotFound";
import { Layout } from "./Layout/Layout";
import { VacancyInfo } from "./components/VacancyInfo/VacancyInfo";
import { VacancyList } from "./components/VacancyList/VacancyList";
import { useState } from "react";
import { Login } from "./components/Login/Login";

export default function App() {
  const [isLogin, setIsLogin] = useState(false);

  if (!isLogin) {
    return <Login setIsLogin={setIsLogin} />;
  }
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<VacancySearch />} />
          <Route path="favorites" element={<VacancyList />} />
          <Route path="vacancies/:vacancyId" element={<VacancyInfo />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}
