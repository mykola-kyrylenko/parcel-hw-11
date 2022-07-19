import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import './css/styles.css';
import fetchCountries from './js/fetchCountries.js';

const DEBOUNCE_DELAY = 500;

const countriesList = document.querySelector('.country-list');
const infoAboutCountry = document.querySelector('.country-info');
const inputValue = document.querySelector('#search-box');


function reset(){
    inputValue.value = '';
    countriesList.innerHTML = "";
    infoAboutCountry.innerHTML = "";
};

inputValue.addEventListener('input', debounce(() => {
    const value = inputValue.value.toLowerCase().trim();

    if (value === '' || value === Number) {
        return;
    }

    fetchCountries(value)
        .then(data => {
            console.log(data);

            if (data.length > 10) {
                Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
                return;
            };

            if (data.length > 1 || data.length < 11) {
                showCountrysList(data)
            };

            if (data.length === 1) {
                showCountry(data)
            };
        });
}, DEBOUNCE_DELAY));
 

function showCountrysList(countryList) {
    reset();

    const markup = countryList.flatMap(
        ({ name, flags }) => `
    <li><img src="${flags.svg}"></a><p>${name}</p></li>`
    ).join('');

    countriesList.insertAdjacentHTML('beforeend', markup);
}

function showCountry(countryInfo) {
    reset();

    const markup = countryInfo.flatMap(
        ({ name, capital, population, flags, languages }) => `
        <div><img src="${flags.svg}" alt="${name}"><h2>${name}</h2></div>
        <p><strong>Capital: </strong>${capital}</p>
        <p><strong>Population: </strong>${population}</p>
        <p><strong>Languages: </strong>${languages.flatMap(option => option.name)}</p>`
    ).join('');

    infoAboutCountry.insertAdjacentHTML('beforeend', markup);
}
