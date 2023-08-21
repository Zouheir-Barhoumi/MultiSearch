const browserSelect = document.getElementById("browserSelect");
const sQueries = document.getElementById("searchQueries");
const searchButton = document.getElementById("searchButton");
// const { ipcRenderer } = require("electron").ipcRenderer;

searchButton.addEventListener("click", () => {
  console.log("button clicked");
  const selectedBrowser = browserSelect.value;
  const searchQueries = sQueries.value
    .split(",")
    .filter((q) => q.trim() !== "");

  console.log("selected browser: " + selectedBrowser);
  console.log("searchQueries: " + searchQueries);
  console.log(`Is an ARRAY: ${Array.isArray(searchQueries)}`);

  ipcRenderer.send("start-search", { selectedBrowser, searchQueries });
});
