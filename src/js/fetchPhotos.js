import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '21647427-119fc9e63c06e8167cfe2cce4';


export const fetchParameters = {
    q: '',
    page: 1,
    per_page: 40,
};

const URL = `${BASE_URL}?key=${API_KEY}&q=${fetchParameters.query}&mage_type=photo&orientation=horizontal&safesearch=true&page=${fetchParameters.page}&per_page=${fetchParameters.per_page}`;


const getImage = async () => {
    const response = await axios.get(URL);
    console.log(response)
    return response;
}


export {
    fetchParameters,
    getImage
}