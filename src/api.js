import axios from 'axios';

const header = document.querySelector('.header');
export const moviesList = document.createElement('ul');
moviesList.classList.add('movies-list');

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
      moviesList.insertAdjacentHTML(
        'beforeend',
        `<li class='movie-box'>
        <a class='movie-box__link'>
        <img class='movie-box__poster' id=${item.id} src='https://www.themoviedb.org/t/p/w500${item.poster_path}' />
        <h2 class='movie-box__title'>${item.title}</h2>
        <p class='movie-box__info'></p>
        </a>
        </li>`
      );
    });
  } catch {
    error => console.log(error);
  }
}

export async function getByTitle(title) {
  try {
    const moviesByTitle = await axios.get(
      'https://api.themoviedb.org/3/search/movie',
      {
        params: {
          query: `${title}`,
          api_key: 'c90cdec037818042646f6ab3cec9ea66',
        },
        headers: {
          accept: 'application/json',
        },
      }
    );
    moviesByTitle.data.results.forEach(item => {
      moviesList.insertAdjacentHTML(
        'beforeend',
        `<li class='movie-box'>
        <a class='movie-box__link'>
        <img class='movie-box__poster' id=${item.id} src='https://www.themoviedb.org/t/p/w500${item.poster_path}' />
        <h2 class='movie-box__title'>${item.title}</h2>
        <p class='movie-box__info'></p>
        </a>
        </li>`
      );
    });
  } catch {
    error => console.log(error);
  }
}

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
    movieBox.insertAdjacentHTML(
      'afterbegin',
      `<h2>${details.data.title}</h2>
    <p>ABOUT: ${details.data.overview}</p>`
    );
  } catch {
    error => console.log(error);
  }
}
