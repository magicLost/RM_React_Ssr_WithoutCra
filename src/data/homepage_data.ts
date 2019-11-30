import auto1_300 from "./../static/sample-works/auto/300/auto1_300.jpg";
import auto3_300 from "./../static/sample-works/auto/300/auto3_300.jpg";
import auto6_300 from "./../static/sample-works/auto/300/auto6_300.jpg";
import auto4_300 from "./../static/sample-works/auto/300/auto4_300.jpg";
import plotter2_300 from "./../static/sample-works/plotter/300/plotter2_300.jpg";
import plotter3_300 from "./../static/sample-works/plotter/300/plotter3_300.jpg";
import shirokoform1_300 from "./../static/sample-works/shirokoform/300/shirokoform1_300.jpg";
import shirokoform6_300 from "./../static/sample-works/shirokoform/300/shirokoform6_300.jpg";
import shirokoform3_300 from "./../static/sample-works/shirokoform/300/shirokoform3_300.jpg";

import { CFItem, ParentElement, MainPresentationCarouselItem } from "./types";

export const photos: string[] = [
  auto1_300,
  auto3_300,
  auto6_300,
  auto4_300,
  plotter2_300,
  shirokoform6_300,
  plotter3_300,
  shirokoform3_300,
  shirokoform1_300
];

export const toolbarItemsArray: CFItem[] = [
  { title: "Портфолио" },
  { title: "Главное" },
  { title: "Контакты" }
];

export const mainPresentationCarouselItems: MainPresentationCarouselItem[] = [
  {
    title: "Широкоформатная печать",
    desc:
      "Наша компания может предложить вам обширный спектр услуг в области широкоформатной печати. Современное оборудование, которое мы используем, позволяет гарантировать вам непревзойденное качество и высокую скорость печати. Сейчас широкоформатная печать это наиболее актуальная и бюджетная технология, благодаря которой можно получить полноцветное изображения любого формата, как для наружного, так и для внутреннего размещения.",
    href: "/large-print"
  },
  {
    title: "Баннеры",
    desc:
      "Мы выполняем печать и монтаж баннеров различных размеров. Прекрасное качество используемых материалов обеспечивает хорошую износостойкость нашей продукции при любых погодных условиях. Заказывая у нас плакаты, постеры, наклейки, рекламные растяжки, печать баннеров, интерьерные наклейки, печать на холсте и интерьерную печать Вы можете быть уверены — они будут долго радовать глаз глубокими неизменными цветами.",
    href: "#"
  },
  {
    title: "Оклейка авто",
    desc:
      "У многих есть огромное желание сделать свой автомобиль красивее, оригинальнее, интереснее, защитить машину от царапин, а также прорекламировать какие либо услуги на своём автомобиле для продвижения Вашего бизнеса. В связи с этим наша компания предлагает Вам оклейку автомобиля плёнкой, наклейки на автомобили.",
    href: "#"
  },
  {
    title: "Стритлайны",
    desc:
      "Стритлайны и Штендер - выносные складные конструкции наружной рекламы с одной или двумя рекламными поверхностями, являющиеся универсальным средством для обеспечения потока посетителей! Установленные на пути пешеходов, эти рекламоносители неизбежно привлекают к себе внимание.",
    href: "#"
  },
  {
    title: "Плоттерная резка",
    desc:
      "Один из самых новых и качественных способов нанесения рекламного изображения на витрины, стенды и вывески– плоттерная резка. Благодаря специальному приспособлению, она позволяет переносить рисунки на плёнку с высочайшей точностью. Сейчас результат плоттерной резки можно наблюдать на витринах магазинов, отделах торговых центров, офисов, на информационных стендах, оформления стен и окон, световых коробах, стритлайнах и плоттерная резка на автотранспорте.",
    href: "#"
  },
  {
    title: "Ролл-Ап Стенды",
    desc:
      "Ролл ап (от англ. Roll up - «сворачивать, скручивать») - это легкие, компактные, удобные в транспортировке мобильные стенды.",
    href: "#"
  },
  {
    title: "Ростовые фигуры",
    desc:
      "Если Вам нужно изготовление тантамаресок и ростовых фигур - вы обратились по адресу, наша компания Реклама-Маркет легко решит этот вопрос.",
    href: "#"
  },
  {
    title: "Информационный стенд",
    desc:
      "Наша компания принимает заказы на изготовление информационных стендов различных модификаций, форм и размеров. В производстве рекламоносителей нами используются самые современные технологии и материалы – от пластиковых до композитных. Предлагаемые нами модели функциональны, долговечны и эстетичны.",
    href: "#"
  },
  {
    title: "Таблички",
    desc:
      "На табличках мы видим не только название компании, ее отделы, имена руководителей, сотрудников или время работы, но и имиджевую информацию - например, логотип и цвета фирмы. С помощью таблички Вы демонстрируете свое уважение к клиентам, спасая их от напрасной беготни в поисках нужного кабинета. ",
    href: "#"
  }
];

