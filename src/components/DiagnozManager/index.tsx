import React from "react";
import { setText } from "../../actions/textAction";
import { fieldOf, useAppDispatch, useAppSelector } from "../../lib/redux";
import type { StatusState } from "../../types/status";
import "./Diagnoz.css";

// текст поля диагноза (пустая строка, если он не задан)
function textValueOf(state: StatusState, name: string): string {
  const field = fieldOf(state, name);
  return (field && field.text) || "";
}

export default function DiagnozManager() {
  const dispatch = useAppDispatch();

  const mkb10 = useAppSelector(state => textValueOf(state, "diagnozMkb10"));
  const klin = useAppSelector(state => textValueOf(state, "diagnozKlin"));
  const dopolnenie = useAppSelector(state =>
    textValueOf(state, "diagnozDopolnenie")
  );
  const reqilech = useAppSelector(state => textValueOf(state, "reqilech"));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(setText(e.target.name, e.target.value));
  };

  return (
    <div className="diagnoz">
      <div className="diagnoz__row diagnoz__row--mkb">
        <span className="diagnoz__title">Диагноз</span>&nbsp;
        <span className="diagnoz__mkb-label">МКБ-10:</span>
        F&nbsp;
        <input
          className="diagnoz__mkb-input"
          name="diagnozMkb10"
          onChange={handleChange}
          value={mkb10}
        />
      </div>
      <div className="diagnoz__row">
        Основной:
        <br />
        <textarea
          className="diagnoz__textarea"
          name="diagnozKlin"
          onChange={handleChange}
          value={klin}
        />
      </div>
      <div className="diagnoz__row">
        Дополнительный:
        <br />
        <textarea
          className="diagnoz__textarea"
          name="diagnozDopolnenie"
          onChange={handleChange}
          value={dopolnenie}
        />
      </div>
      <br />

      <div className="diagnoz__row">
        <span className="diagnoz__title">Рекомендации и лечение:</span>
        <br />
        <textarea
          className="diagnoz__textarea diagnoz__textarea--req"
          name="reqilech"
          onChange={handleChange}
          value={reqilech}
        />
      </div>
    </div>
  );
}
