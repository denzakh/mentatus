export function polePlus(payload) {
  return {
    type: "CASE_PLUS",
    payload: payload
  };
}

export function poleMinus(payload) {
  return {
    type: "CASE_MINUS",
    payload: payload
  };
}
