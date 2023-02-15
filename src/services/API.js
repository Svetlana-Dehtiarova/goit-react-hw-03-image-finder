import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '32913693-f7fa92b83cfd126c47697d95e';

const fetchImages = ({ searchQuery = '', currentPage = 1, pageSize = 12 }) => {
  const params = {
    key: KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: currentPage,
    per_page: pageSize,
  };

  return axios({ params }).then(response => response.data);
};
export default fetchImages;
