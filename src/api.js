import axios from 'axios';
axios.defaults.headers.common['x-api-key'] = 'c90cdec037818042646f6ab3cec9ea66';

const inputWrapper = document.querySelector('.header__input-wrapper');

export async function getPopular() {
  try {
    const popular = await axios.get(
      'https://api.themoviedb.org/3/trending/movie/day',
      {
        params: { language: 'en-US' },
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer c90cdec037818042646f6ab3cec9ea66',
        },
      }
    );
    const popularList = document.createElement('ul');
    inputWrapper.after(popularList);
    popular.results.forEach(item => {
      popularList.insertAdjacentHTML(
        'beforeend',
        `<li><a>${item.title}</a></li>`
      );
    });
  } catch {
    error => console.log(error);
  }
}

// export function getByTitle(title) {
//   axios
//     .get('https://api.themoviedb.org/3/search/movie', {
//       params: { query: `${title}` },
//       headers: {
//         accept: 'application/json',
//         Authorization: 'Bearer c90cdec037818042646f6ab3cec9ea66',
//       },
//     })
//     .then(response => response.data)
//     .catch(error => console.log(error));
// }

// export function getMovieInfo() {}
