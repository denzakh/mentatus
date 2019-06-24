export function setRadio(fieldName, number) {
  return {
    type: "SET_RADIO",
    name: fieldName,
    number: number
  };
}

export function setSymptom(symptomName) {
  return {
    type: "SET_SYMPTOM",
    name: symptomName
  };
}

export function setText(fieldName, text) {
  return {
    type: "SET_TEXT",
    name: fieldName,
    text: text
  };
}
