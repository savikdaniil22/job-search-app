import { NumberInput, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconChevronDown } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import "./Filter.css";

interface Catalogues {
  label: string;
  value: string;
}

export interface FormValues {
  catalogues: Catalogues;
  paymentFrom: string;
  paymentTo: string;
}

interface FilterProps {
  setFormValues: (data: FormValues) => void;
}

interface CataloguesDto {
  title_rus: string;
  url_rus: string;
  title: string;
  title_trimmed: string;
  key: number;
  positions: CataloguesDto[];
}

export function Filter({ setFormValues }: FilterProps) {
  const [items, setItems] = useState<Catalogues[]>([]);

  const form = useForm<FormValues>({
    initialValues: {
      catalogues: {
        label: "",
        value: "",
      },
      paymentFrom: "",
      paymentTo: "",
    },
  });

  function setCatalogues(result: CataloguesDto[]): void {
    let dataCatalogues: Catalogues[] = [];

    function mapCatalogues(result: CataloguesDto[]): void {
      result.forEach((data: CataloguesDto): void => {
        dataCatalogues.push({
          label: data.title_rus || data.title || `${data.key}`,
          value: `${data.key}`,
        } as Catalogues);

        if (data?.positions?.length > 0) {
          mapCatalogues(data.positions);
        }
      });
    }

    mapCatalogues(result);
    setItems(dataCatalogues);
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/catalogues`, {
      headers: {
        "x-secret-key": `${process.env.REACT_APP_SECRET_KEY}`,
        "x-Api-App-Id": `${process.env.REACT_APP_APP_ID}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => setCatalogues(result),
        (error) => {
          Error(error);
        }
      );
  }, []);

  return (
    <form
      className="filter"
      onSubmit={form.onSubmit(() => setFormValues(form.values))}
    >
      <div className="filter__header">
        <h1>Фильтры</h1>
        <button onClick={() => form.reset()}>Сбросить все</button>
      </div>
      <Select
        name="catalogues"
        label="Отрасль"
        placeholder="Выберите отрасль"
        rightSection={<IconChevronDown size="1rem" />}
        rightSectionWidth={30}
        radius="md"
        size="md"
        styles={{
          rightSection: { pointerEvents: "none" },
          item: { textOverflow: "ellipsis", overflow: "hidden" },
        }}
        data={items}
        dropdownComponent="div"
        maxDropdownHeight={380}
        {...form.getInputProps("catalogues")}
      />
      <NumberInput
        name="paymentFrom"
        placeholder="От"
        label="Оклад"
        radius="md"
        size="md"
        min={0}
        {...form.getInputProps("paymentFrom")}
      />
      <NumberInput
        name="paymentTo"
        placeholder="До"
        radius="md"
        size="md"
        min={0}
        {...form.getInputProps("paymentTo")}
      />
      <button className="filter__button-apply" type="submit">
        Применить
      </button>
    </form>
  );
}
