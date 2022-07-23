import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_key = '21647427-119fc9e63c06e8167cfe2cce4';



let page = 1;
let per_page = 5;
let query = '';


const form = document.querySelector('#search-form')
const inputValue = form.querySelector('[name="searchQuery"]');
const galleryList = document.querySelector('.gallery');






form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    query = inputValue.value.toLowerCase().trim();
    console.log(query);


    const getPhoto = async () => {
        
        const URL = `${BASE_URL}?key=${API_key}&q=${query}&mage_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`;

        const response = await axios.get(URL).then( response => response.data.hits);

        renderCollection(response);

        return response;
    };

    getPhoto();
   
};

function renderCollection(resultList) {
    const markup = resultList.flatMap(({webformatURL, tags, likes, views, comments, downloads}) => `
        <div class="photo-card">
                        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                        <div class="info">
                            <p class="info-item">
                            <b>Likes</b> ${likes}
                            </p>
                            <p class="info-item">
                            <b>Views</b> ${views}
                            </p>
                            <p class="info-item">
                            <b>Comments</b> ${comments}
                            </p>
                            <p class="info-item">
                            <b>Downloads</b> ${downloads}
                            </p>
                        </div>
                    </div>`
    ).join('');

        // console.log(markup);
    galleryList.insertAdjacentHTML('beforeend', markup);
};

