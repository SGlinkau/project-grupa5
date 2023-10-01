import './main.scss';
import { getPopular, searchError, pageButtons } from './api.js';
import { getByTitle } from './api.js';
import { getDetails } from './api.js';
import { moviesList } from './api.js';
import { getGenres } from './api.js';
import { getTrailer } from './api.js';
// import { loadProducts } from './pagin.js';

const form = document.querySelector('.header__form');
const input = document.querySelector('#input');

window.addEventListener('load', () => {
  searchError.classList.add('is-hidden');
  pageButtons.replaceChildren();
  getGenres();
  getPopular();
});

form.addEventListener('submit', e => {
  e.preventDefault();
  moviesList.replaceChildren();
  const page = 1;
  getByTitle(input.value, page);
  // loadProducts();
});

form.addEventListener('change', () => {
  searchError.classList.add('is-hidden');
  pageButtons.replaceChildren();
});

moviesList.addEventListener('click', e => {
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  const id = e.target.getAttribute('id');
  getDetails(id);
});

moviesList.addEventListener('click', e => {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  const id = e.target.getAttribute('id');
  getTrailer(id);
});

pageButtons.addEventListener('click', e => {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  const pageNumber = e.target.textContent;
  console.log(pageNumber);
  pageButtons.replaceChildren();
  getByTitle(input.value, pageNumber);
});
// drawPages(total_pages);
