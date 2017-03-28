import Playground from "./Playground";

$(document).ready(function () {
    let options = {
      background: {
          color: "#393F4C"
      }
    };
    let playground = new Playground($("#playground"), options);
});