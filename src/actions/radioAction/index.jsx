export function setRadio(fieldName, number) {
  return {
    type: "SET_RADIO",
    name: fieldName,
    number: number
  };
}
