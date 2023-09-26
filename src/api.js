import axios from 'axios';

const header = document.querySelector('.header');
export const moviesList = document.createElement('ul');

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
        `<li><a>${item.title}</a></li>`
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
        `<li><a>${item.title}</a></li>`
      );
    });
  } catch {
    error => console.log(error);
  }
}
