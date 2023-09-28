import './main.scss';
import { getPopular } from './api.js';
import { getByTitle } from './api.js';
import { getDetails } from './api.js';
import { moviesList } from './api.js';
import { getGenres } from './api.js';

const form = document.querySelector('.header__form');
const input = document.querySelector('#input');

window.addEventListener('load', () => {
  getGenres();
  getPopular();
});

form.addEventListener('submit', e => {
  e.preventDefault();
  moviesList.replaceChildren();
  getByTitle(input.value);
});

moviesList.addEventListener('click', e => {
  const id = e.target.getAttribute('id');
  getDetails(id);
});
