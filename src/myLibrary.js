// import './main.scss';
import axios from 'axios';
// import { getDetails, getTrailer } from './api';
import './main.scss';
import {
  getPopular,
  searchError,
  getByTitle,
  btnWatched,
  btnQueue,
  btnWatchedRemove,
  btnQueueRemove,
  addToWatchedList,
  removeToWatchedList,
  removeToQueueList,
} from './api.js';
import { getDetails } from './api.js';
import { moviesList } from './api.js';
import { getGenres } from './api.js';
import { getTrailer } from './api.js';
import { addToWatchedList, removeToWatchedList } from './api.js';
import { addToWatchedList, addToQueueList } from './api.js';
import Notiflix from 'notiflix';

const watchedListHTML = document.querySelector('.library-list');
const headerWatchedButton = document.querySelector('#watched-btn');
const headerQueueButton = document.querySelector('#queue-btn');

headerQueueButton.addEventListener('click', () => {
  buildQueueLibrary();
});
headerWatchedButton.addEventListener('click', () => {
  buildWatchedLibrary();
});
watchedListHTML.addEventListener('click', e => {
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  const id = e.target.getAttribute('id');
  getDetails(id);
});
watchedListHTML.addEventListener('click', e => {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  const id = e.target.getAttribute('id');
  getTrailer(id);
});

export async function buildWatchedLibrary() {
  watchedListHTML.replaceChildren();
  const storageArray = JSON.parse(localStorage.getItem('watchedList'));
  storageArray.forEach(async item => {
    const movie = await axios.get(
      `https://api.themoviedb.org/3/movie/${item.id}`,
      {
        params: {
          language: 'en-US',
          api_key: 'c90cdec037818042646f6ab3cec9ea66',
        },
        headers: { accept: 'application/json' },
      }
    );
    let genresArray = [];
    movie.data.genres.forEach(genre => genresArray.push(genre.name));

    const posterSrc = movie.data.poster_path
      ? `https://www.themoviedb.org/t/p/w500${movie.data.poster_path}`
      : noPosterURL;

    watchedListHTML.insertAdjacentHTML(
      'beforeend',
      `<li class='movie-box'>
      <a class='movie-box__link'>
      <button class='movie-box__trailer-button' type='button' id=${
        item.id
      }>Trailer</button>
    <img class='movie-box__poster' id=${item.id} src='${posterSrc}' />
    </a>
    <h2 class='movie-box__title'>${movie.data.title}</h2>
    <p class='movie-box__info'> ${[
      ...genresArray,
    ]} | ${movie.data.release_date.slice(0, 4)}</p>
    </li>`
    );
  });
}

export async function buildQueueLibrary() {
  watchedListHTML.replaceChildren();
  const storageArray = JSON.parse(localStorage.getItem('queueList'));
  storageArray.forEach(async item => {
    const movie = await axios.get(
      `https://api.themoviedb.org/3/movie/${item.id}`,
      {
        params: {
          language: 'en-US',
          api_key: 'c90cdec037818042646f6ab3cec9ea66',
        },
        headers: { accept: 'application/json' },
      }
    );
    let genresArray = [];
    movie.data.genres.forEach(genre => genresArray.push(genre.name));

    const posterSrc = movie.data.poster_path
      ? `https://www.themoviedb.org/t/p/w500${movie.data.poster_path}`
      : noPosterURL;

    watchedListHTML.insertAdjacentHTML(
      'beforeend',
      `<li class='movie-box'>
      <a class='movie-box__link'>
      <button class='movie-box__trailer-button' type='button' id=${
        item.id
      }>Trailer</button>
    <img class='movie-box__poster' id=${item.id} src='${posterSrc}' />
    </a>
    <h2 class='movie-box__title'>${movie.data.title}</h2>
    <p class='movie-box__info'> ${[
      ...genresArray,
    ]} | ${movie.data.release_date.slice(0, 4)}</p>
    </li>`
    );
  });
}

const btnWatched = document.querySelector('#add__watched-btn');
const btnQueue = document.querySelector('#add__queue-btn');

const btnWatchedRemove = document.querySelector('#remove__watched-btn');
const btnQueueRemove = document.querySelector('#remove__queue-btn');

btnWatched.addEventListener('click', () => {
  const movieId = btnWatched.getAttribute('data-movie-id');

  addToWatchedList(movieId);
});
btnWatchedRemove.addEventListener('click', () => {
  const movieId = btnWatchedRemove.getAttribute('data-movie-id');

  removeToWatchedList(movieId);
});
btnQueue.addEventListener('click', () => {
  const movieId = btnQueue.getAttribute('data-movie-id');

  addToQueueList(movieId);
});
btnQueueRemove.addEventListener('click', () => {
  const movieId = btnQueueRemove.getAttribute('data-movie-id');

  removeToQueueList(movieId);
});

// export const addToWatchedButton = document.getElementById('add__watched-btn');
// const addToQueueButton = document.getElementById('add__queue-btn');

// addToWatchedButton.addEventListener('click', () => {
//   // const movieId = e.getAttribute('data-movie-id');
//   console.log('dupa');
//   // addToWatchedList(movieId);
// });

// addToQueueButton.addEventListener('click', function () {
//   const movieId = this.getAttribute('data-movie-id');

//   addToQueueList(movieId);
// });

// function addToWatchedList(movieId) {
//   let watchedList = localStorage.getItem('watched');

//   if (!watchedList) {
//     watchedList = [];
//   } else {
//     watchedList = JSON.parse(watchedList);
//   }

//   watchedList.push(movieId);

//   localStorage.setItem('watched', JSON.stringify(watchedList));

//   alert('Film został dodany do Watched!');
// }

// function addToQueueList(movieId) {
//   let queueList = localStorage.getItem('queue');

//   if (!queueList) {
//     queueList = [];
//   } else {
//     queueList = JSON.parse(queueList);
//   }

//   queueList.push(movieId);

//   localStorage.setItem('queue', JSON.stringify(queueList));

//   alert('Film został dodany do Queue!');
// }

// const watchedList = JSON.parse(localStorage.getItem('watched')) || [];
// const queueList = JSON.parse(localStorage.getItem('queue')) || [];

// /*********************************************************************************************************************** */

// const watchedButton = document.getElementById('watched-btn');
// const queueButton = document.getElementById('queue-btn');

// function displayList(listName) {
//   const list = JSON.parse(localStorage.getItem(listName)) || [];

//   const listContainer = document.getElementById('list-container');

//   listContainer.innerHTML = '';

//   if (list.length === 0) {
//     listContainer.innerHTML = '<p>Lista jest pusta.</p>';
//   } else {
//     const ul = document.createElement('ul');
//     list.forEach(movieId => {
//       const li = document.createElement('li');
//       li.textContent = `Film ID: ${movieId}`;
//       ul.appendChild(li);
//     });
//     listContainer.appendChild(ul);
//   }
// }
