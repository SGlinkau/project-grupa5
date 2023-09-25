import './main.scss';
import axios from 'axios';
import { getPopular } from './api.js';
// import { getByTitle } from './api.js';

axios.defaults.headers.common['x-api-key'] = 'c90cdec037818042646f6ab3cec9ea66';

const input = document.querySelector('#input');

window.addEventListener('load', getPopular);
input.addEventListener('submit', e => {
  e.preventDefault();
  getByTitle(input.value);
});
