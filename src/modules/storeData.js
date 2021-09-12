//spara en lista.
function saveList(savedList, currentList) {
  localStorage.setItem(savedList, JSON.stringify(currentList));
}

//hämta en lista
function getList(savedList) {
  return JSON.parse(localStorage.getItem(savedList));
}

export { saveList, getList };