export const mainPresentationItemsControls: CFItem[] = [
  { title: "Широкоформатная печать", href: "#print", viewBox: "0 0 1024 1024" },
  { title: "Баннеры", href: "#banner", viewBox: "0 0 1024 1024" },
  { title: "Оклейка авто", href: "#auto", viewBox: "0 0 1024 1024" },
  { title: "Стритлайны", href: "#streetLine", viewBox: "0 0 1024 1024" },
  { title: "Плоттерная резка", href: "#plotter", viewBox: "0 0 1024 1024" },
  { title: "Ролл-Ап Стенды", href: "#rollUp", viewBox: "0 0 1024 1024" },
  { title: "Ростовые фигуры", href: "#human", viewBox: "0 0 1024 1024" },
  {
    title: "Информационный стенд",
    href: "#infoStand",
    viewBox: "0 0 1024 1024"
  },
  { title: "Таблички", href: "#cards", viewBox: "0 0 1024 1024" }
];

export const mainText: ParentElement[] = [
  {
    type: "H",
    options: { hType: "h3", text: "ПРОИЗВОДСТВО НАРУЖНОЙ РЕКЛАМЫ" }
  },
  {
    type: "PARAGRAPH",
    children: [
      {
        type: "TEXT",
        options: {
          text:
            "Компания Реклама-Маркет предлагает полный спектр услуг в области производства наружной рекламы, широкоформатной печати и плоттерной резки:"
        }
      }
    ]
  },

  {
    type: "LIST",
    children: [
      {
        type: "ANCHOR",
        options: { href: "#", label: "Оформление вашего магазина" }
      },
      {
        type: "ANCHOR",
        options: { href: "#", label: "Оклейка автомобилей рекламой" }
      },
      {
        type: "TEXT",
        options: {
          text: "Изготовление продукции для выставок и различных мероприятий"
        }
      },
      { type: "TEXT", options: { text: "Печать интерьерных наклеек" } },
      { type: "TEXT", options: { text: "Печать на холсте" } },
      {
        type: "ANCHOR",
        options: { href: "#", label: "POS материалы и изделия из оргстекла" }
      }
    ]
  },

  {
    type: "H",
    options: { hType: "h3", text: "ОСНОВНЫЕ НАПРАВЛЕНИЯ НАШЕЙ РАБОТЫ" }
  },
  {
    type: "PARAGRAPH",
    children: [
      {
        type: "TEXT",
        options: { text: "Основной составляющей нашей продукции является " }
      },
      {
        type: "ANCHOR",
        options: { href: "#", label: "широкоформатная печать" }
      },
      { type: "TEXT", options: { text: " и " } },
      { type: "ANCHOR", options: { href: "#", label: "плоттерная резка" } },
      {
        type: "TEXT",
        options: {
          text:
            ". Поэтому к вашим услугам готовы предложить изготовление наклеек, временных вывесок, наклеек на автомобиль, интерьерные наклейки, постеры, листовки, печать на холсте, наклейки на окна, таблички и многое многое другое."
        }
      }
    ]
  }
];

export const clients = [
  { href: "", xlinkHref: "#ldpr" },
  { href: "", xlinkHref: "#ya-taxi" }
];