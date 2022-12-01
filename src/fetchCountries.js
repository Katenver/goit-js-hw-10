// import { Notify } from 'notiflix';
// import debounce from 'lodash.debounce';

// const DEBOUNCE_DELAY = 300;
// const inputEl = document.querySelector('#search-box');
// const listEl = document.querySelector('.country-list');
// const infoEl = document.querySelector('.country-info');

// const BASE_URL = 'https://restcountries.com/v3.1/name/';
// const KEY_API = 'fields=name,capital,population,languages,flags';

// inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

// // function clearMarkups() {
// //     listEl  = '';
// //     infoEl = '';

// //   }
// function onSearch(evt) {
//   evt.preventDefault();
//   let countryName = evt.target.value.trim();

//   //   if (!countryName) {
//   //     clearMarkups();
//   //     return;
//   //   }
// }
// fetchCountries(countryName)
//   .then(data => createMarkup(data))
//   .catch(error => {
//     // clearMarkups();
//     Notify.failure('Oops, there is no country with that name');
//   });

// function createMarkup(arr) {
//   if (arr.length > 10) {
//     Notify.info('Too many matches found. Please enter a more specific name.');
//   } else {
//     const markup = arr
//       .map(
//         item => `<li class = "mainInfo">
//     <img src="${item.flags.svg}" alt="flag">
//     <h1> ${item.name.official}</h1></li>`
//       )
//       .join('');
//     listEl.innerHTML = markup;
//   }

//   if (arr.length <= 1) {
//     const markupFull = arr
//       .map(
//         item => `<li class = "mainInfo">
//         <img src="${item.flags.svg}" alt="flag">
//         <h1> ${item.name.official}</h1></li>
//         <li class = "info">Capital: ${item.capital}</li>
//         <li class = "info">Population: ${item.population}</li>
//         <li class = "info">Languages: ${Object.values(item.languages).join(
//           ','
//         )}</li>`
//       )
//       .join('');
//     listEl.innerHTML = markupFull;
//   }
// }

// function fetchCountries(countryName = 'Ukraine') {
//   return fetch(`${BASE_URL}${countryName}?${KEY_API}`).then(resp => {
//     console.log(resp);
//     if (!resp.ok) {
//       throw new Errow(resp.status);
//     }
//     return resp.json();
//   });
// }
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const countryInputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

const BASE_URL = 'https://restcountries.com/v3.1/name/';
const KEY_API = 'fields=name,capital,population,languages,flags';

function fetchCountries(countryName) {
  return fetch(`${BASE_URL}${countryName}?${KEY_API}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.status);
    }
    return resp.json();
  });
}

function renderCountries(countries) {
  if (countries.length === 1) {
    countryListEl.innerHTML = '';

    const infoMarkup = countries
      .map(country => {
        return `<p class="country"><img class="flag" src="${
          country.flags.svg
        }" alt="${country.name.official} flag"><b>${
          country.name.official
        }</b></p>
        <p class="capital"><b>Capital:</b> ${country.capital}</p>
        <p class="population"><b>Population:</b> ${country.population}</p>
        <p class="language"><b>Languages:</b> ${Object.values(
          country.languages
        ).join(', ')}</p>`;
      })
      .join('');

    countryInfoEl.innerHTML = infoMarkup;
  }

  if (countries.length > 1) {
    countryInfoEl.innerHTML = '';

    const listMarkup = countries
      .map(country => {
        return `<li class="country-item"><img class="flag" src="${country.flags.svg}"></img><p class="name"><b>${country.name.official}</b></p></li>`;
      })
      .join('');

    countryListEl.innerHTML = listMarkup;
  }
}

countryInputEl.addEventListener(
  'input',
  debounce(inputHandler, DEBOUNCE_DELAY)
);

function clearMarkups() {
  countryListEl.innerHTML = '';
  countryInfoEl.innerHTML = '';
}

function inputHandler(e) {
  let countryName = e.target.value.trim();

  if (!countryName) {
    clearMarkups();
    return;
  }

  fetchCountries(countryName)
    .then(countries => {
      if (countries.length > 10) {
        clearMarkups();
        Notify.info(
          '❔ Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      renderCountries(countries);
    })
    .catch(err => {
      clearMarkups();
      Notify.failure('❌ Oops, there is no country with that name');
    });
}