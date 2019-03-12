import * as Mapper from "./Mapper.js";

var items;
var options = { data: {} };

var currencyInput1 = document.querySelector("#currency-1");
var currencyInput2 = document.querySelector("#currency-2");
var amountInput = document.querySelector("#amount-1");
var amountOutput = document.querySelector("#amount-2");
var amountLabel = document.querySelector("#amount-label");
var buttonSwitch = document.querySelector("#button-switch");
var flag1 = document.querySelector("#flag-1");
var flag2 = document.querySelector("#flag-2");
var c1 = null;
var c2 = null;
var amount = NaN;

async function Startup() {
  items = await Mapper.GetItemsArray();

  initAutocomplete();
  addEventListeners();

  function addEventListeners() {
    buttonSwitch.addEventListener("click", () => {
      [c1, c2] = [c2, c1];
      if (c1 != null) {
        flag1.src = c1.flagURL;
        document.getElementById("input-label-1").classList.add("active");
      } else {
        flag1.src = "";
      }
      if (c2 != null) {
        flag2.src = c2.flagURL;
        document.getElementById("input-label-2").classList.add("active");
      } else {
        flag2.src = "";
      }
      [currencyInput1.value, currencyInput2.value] = [
        currencyInput2.value,
        currencyInput1.value
      ];
      if (currencyInput1.value != "" && currencyInput2.value != "") {
        amountInput.value = amountOutput.value;
      }
      update();
    });

    currencyInput1.addEventListener("change", () => {
      items.forEach(item => {
        if (item.currencyName == currencyInput1.value) {
          c1 = item;
          flag1.src = c1.flagURL;
        }
      });
      update();
    });

    currencyInput2.addEventListener("change", () => {
      items.forEach(item => {
        if (item.currencyName == currencyInput2.value) {
          c2 = item;
          flag2.src = c2.flagURL;
        }
      });
      update();
    });
    amountInput.addEventListener("change", () => {
      amount = parseFloat(amountInput.value);
      update();
    });
    amountOutput.addEventListener("change", update);
  }

  function initAutocomplete() {
    for (const thing in items) {
      if (items.hasOwnProperty(thing)) {
        const element = items[thing];
        options.data[element.currencyName] = element.flagURL;
      }
    }
    var elems = document.querySelectorAll(".autocomplete");
    var instances = M.Autocomplete.init(elems, options);
  }
}

function update() {
  if (!Number.isNaN(amount) && c1 != null && c2 != null) {
    let newVal = (parseFloat(amountInput.value) * (c2.rate / c1.rate)).toFixed(
      2
    );
    amountOutput.value = newVal;
    document.getElementById("amount-label").classList.add("active");
  } else {
    amountOutput.value = "";
    document.getElementById("amount-label").classList.remove("active");
  }
}

document.addEventListener("DOMContentLoaded", function() {
  Startup();
});
