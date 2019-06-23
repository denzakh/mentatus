export function createNewStatus() {
  let date = new Date();
  return {
    type: "CREATE_NEW_STATUS",
    id: date.getTime()
  };
}

export function deleteStatus(id) {
  return {
    type: "DELETE_STATUS",
    id: id
  };
}

export function openStatus(id) {
  return {
    type: "OPEN_STATUS",
    id: id
  };
}

export function closeStatus(id) {
  return {
    type: "CLOSE_STATUS"
  };
}
