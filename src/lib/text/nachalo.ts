/* Текст «Начало осмотра» для заключения.

Склейка перенесена дословно из `NachaloList`: двойной пробел в тексте
ст. 23 ч.4 п, «его/ее», «Освидетельствован/а» и завершающие точки —
часть текущего вывода, менять их нельзя.

Дата осмотра приходит в `NachaloInput`, но в строку `osmotr` не входит:
компонент выводит её отдельно перед `osmotr`.
*/

import type { RadioOption } from "../../types/schema";

// для пункта «в» (ухудшение состояния) местоимение «его/ее» не выводится
const PUNKT_WITHOUT_PRONOUN = 2;

export interface NachaloInput {
  date: string; // уже дд.мм.гггг
  isMale: boolean;
  mestoOsmotra?: RadioOption;
  poNapravleniu: boolean;
  sIstorieiOznakomlen: boolean;
  nedobrovolno: boolean;
  nedobrovolnoPrichina?: RadioOption;
  nedobrovolnoPunkt?: RadioOption;
  nedobrovolnoText?: string | false;
}

export interface NachaloText {
  osmotr: string;
  sIstorieiOznakomlenText: string;
  soglasie: string;
  zakon: string;
  nedobrovolnoText: string;
}

export function buildNachaloText(input: NachaloInput): NachaloText {
  const {
    isMale,
    mestoOsmotra,
    poNapravleniu,
    sIstorieiOznakomlen,
    nedobrovolno,
    nedobrovolnoPrichina,
    nedobrovolnoPunkt,
    nedobrovolnoText
  } = input;

  const osmotr =
    (isMale ? "Осмотрен " : "Осмотрена ") +
    (mestoOsmotra ? mestoOsmotra.phrase : "") +
    (poNapravleniu ? " по направлению врача соматического профиля" : "") +
    ".";

  const sIstorieiOznakomlenText = sIstorieiOznakomlen
    ? " С историей болезни врач ознакомлен. "
    : "";

  const soglasie = nedobrovolno
    ? nedobrovolnoPrichina
      ? nedobrovolnoPrichina.phrase
      : ""
    : "На беседу с врачом-психиатром " +
      (isMale ? "согласен" : "согласна") +
      ". ";

  let zakon = "";

  if (nedobrovolno) {
    // «его/ее» перед фразой пункта, кроме пункта «в»
    const isPunktWithoutPronoun =
      !!nedobrovolnoPunkt && nedobrovolnoPunkt.id === PUNKT_WITHOUT_PRONOUN;
    const pronoun = isPunktWithoutPronoun ? "" : isMale ? "его " : "ее ";

    zakon =
      (isMale ? "Освидетельствован" : "Освидетельствована") +
      " недобровольно на основании  ст. 23 ч.4 п «" +
      (nedobrovolnoPunkt ? nedobrovolnoPunkt.punkt : "") +
      "» закона РФ «О психиатрической помощи и гарантиях прав граждан при ее оказании», т.к. совершает действия, дающие основания предполагать наличие у " +
      (isMale ? "него " : "нее ") +
      "тяжелого психического расстройства, которое обусловливает " +
      pronoun +
      (nedobrovolnoPunkt ? nedobrovolnoPunkt.phrase : "") +
      ".";
  }

  return {
    osmotr,
    sIstorieiOznakomlenText,
    soglasie,
    zakon,
    nedobrovolnoText:
      typeof nedobrovolnoText === "string" ? nedobrovolnoText : ""
  };
}
