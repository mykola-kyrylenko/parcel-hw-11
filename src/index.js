import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

const BASE_URL = 'https://pixabay.com/api/';
const API_key = '21647427-119fc9e63c06e8167cfe2cce4';

let page = 1;
let per_page = 40;
let query = '';
let totalHits;
let totalPages;

const form = document.querySelector('#search-form')
const inputValue = form.querySelector('[name="searchQuery"]');
const galleryList = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('[class="load-more"]');
loadMoreBtn.classList.add("not-visible");

function reset() {
    galleryList.innerHTML = "";
};

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault(); 
    
    query = inputValue.value.toLowerCase().trim();
   
    reset();
    getPhoto();

    console.log(query)

    onLoadMore();
};

const getPhoto = async () => {

    const URL = `${BASE_URL}?key=${API_key}&q=${query}&mage_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`;

    const response = await axios.get(URL).then(response => response.data);

    totalHits = response.total;
        
    totalPages = Math.ceil(totalHits / per_page);

    if (totalHits !==0) {
        renderCollection(response.hits);
        Notiflix.Notify.success('Hooray! We found totalHits images.');
        loadMoreBtn.classList.replace("not-visible", "visible");
    }

    if (totalHits === 0) {
        Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.");
        loadMoreBtn.classList.replace("visible", "not-visible");
    };
    
    return response;
};

function onLoadMore() {
    loadMoreBtn.addEventListener('click', () => {
        page += 1;
        if (page === totalPages) {
            loadMoreBtn.classList.replace("visible", "not-visible");
            return;
        };
        getPhoto();
    });


};



function renderCollection(resultList) {
    const lightbox = new SimpleLightbox('.gallery a', { /* options */ });
    
    const markup = resultList.flatMap(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => `
        <div class="photo-card">
                        <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
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

    galleryList.insertAdjacentHTML('beforeend', markup);
};

galleryList.addEventListener('click', onSelectBigImage);

function onSelectBigImage(event) {
    event.preventDefault();

    const instance = new SimpleLightbox('.gallery a');
};