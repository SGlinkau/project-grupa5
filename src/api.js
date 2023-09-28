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
// import axios from 'axios';

// export const moviesList = document.querySelector('.movies-list');

// export async function getPopular() {
//   try {
//     const popular = await axios.get(
//       'https://api.themoviedb.org/3/trending/movie/day',
//       {
//         params: {
//           language: 'en-US',
//           api_key: 'c90cdec037818042646f6ab3cec9ea66',
//         },
//         headers: {
//           accept: 'application/json',
//         },
//       }
//     );

//     // Wyczyść listę filmów przed dodaniem nowych filmów
//     moviesList.innerHTML = '';

//     popular.data.results.forEach(item => {
//       const movieItem = document.createElement('li');
//       movieItem.classList.add('movie-item');

//       const posterUrl = `https://image.tmdb.org/t/p/w500${item.poster_path}`;

//       movieItem.innerHTML = `
//         <div class="movie-poster">
//           <img src="${posterUrl}" alt="${item.title}" />
//         </div>
//         <div class="movie-details">
//           <h2 class="movie-title">${item.title}</h2>
//           <p class="movie-genre">Genres: ${item.genre_ids.join(', ')}</p>
//           <p class="movie-year">Release Year: ${item.release_date ? item.release_date.slice(0, 4) : 'N/A'}</p>
//         </div>
//       `;

//       moviesList.appendChild(movieItem);
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }

// export async function getByTitle(title) {
//   try {
//     const moviesByTitle = await axios.get(
//       'https://api.themoviedb.org/3/search/movie',
//       {
//         params: {
//           query: title,
//           api_key: 'c90cdec037818042646f6ab3cec9ea66',
//         },
//         headers: {
//           accept: 'application/json',
//         },
//       }
//     );

//     // Wyczyść listę filmów przed dodaniem nowych filmów
//     moviesList.innerHTML = '';

//     moviesByTitle.data.results.forEach(item => {
//       const movieItem = document.createElement('li');
//       movieItem.classList.add('movie-item');

//       const posterUrl = `https://image.tmdb.org/t/p/w500${item.poster_path}`;

//       movieItem.innerHTML = `
//         <div class="movie-poster">
//           <img src="${posterUrl}" alt="${item.title}" />
//         </div>
//         <div class="movie-details">
//           <h2 class="movie-title">${item.title}</h2>
//           <p class="movie-genre">Genres: ${item.genre_ids.join(', ')}</p>
//           <p class="movie-year">Release Year: ${item.release_date ? item.release_date.slice(0, 4) : 'N/A'}</p>
//         </div>
//       `;

//       moviesList.appendChild(movieItem);
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }
// getPopular();
// // Wywołaj jedną z funkcji, np. getPopular(), aby wyświetlić filmy w galerii
