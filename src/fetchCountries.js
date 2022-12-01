import { Notify } from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const infoEl = document.querySelector('.country-info');

const BASE_URL = 'https://restcountries.com/v3.1/name/';
const KEY_API = 'fields=name,capital,population,languages,flags';

inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(evt) {
  evt.preventDefault();
  let countryName = evt.target.value.trim();

  fetchCountries(countryName)
    .then(data => createMarkup(data))
    .catch(error => Notify.failure('Oops, there is no country with that name'));
  return;
}

function createMarkup(arr) {
  if (arr.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  
  } else {
    const markup = arr
      .map(
        item => `<li class = "mainInfo">
    <img src="${item.flags.svg}" alt="flag">
    <h1> ${item.name.official}</h1></li>`
      )
      .join('');
    listEl.innerHTML = markup;
  }

  if (arr.length <= 1) {
    const markupFull = arr
      .map(
        item => `<li class = "mainInfo">
        <img src="${item.flags.svg}" alt="flag">
        <h1> ${item.name.official}</h1></li>
        <li class = "info">Capital: ${item.capital}</li>
        <li class = "info">Population: ${item.population}</li>
        <li class = "info">Languages: ${Object.values(item.languages).join(
          ','
        )}</li>`
      )
      .join('');
    listEl.innerHTML = markupFull;
  }
}

function fetchCountries(countryName = 'Ukraine') {
  return fetch(`${BASE_URL}${countryName}?${KEY_API}`).then(resp => {
    console.log(resp);
    if (!resp.ok) {
      throw new Errow(resp.status);
    }
    return resp.json();
  });
}
