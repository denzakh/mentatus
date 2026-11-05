import React from "react";
import dataBase from "../../store/sostoyanieData";
import RadioList from "../RadioList";
import Textarea from "../Textarea";

export default function KritikaManager() {
  return (
    <div>
      <div className="list__title list__title--no-top-margin">Критика:</div>
      <RadioList name="kritika" dataBase={dataBase} />

      <Textarea name="kritikaText" label="Описание критики" />
    </div>
  );
}
