export function setPage(name) {
  return {
    type: "SET_PAGE",
    name: name
  };
}

export function saveStoreOnServer() {
  return {
    type: "SAVE_STORE_ON_SERVER"
  };
}

export function loadStoreFromServer() {
  return {
    type: "LOAD_STORE_FROM_SERVER"
  };
}
