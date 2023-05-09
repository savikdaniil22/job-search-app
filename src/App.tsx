import { MantineProvider, Text } from "@mantine/core";
import { HeaderResponsive } from "./components/HeaderResponsive/HeaderResponsive";
import { Filter } from "./components/Filter/Filter";

export default function App() {
  const props = {
    links: [
      { link: "head", label: "Поиск вакансий", className: "buttonJobSearch" },
      { link: "head", label: "Избранное", className: "buttonFavorites" },
    ],
  };

  return (
    <div>
      <MantineProvider theme={{ colorScheme: "light" }}>
        <HeaderResponsive {...props} />
        <Filter />
      </MantineProvider>
    </div>
  );
}
