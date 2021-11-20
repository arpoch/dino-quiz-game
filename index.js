function initIndex() {
  const board = document.getElementById("gametitle");
  let title = document.createElement("p");
  title.classList.add("stripe-text");
  board.appendChild(title);
}

let store = window.sessionStorage;

function setsessionStore() {
  let playerName = document.getElementById("name").value;
  store.setItem("player", playerName);
}
