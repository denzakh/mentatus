import { shallowEqual } from "react-redux";
import dataBase from "../../store/sostoyanieData";
import { todayIso, formatDate } from "../../lib/text/date";
import { buildNachaloText } from "../../lib/text/nachalo";
import { fieldOf, textOf, useAppSelector } from "../../lib/redux";
import { optionById } from "../../lib/schema";
import type { StatusState } from "../../types/status";

// текст «Начала осмотра» по текущему состоянию стора
function nachaloOf(state: StatusState) {
  const dataOsmotra = fieldOf(state, "dataOsmotra");
  const pol = fieldOf(state, "pol");
  const mestoOsmotra = fieldOf(state, "mestoOsmotra");
  const poNapravleniu = fieldOf(state, "poNapravleniu");
  const sIstorieiOznakomlen = fieldOf(state, "sIstorieiOznakomlen");
  const nedobrovolno = fieldOf(state, "nedobrovolno");
  const nedobrovolnoPrichiny = fieldOf(state, "nedobrovolnoPrichiny");
  const nedobrovolnoPunkt = fieldOf(state, "nedobrovolnoPunkt");
  const nedobrovolnoText = fieldOf(state, "nedobrovolnoText");

  // дата осмотра: из стора, а если её нет — сегодняшняя
  const date =
    formatDate(dataOsmotra && dataOsmotra.text) || formatDate(todayIso());

  // пункты радиогрупп ищем по id, а не по позиции в массиве схемы
  const text = buildNachaloText({
    date,
    isMale: !!(pol && pol.isChecked),
    mestoOsmotra: optionById(
      dataBase.mestoOsmotra,
      mestoOsmotra && mestoOsmotra.number
    ),
    // текст поля берём строкой: `text` у поля может быть `false`
    mestoText: textOf(state, "mestoText"),
    poNapravleniu: !!(poNapravleniu && poNapravleniu.isChecked),
    sIstorieiOznakomlen: !!(
      sIstorieiOznakomlen && sIstorieiOznakomlen.isChecked
    ),
    nedobrovolno: !!(nedobrovolno && nedobrovolno.isChecked),
    nedobrovolnoPrichina: optionById(
      dataBase.nedobrovolnoPrichiny,
      nedobrovolnoPrichiny && nedobrovolnoPrichiny.number
    ),
    nedobrovolnoPunkt: optionById(
      dataBase.nedobrovolnoPunkt,
      nedobrovolnoPunkt && nedobrovolnoPunkt.number
    ),
    nedobrovolnoText: nedobrovolnoText && nedobrovolnoText.text
  });

  // дата выводится перед текстом осмотра, поэтому она тоже в наборе
  return { ...text, date };
}

export default function NachaloList() {
  // «Начало осмотра» — объект из пяти строк: сравниваем поверхностно
  const nachalo = useAppSelector(nachaloOf, shallowEqual);

  return (
    <span>
      <span>
        {nachalo.date}. {nachalo.osmotr} {nachalo.sIstorieiOznakomlenText}
      </span>
      <span>
        {nachalo.soglasie} {nachalo.nedobrovolnoText} {nachalo.zakon}
      </span>
    </span>
  );
}
