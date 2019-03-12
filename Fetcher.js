export default async function GetFromAPI(url) {
  let fetchResult = await fetch(url);
  let response = await fetchResult;
  let json = await response.json();
  return json;
}
