import GetFromAPI from "./Fetcher.js";
import Item from "./Item.js";

export async function GetItemsArray() {
  let currencyNames = await GetFromAPI(
    "https://openexchangerates.org/api/currencies.json"
  );
  let ratesresult = await GetFromAPI(
    "https://openexchangerates.org/api/latest.json?app_id=5a80ba3d146b4458b6829d0c3c8a9ffd"
  );

  //   console.log(ratesresult);
  //   console.log(ratesresult.results);

  //   let rates = ratesresult;

  let itemArray = [];

  for (const currencyCode in ratesresult.rates) {
    if (ratesresult.rates.hasOwnProperty(currencyCode)) {
      const rate = ratesresult.rates[currencyCode];
      //   console.log(rate);

      let currencyName = currencyNames[currencyCode];
      let url = `https://www.countryflags.io/${currencyCode.substring(
        0,
        2
      )}/flat/48.png`;
      itemArray.push(new Item(currencyCode, currencyName, rate, url));
    }
  }

  return itemArray;
}
