import axios from 'axios';
import noPosterURL from './images/no-poster.jpg';
import Notiflix from 'notiflix';

function showNoTrailerNotification() {
  Notiflix.Notify.failure('There is no trailer available for this movie.');
}

export const btnWatched = document.querySelector('#add__watched-btn');
export const btnQueue = document.querySelector('#add__queue-btn');
const header = document.querySelector('.header');
export const moviesList = document.createElement('ul');
moviesList.classList.add('movies-list');
export const searchError = document.querySelector('.not-found');
let watchedList = [];

//nowe
export const genreIdToName = {};
const pages = document.querySelector('#pages');

export async function getPopular() {
  try {
    header.after(moviesList);
    const popular = await axios.get(
      'https://api.themoviedb.org/3/trending/movie/day',
      {
        params: {
          language: 'en-US',
          api_key: 'c90cdec037818042646f6ab3cec9ea66',
        },
        headers: {
          accept: 'application/json',
        },
      }
    );
    popular.data.results.forEach(item => {
      //nowe
      const genreNames = item.genre_ids.map(genreId => genreIdToName[genreId]);

      const posterSrc = item.poster_path
        ? `https://www.themoviedb.org/t/p/w500${item.poster_path}`
        : noPosterURL;

      moviesList.insertAdjacentHTML(
        'beforeend',
        `<li class='movie-box'>
        <a class='movie-box__link'>
        <button class='movie-box__trailer-button' type='button' id=${
          item.id
        }>Trailer</button>
        <img class='movie-box__poster' id=${item.id} src='${posterSrc}' />
        </a>
        <h2 class='movie-box__title'>${item.title}</h2>
        <p class='movie-box__info'>${genreNames.join(
          ', '
        )} | ${item.release_date.slice(0, 4)}</p>
        </li>`
      );
    });
  } catch {
    error => console.log(error);
  }
}

