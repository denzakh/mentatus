import dataBase from "../../store/sostoyanieData";
import { optionById } from "../schema";
import { buildNachaloText } from "./nachalo";
import type { NachaloInput, NachaloText } from "./nachalo";

/* Пункты радиогрупп берём из настоящей схемы: тест держит реальные фразы. */
const mestoOsmotra = (id: number) => optionById(dataBase.mestoOsmotra, id);
const prichina = (id: number) => optionById(dataBase.nedobrovolnoPrichiny, id);
const punkt = (id: number) => optionById(dataBase.nedobrovolnoPunkt, id);

function build(overrides: Partial<NachaloInput> = {}): NachaloText {
  return buildNachaloText({
    date: "05.05.2020",
    isMale: false,
    mestoOsmotra: mestoOsmotra(1),
    poNapravleniu: false,
    sIstorieiOznakomlen: false,
    nedobrovolno: false,
    nedobrovolnoPrichina: prichina(1),
    nedobrovolnoPunkt: punkt(1),
    nedobrovolnoText: "",
    ...overrides
  });
}

describe("buildNachaloText", () => {
  it("пишет «Осмотрена» для женщины и «Осмотрен» для мужчины", () => {
    expect(build().osmotr).toBe("Осмотрена в ПНД.");
    expect(build({ isMale: true }).osmotr).toBe("Осмотрен в ПНД.");
  });

  it("подставляет место осмотра из схемы", () => {
    expect(build({ mestoOsmotra: mestoOsmotra(0) }).osmotr).toBe(
      "Осмотрена на дому."
    );
    expect(build({ mestoOsmotra: mestoOsmotra(2) }).osmotr).toBe(
      "Осмотрена на отделении."
    );
  });

  it("добавляет направление врача соматического профиля", () => {
    expect(
      build({ mestoOsmotra: mestoOsmotra(1), poNapravleniu: true }).osmotr
    ).toBe("Осмотрена в ПНД по направлению врача соматического профиля.");
  });

  it("не падает на пустом месте осмотра", () => {
    expect(
      build({ mestoOsmotra: undefined, poNapravleniu: false }).osmotr
    ).toBe("Осмотрена .");
  });

  it("не включает дату в osmotr — её выводит компонент", () => {
    expect(build().osmotr).not.toContain("05.05.2020");
  });

  it("выводит ознакомление с историей болезни только при флаге", () => {
    expect(build().sIstorieiOznakomlenText).toBe("");
    expect(build({ sIstorieiOznakomlen: true }).sIstorieiOznakomlenText).toBe(
      " С историей болезни врач ознакомлен. "
    );
  });

  it("пишет согласие на беседу, если осмотр добровольный", () => {
    expect(build().soglasie).toBe(
      "На беседу с врачом-психиатром согласна. "
    );
    expect(build({ isMale: true }).soglasie).toBe(
      "На беседу с врачом-психиатром согласен. "
    );
    expect(build().zakon).toBe("");
  });

  it("берёт каждую причину недобровольного осмотра из схемы", () => {
    [0, 1, 2, 3, 4].forEach(id => {
      const text = build({
        nedobrovolno: true,
        nedobrovolnoPrichina: prichina(id)
      });

      expect(text.soglasie, `причина ${id}`).toBe(prichina(id)?.phrase);
    });
  });

  it("оставляет пустую причину пустой строкой", () => {
    const text = build({ nedobrovolno: true, nedobrovolnoPrichina: undefined });

    expect(text.soglasie).toBe("");
  });

  it("подставляет букву и фразу пункта закона", () => {
    const text = build({
      isMale: true,
      nedobrovolno: true,
      nedobrovolnoPunkt: punkt(1)
    });

    expect(text.zakon).toContain("п «б»");
    expect(text.zakon).toContain(
      "обусловливает его беспомощность, то есть неспособность самостоятельно удовлетворять основные жизненные потребности"
    );
  });

  it("для пункта «в» не выводит местоимение «его/ее»", () => {
    const female = build({ nedobrovolno: true, nedobrovolnoPunkt: punkt(2) });
    const male = build({
      isMale: true,
      nedobrovolno: true,
      nedobrovolnoPunkt: punkt(2)
    });

    expect(female.zakon).toContain("которое обусловливает существенный вред");
    expect(female.zakon).not.toContain("обусловливает ее ");
    expect(male.zakon).not.toContain("обусловливает его ");
  });

  it("для пунктов «а» и «б» выводит местоимение по полу", () => {
    [0, 1].forEach(id => {
      expect(
        build({ nedobrovolno: true, nedobrovolnoPunkt: punkt(id) }).zakon,
        `пункт ${id}, женщина`
      ).toContain("обусловливает ее ");

      expect(
        build({
          isMale: true,
          nedobrovolno: true,
          nedobrovolnoPunkt: punkt(id)
        }).zakon,
        `пункт ${id}, мужчина`
      ).toContain("обусловливает его ");
    });
  });

  it("не падает на пустом пункте закона", () => {
    const text = build({ nedobrovolno: true, nedobrovolnoPunkt: undefined });

    expect(text.zakon).toContain("п «»");
    expect(text.zakon).toContain("обусловливает ее .");
  });

  it("дословно совпадает с прежним выводом (двойной пробел ст. 23 ч.4)", () => {
    const text = build({
      isMale: true,
      mestoOsmotra: mestoOsmotra(1),
      nedobrovolno: true,
      nedobrovolnoPrichina: prichina(0),
      nedobrovolnoPunkt: punkt(0)
    });

    expect(text.osmotr).toBe("Осмотрен в ПНД.");
    expect(text.soglasie).toBe("От беседы с психиатром отказывается. ");
    expect(text.zakon).toBe(
      "Освидетельствован недобровольно на основании  ст. 23 ч.4 п «а» закона РФ «О психиатрической помощи и гарантиях прав граждан при ее оказании», т.к. совершает действия, дающие основания предполагать наличие у него тяжелого психического расстройства, которое обусловливает его непосредственную опасность для себя или окружающих."
    );
  });

  it("передаёт свободный текст и нормализует пустое значение", () => {
    expect(build({ nedobrovolnoText: "Со слов соседей." }).nedobrovolnoText).toBe(
      "Со слов соседей."
    );
    expect(build({ nedobrovolnoText: "" }).nedobrovolnoText).toBe("");
    expect(build({ nedobrovolnoText: false }).nedobrovolnoText).toBe("");
    expect(build({ nedobrovolnoText: undefined }).nedobrovolnoText).toBe("");
  });
});
