// import './css/styles.css';
// import { Notify } from 'notiflix';
// import debounce from 'lodash.debounce';

// const DEBOUNCE_DELAY = 300;
// const inputEl = document.querySelector('#search-box');
// const listEl = document.querySelector('.country-list');
// const infoEl = document.querySelector('.country-info');

// const BASE_URL = 'https://restcountries.com/v3.1/name/';
// const KEY_API = 'fields=name,capital,population,languages,flags';

// inputEl.addEventListener('input', onSearch);

// function onSearch(evt) {
//   evt.preventDefault();
//   console.dir(evt.currentTarget);
//   let countryName = evt.currentTarget.value;

//   if (!countryName) {
//     alert('Empty');
//     return;
//   }
//   fetchCountries(countryName).then(data => console.log(data));
// }

// function createMarkup(arr){
//     const markup = arr.map(item => `<li>
//     <img src="${flags.svg}" alt="flag">
//     <h1> ${countryName}</h1>
//     <li>Capital ${capital}</li>
//     <li>Population ${populaton}</li>
//     <li>Languages ${languages}</li>
//     </li>`).join('');
// listEl.innerHTML = markup;
// }



// function fetchCountries(countryName = 'Ukraine') {
//   return fetch(`${BASE_URL}${countryName}?${KEY_API}`).then(resp => {
//     //   console.log(resp);
//     if (!resp.ok) {
//       throw new Errow(resp.status);
//     }
//     return resp.json();
//   });
// }
