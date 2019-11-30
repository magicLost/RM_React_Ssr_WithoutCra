import { TableValues, TableCell } from "../component/Table/Table";

export const showcaseConditions = [
  { label: "Срок изготовления - 2 дня.", hrefId: "#timer" },
  { label: "Цена от 500р.", hrefId: "#euro" },
  { label: "Дизайн-макет за 2 часа", hrefId: "#brush" }
];

export const tableMain: TableValues<string | TableCell> = {
  caption: "Прайс-лист на наши услуги",
  th: [
    //["Материал", "720 dpi", "1440 dpi"]
    [
      { value: "Материал", rowspan: 2, colspan: undefined, align: "CENTER" },
      {
        value: "Качество печатной продукции",
        rowspan: undefined,
        colspan: 2,
        align: "CENTER"
      }
    ],
    [
      {
        value: "720 dpi",
        rowspan: undefined,
        colspan: undefined,
        align: "RIGHT"
      },
      "1440 dpi"
    ]
  ],
  td: [
    [
      "Самоклеящаяся пленка (матовая, глянцевая, прозрачная, белая)",
      "от 250,0",
      "420"
    ],
    [
      "Самоклеющаяся пленка для световых коробов (транслюцентная)",
      "600,0",
      "880,0"
    ],
    ["Баннер (баннерная ткань) 440 гр с люверсами", "от 250,0", "420,0"],
    ["Перфорированная пленка", "от 350,0", "980,0"],
    ["BackLit (бэклит)", "от 500,0", "1200,0"],
    ["Печать на холсте", "-", "1800,0"],
    ["Баннер 510 гр/см3", "380,0", "500,0"],
    ["Баннерная сетка", "380,0", "550,0"],
    ["Печать на транслюцентной пленке", "от 500", "600,0"],
    ["Бумага постерная 150-170 гр, для плакатов и афиш", "от 170,0", "650,0"]
  ]
};

export const tableSecond = {
  caption: "Постпечатная обработка за м2:",
  th: [],
  td: [
    ["Резка по контуру наклеек", "200,0", ""],
    ["Ламинация", "380,0", "550,0"],
    ["Резка наклеек вручную", "100,0", ""]
  ]
};
