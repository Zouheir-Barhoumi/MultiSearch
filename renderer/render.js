const browserSelect = document.getElementById("browserSelect");
const sE = document.getElementById("engineSelect");
const sQueries = document.getElementById("searchQueries");
const searchButton = document.getElementById("searchButton");
// const { ipcRenderer } = require("electron").ipcRenderer;

searchButton.addEventListener("click", () => {
  const selectedBrowser = browserSelect.value;
  const selectedEngine = sE.value;
  const searchQueries = sQueries.value
    .split(/[,;\r\n]+/)
    .map((q) => q.replace(/^"(.*)"$/, "$1"))
    .filter((q) => q.trim() !== "");

  ipcRenderer.send("start-search", {
    selectedBrowser,
    selectedEngine,
    searchQueries,
  });
});
