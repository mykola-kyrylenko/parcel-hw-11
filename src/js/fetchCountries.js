import Notiflix from 'notiflix';

export default function fetchCountries(name) {
    return fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`)
        .then(res => res.json())
        .then(data => {
            if (data.status === 404 || data === ' ') {
                Notiflix.Notify.failure('Write real name of countries!');
            }
            return data;
        })
        .catch(error => { error });
};