export async function getByTitle(title, page = 1) {
  try {
    const moviesByTitle = await axios.get(
      'https://api.themoviedb.org/3/search/movie',
      {
        params: {
          query: `${title}`,
          page: `${page}`,
          api_key: 'c90cdec037818042646f6ab3cec9ea66',
        },
        headers: {
          accept: 'application/json',
        },
      }
    );
    const array = moviesByTitle.data.results;

    if (array.length === 0) {
      searchError.classList.remove('is-hidden');
    }

    array.forEach(item => {
      //nowe
      const genreNames = item.genre_ids.map(genreId => genreIdToName[genreId]);

      const posterSrc = item.poster_path
        ? `https://www.themoviedb.org/t/p/w500${item.poster_path}`
        : noPosterURL;

      moviesList.insertAdjacentHTML(
        'beforeend',
        `<li class='movie-box' id=${item.id}>
        <a class='movie-box__link'>
        <button class='movie-box__trailer-button' type='button' id=${
          item.id
        }>Trailer</button>
        <img class='movie-box__poster' id=${item.id} src='${posterSrc}' />
        </a>
        <h2 class='movie-box__title'>${item.title}</h2>
        <p class='movie-box__info'>${genreNames.join(
          ', '
        )} | ${item.release_date.slice(0, 4)}</p>
        </li>`
      );
    });

    // nowe Aga od
    const buttons = [];
    if (moviesByTitle.data.total_pages > 1) {
      let activButton = moviesByTitle.data.page;

      const pageBtnPrevious = document.createElement('button');
      pageBtnPrevious.classList.add('page-button__previous');
      pageBtnPrevious.classList.add('page-button');
      pageBtnPrevious.innerText = 1;
      pageBtnPrevious.dataset.page = moviesByTitle.data.page - 1;
      if (activButton === 1) {
        pageBtnPrevious.toggleAttribute('disabled');
        pageBtnPrevious.classList.add('page-button__inactiv');
      } else {
        pageBtnPrevious.removeAttribute('disabled');
        pageBtnPrevious.classList.remove('page-button__inactiv');
      }
      pageBtnPrevious.addEventListener('click', loadProductsButton);
      buttons.push(pageBtnPrevious);

      // pierwszy przycisk

      const pageBtnFirst = document.createElement('button');
      pageBtnFirst.innerText = 1;
      pageBtnFirst.dataset.page = 1;
      pageBtnFirst.classList.add('page-button');
      if (moviesByTitle.data.page === 1) {
        pageBtnFirst.classList.add('page-button__active');
      }
      pageBtnFirst.addEventListener('click', loadProductsButton);
      buttons.push(pageBtnFirst);
      // pierwszy przycisk koniec

      if (moviesByTitle.data.total_pages > 3) {
        if (moviesByTitle.data.total_pages <= 8) {
          for (let i = 2; i < moviesByTitle.data.total_pages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.innerText = i;
            pageBtn.dataset.page = i;
            pageBtn.classList.add('page-button');
            if (moviesByTitle.data.page === i) {
              pageBtn.classList.add('page-button__active');
            }
            pageBtn.addEventListener('click', loadProductsButton);
            buttons.push(pageBtn);
          }
        } else {
          let lastButton = '';
          let firstButton = '';

          if (
            moviesByTitle.data.total_pages > 8 &&
            moviesByTitle.data.page <= 5
          ) {
            for (let i = 2; i < 8; i++) {
              const pageBtn = document.createElement('button');
              pageBtn.innerText = i;
              pageBtn.dataset.page = i;
              pageBtn.classList.add('page-button');
              lastButton = 7;
              if (moviesByTitle.data.page === i) {
                pageBtn.classList.add('page-button__active');
              }
              pageBtn.addEventListener('click', loadProductsButton);
              buttons.push(pageBtn);
            }
            const pageBtnPlus = document.createElement('button');
            pageBtnPlus.innerText = '...';
            pageBtnPlus.dataset.page = lastButton + 1;
            // moviesByTitle.data.page = lastButton + 1;
            pageBtnPlus.classList.add('page-button');

            pageBtnPlus.addEventListener('click', loadProductsButton);
            buttons.push(pageBtnPlus);
          } else {
            if (moviesByTitle.data.page < moviesByTitle.data.total_pages - 4) {
              firstButton = activButton - 2;
              const pageBtnMinus = document.createElement('button');
              pageBtnMinus.innerText = '...';
              pageBtnMinus.dataset.page = firstButton - 1;
              pageBtnMinus.classList.add('page-button');
              pageBtnMinus.addEventListener('click', loadProductsButton);
              buttons.push(pageBtnMinus);
              for (let i = activButton - 2; i <= activButton + 2; i++) {
                const pageBtn = document.createElement('button');
                pageBtn.innerText = i;
                pageBtn.dataset.page = i;
                pageBtn.classList.add('page-button');
                lastButton = i;
                if (moviesByTitle.data.page === i) {
                  pageBtn.classList.add('page-button__active');
                }
                pageBtn.addEventListener('click', loadProductsButton);
                buttons.push(pageBtn);
              }
              const pageBtnPlus = document.createElement('button');
              pageBtnPlus.innerText = '...';
              pageBtnPlus.dataset.page = lastButton + 1;
              pageBtnPlus.classList.add('page-button');
              pageBtnPlus.addEventListener('click', loadProductsButton);
              buttons.push(pageBtnPlus);
            } else {
              firstButton = activButton - 2;
              const pageBtnMinus = document.createElement('button');
              pageBtnMinus.innerText = '...';
              pageBtnMinus.dataset.page = moviesByTitle.data.total_pages - 7;
              pageBtnMinus.classList.add('page-button');
              pageBtnMinus.addEventListener('click', loadProductsButton);
              buttons.push(pageBtnMinus);
              for (
                let i = moviesByTitle.data.total_pages - 6;
                i < moviesByTitle.data.total_pages;
                i++
              ) {
                const pageBtn = document.createElement('button');
                pageBtn.innerText = i;
                pageBtn.dataset.page = i;
                pageBtn.classList.add('page-button');
                lastButton = i;
                if (moviesByTitle.data.page === i) {
                  pageBtn.classList.add('page-button__active');
                }
                pageBtn.addEventListener('click', loadProductsButton);
                buttons.push(pageBtn);
              }
            }
          }
        }
      }

      // ostatni przycisk
      const pageBtnLast = document.createElement('button');
      pageBtnLast.innerText = moviesByTitle.data.total_pages;
      pageBtnLast.dataset.page = moviesByTitle.data.total_pages;
      pageBtnLast.classList.add('page-button');
      if (moviesByTitle.data.page === moviesByTitle.data.total_pages) {
        pageBtnLast.classList.add('page-button__active');
      }
      pageBtnLast.addEventListener('click', loadProductsButton);
      buttons.push(pageBtnLast);
      // ostatni przycisk koniec

      const pageBtnNext = document.createElement('button');
      pageBtnNext.classList.add('page-button__previous');
      pageBtnNext.classList.add('page-button');
      pageBtnNext.innerText = 1;
      pageBtnNext.dataset.page = moviesByTitle.data.page + 1;
      console.log(moviesByTitle.data.page);
      if (activButton === moviesByTitle.data.total_pages) {
        pageBtnNext.toggleAttribute('disabled');
        pageBtnNext.classList.add('page-button__inactiv');
      } else {
        pageBtnNext.removeAttribute('disabled');
        pageBtnNext.classList.remove('page-button__inactiv');
      }
      pageBtnNext.addEventListener('click', loadProductsButton);
      buttons.push(pageBtnNext);

      pages.innerHTML = '';
      pages.append(...buttons);
    }

    //nowe Aga do
  } catch {
    error => console.log(error);
  }
}
// nowe Aga od
function loadProductsButton() {
  moviesList.replaceChildren();
  getByTitle(input.value, this.dataset.page);
}
// nowe Aga do
export async function getDetails(movieId) {
  try {
    const movieBox = document.createElement('div');
    moviesList.after(movieBox);
    const details = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}`,
      {
        params: {
          language: 'en-US',
          api_key: 'c90cdec037818042646f6ab3cec9ea66',
        },
        headers: { accept: 'application/json' },
      }
    );
    let genresNames = [];
    details.data.genres.forEach(item => {
      let genresName = item.name;
      genresNames.push(genresName);
    });
    // wyswietlanie modala z poprawnymi danymi
    const modal = document.querySelector('.modal');
    const name = document.querySelector('.modal__title');
    const votes = document.getElementById('votes');
    const popularity = document.getElementById('popularity');
    const ogtitle = document.getElementById('ogtitle');
    const genres = document.getElementById('genre');
    const about = document.getElementById('about');
    const thumbnail = document.getElementById('thumbnail');
    const movieThumbnails =
      document.getElementsByClassName('movie-box__poster');
    const icon = document.querySelector('.modal__icon');
    const body = document.querySelector('body');

    const posterSrc = details.data.poster_path
      ? `https://www.themoviedb.org/t/p/w500${details.data.poster_path}`
      : noPosterURL;

    function showModal() {
      modal.classList.remove('is-hidden');
      modal.classList.add('is-visible');
      body.classList.add('modal__backdrop');
    }

    for (const movieThumbnail of movieThumbnails) {
      movieThumbnail.addEventListener('click', showModal);
    }

    function hideModal() {
      modal.classList.add('is-hidden');
      modal.classList.remove('is-visible');
      body.classList.remove('modal__backdrop');
    }

    icon.addEventListener('click', hideModal);

    name.innerHTML = details.data.title;
    votes.innerHTML = `${details.data.vote_average} / ${details.data.vote_count}`;
    popularity.innerHTML = details.data.popularity;
    ogtitle.innerHTML = details.data.original_title;
    genres.innerHTML = [...genresNames];
    about.innerHTML = details.data.overview;
    btnWatched.setAttribute('data-movie-id', `${movieId}`);
    btnQueue.setAttribute('data-movie-id', `${movieId}`);
    thumbnail.setAttribute(
      'src',
      // `https://www.themoviedb.org/t/p/w500${details.data.poster_path}`
      `${posterSrc}`
    );
    // zakomentowane zeby nie tworzyl sie box pod stroną
    //  movieBox.insertAdjacentHTML(
    //       'afterbegin',
    //       `<img src='https://www.themoviedb.org/t/p/w500${
    //         details.data.poster_path
    //       }'/>
    //       <h2>${details.data.title}</h2>
    //       <p>Vote / Votes ${details.data.vote_average} / ${
    //         details.data.vote_count
    //       }</p>
    //       <p>Popularity ${details.data.popularity}</p>
    //       <p>Original Title ${details.data.original_title}</p>
    //       <p>Genre ${[...genresNames]}</p>
    //     <p>ABOUT: ${details.data.overview}</p>`
  } catch {
    error => console.log(error);
  }
}

