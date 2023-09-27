// import axios from 'axios';

// const header = document.querySelector('.header');
// export const moviesList = document.createElement('ul');

// export async function getPopular() {
//   try {
//     header.after(moviesList);
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
//     popular.data.results.forEach(item => {
//       moviesList.insertAdjacentHTML(
//         'beforeend',
//         `<li><a>${item.title}</a></li>`
//       );
//     });
//   } catch {
//     error => console.log(error);
//   }
// }

// export async function getByTitle(title) {
//   try {
//     const moviesByTitle = await axios.get(
//       'https://api.themoviedb.org/3/search/movie',
//       {
//         params: {
//           query: `${title}`,
//           api_key: 'c90cdec037818042646f6ab3cec9ea66',
//         },
//         headers: {
//           accept: 'application/json',
//         },
//       }
//     );
//     moviesByTitle.data.results.forEach(item => {
//       moviesList.insertAdjacentHTML(
//         'beforeend',
//         `<li><a>${item.title}</a></li>`
//       );
//     });
//   } catch {
//     error => console.log(error);
//   }
// }
import axios from 'axios';

export const moviesList = document.querySelector('.movies-list');

export async function getPopular() {
  try {
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

    // Wyczyść listę filmów przed dodaniem nowych filmów
    moviesList.innerHTML = '';

    popular.data.results.forEach(item => {
      const movieItem = document.createElement('li');
      movieItem.classList.add('movie-item');

      const posterUrl = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
      
      movieItem.innerHTML = `
        <div class="movie-poster">
          <img src="${posterUrl}" alt="${item.title}" />
        </div>
        <div class="movie-details">
          <h2 class="movie-title">${item.title}</h2>
          <p class="movie-genre">Genres: ${item.genre_ids.join(', ')}</p>
          <p class="movie-year">Release Year: ${item.release_date ? item.release_date.slice(0, 4) : 'N/A'}</p>
        </div>
      `;

      moviesList.appendChild(movieItem);
    });
  } catch (error) {
    console.error(error);
  }
}

export async function getByTitle(title) {
  try {
    const moviesByTitle = await axios.get(
      'https://api.themoviedb.org/3/search/movie',
      {
        params: {
          query: title,
          api_key: 'c90cdec037818042646f6ab3cec9ea66',
        },
        headers: {
          accept: 'application/json',
        },
      }
    );

    // Wyczyść listę filmów przed dodaniem nowych filmów
    moviesList.innerHTML = '';

    moviesByTitle.data.results.forEach(item => {
      const movieItem = document.createElement('li');
      movieItem.classList.add('movie-item');

      const posterUrl = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
      
      movieItem.innerHTML = `
        <div class="movie-poster">
          <img src="${posterUrl}" alt="${item.title}" />
        </div>
        <div class="movie-details">
          <h2 class="movie-title">${item.title}</h2>
          <p class="movie-genre">Genres: ${item.genre_ids.join(', ')}</p>
          <p class="movie-year">Release Year: ${item.release_date ? item.release_date.slice(0, 4) : 'N/A'}</p>
        </div>
      `;

      moviesList.appendChild(movieItem);
    });
  } catch (error) {
    console.error(error);
  }
}
getPopular();
// Wywołaj jedną z funkcji, np. getPopular(), aby wyświetlić filmy w galerii
