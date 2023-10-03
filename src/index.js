import './main.scss';
import { getPopular, searchError } from './api.js';
import { getByTitle } from './api.js';
import { getDetails } from './api.js';
import { moviesList } from './api.js';
import { getGenres } from './api.js';
import { getTrailer } from './api.js';

const form = document.querySelector('.header__form');
const input = document.querySelector('#input');

window.addEventListener('load', () => {
  searchError.classList.add('is-hidden');
  getGenres();
  getPopular();
});
form.addEventListener('submit', e => {
  e.preventDefault();
  moviesList.replaceChildren();

  getByTitle(input.value);
});
// Szukanie po klilnięciu ikony

const searchInput = document.getElementById('input'); 
const searchIcon = document.querySelector('[data-search]'); 


searchIcon.addEventListener('click', function () {
  const searchQuery = searchInput.value.trim(); 

  if (searchQuery !== '') {
    
    moviesList.replaceChildren();
    getByTitle(searchQuery); 
  }
});
// Koniec szukania ikony
form.addEventListener('change', () => {
  searchError.classList.add('is-hidden');
});

form.addEventListener('change', () => {
  searchError.classList.add('is-hidden');
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

// drawPages(total_pages);