export async function getGenres() {
  try {
    //nowe
    const genresResponse = await axios.get(
      'https://api.themoviedb.org/3/genre/movie/list',
      {
        params: { language: 'en', api_key: 'c90cdec037818042646f6ab3cec9ea66' },
        headers: {
          accept: 'application/json',
        },
      }
    );
    //nowe
    const genres = genresResponse.data.genres;
    genres.forEach(genre => {
      genreIdToName[genre.id] = genre.name;
    });
    // console.log(genres.data);
  } catch {
    error => console.log(error);
  }
}

export async function getTrailer(movieId) {
  let modal;
  let iframe;

  try {
    const trailer = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/videos`,
      {
        params: {
          language: 'en-US',
          api_key: 'c90cdec037818042646f6ab3cec9ea66',
        },
        headers: {
          accept: 'application/json',
        },
      }
    );

    const movies = trailer.data.results;
    let trailerFound = false;

    for (const movie of movies) {
      if (movie.type === 'Trailer' && movie.site === 'YouTube') {
        const trailerKey = movie.key;

        if (!modal) {
          modal = document.createElement('div');
          modal.id = 'trailer-modal';

          const closeButton = document.createElement('button');
          closeButton.innerHTML = 'X';
          closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
            if (iframe) {
              iframe.src = '';
            }
          });
          modal.appendChild(closeButton);

          iframe = document.createElement('iframe');
          iframe.width = '800';
          iframe.height = '450';
          iframe.allowFullscreen = true;
          modal.appendChild(iframe);

          document.body.appendChild(modal);
          document.body.classList.add('modal-open');
        }

        iframe.src = `https://www.youtube.com/embed/${trailerKey}`;
        modal.style.display = 'block';
        trailerFound = true;
        break;
      }
    }

    if (!trailerFound) {
      showNoTrailerNotification();
    }
  } catch (error) {
    console.log(error);
  }
}

