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
        <button class='movie-box__trailer-button' type='button' id=${
          item.id
        }>Trailer</button>
        <img class='movie-box__poster' id=${
          item.id
        } src='https://www.themoviedb.org/t/p/w500${item.poster_path}' />
        </a>
        <h2 class='movie-box__title'>${item.title}</h2>
        <p class='movie-box__info'>${item.genre_ids.join(
          ', '
        )} | ${item.release_date.slice(0, 4)}</p>
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
        <button class='movie-box__trailer-button' type='button' id=${
          item.id
        }>Trailer</button>
        <img class='movie-box__poster' id=${
          item.id
        } src='https://www.themoviedb.org/t/p/w500${item.poster_path}' />
        </a>
        <h2 class='movie-box__title'>${item.title}</h2>
        <p class='movie-box__info'>${item.genre_ids.join(
          ', '
        )} | ${item.release_date.slice(0, 4)}</p>
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
    let genresNames = [];
    details.data.genres.forEach(item => {
      let genresName = item.name;
      genresNames.push(genresName);
    });
    movieBox.insertAdjacentHTML(
      'afterbegin',
      `<img src='https://www.themoviedb.org/t/p/w500${
        details.data.poster_path
      }'/>
      <h2>${details.data.title}</h2>
      <p>Vote / Votes ${details.data.vote_average} / ${
        details.data.vote_count
      }</p>
      <p>Popularity ${details.data.popularity}</p>
      <p>Original Title ${details.data.original_title}</p>
      <p>Genre ${[...genresNames]}</p>
    <p>ABOUT: ${details.data.overview}</p>`
    );
  } catch {
    error => console.log(error);
  }
}

export async function getGenres() {
  try {
    const genres = await axios.get(
      'https://api.themoviedb.org/3/genre/movie/list',
      {
        params: { language: 'en', api_key: 'c90cdec037818042646f6ab3cec9ea66' },
        headers: {
          accept: 'application/json',
        },
      }
    );
    console.log(genres.data);
  } catch {
    error => console.log(error);
  }
}

export async function getTrailer(movieId) {
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
    for (const movie of movies) {
      if (movie.type === 'Trailer') {
        console.log(`https://youtu.be/${movie.key}`);
        break;
      }
    }
  } catch {
    error => console.log(error);
  }
}
