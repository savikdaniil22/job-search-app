import { NumberInput, Select } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import "./Filter.css";

export function Filter() {
  return (
    <div className="filter">
      <div className="filter__header">
        <h1>Фильтры</h1>
        <button>Сбросить все</button>
      </div>
      <Select
        label="Отрасль"
        placeholder="Выберите отрасль"
        rightSection={<IconChevronDown size="1rem" />}
        rightSectionWidth={30}
        radius="md"
        size="md"
        styles={{ rightSection: { pointerEvents: "none" } }}
        data={[""]}
      />
      <NumberInput
        placeholder="От"
        label="Оклад"
        radius="md"
        size="md"
        min={0}
      />
      <NumberInput placeholder="До" radius="md" size="md" min={0} />
      <button className="filter__button-apply">Применить</button>
    </div>
  );
}