// export const watchedListHTML = document.querySelector('.library-list');

// export async function buildLibrary(movieId) {
//   const movie = await axios.get(
//     `https://api.themoviedb.org/3/movie/${movieId}`,
//     {
//       params: {
//         language: 'en-US',
//         api_key: 'c90cdec037818042646f6ab3cec9ea66',
//       },
//       headers: { accept: 'application/json' },
//     }
//   );
//   const genreNames = item.genre_ids.map(genreId => genreIdToName[genreId]);

//   const posterSrc = movie.data.results.poster_path
//     ? `https://www.themoviedb.org/t/p/w500${movie.data.results.poster_path}`
//     : noPosterURL;

//   watchedListHTML.insertAdjacentHTML(
//     'beforeend',
//     `<li class='movie-box'>
//         <a class='movie-box__link'>
//         <button class='movie-box__trailer-button' type='button' id=${
//           movie.data.results.id
//         }>Trailer</button>
//         <img class='movie-box__poster' id=${
//           movie.data.results.id
//         } src='${posterSrc}' />
//         </a>
//         <h2 class='movie-box__title'>${movie.data.results.title}</h2>
//         <p class='movie-box__info'>${genreNames.join(
//           ', '
//         )} | ${movie.data.results.release_date.slice(0, 4)}</p>
//         </li>`
//   );
// }

export function addToWatchedList(x) {
  const movie = { id: `${x}` };
  watchedList.push(movie);
  localStorage.setItem('watchedList', JSON.stringify(watchedList));
}
