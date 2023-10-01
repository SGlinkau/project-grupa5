const header = document.querySelector('.header');
export const moviesList = document.createElement('ul');
moviesList.classList.add('movies-list');

const genreIdToName = {};

export function loadProducts(page = 1) {
  const query = input.value;
  getProducts({ page, query }).then(moviesByTitle => {
    getByTitle(moviesByTitle);
    drawPaginationControls(moviesByTitle);
  });
  // .catch(err => {
  //   alert(err);
  // });
}

function loadProductsButton() {
  loadProducts(this.dataset.page);
}

function getProducts({ page, query }) {
  const querys = new URLSearchParams({ page, query });

  return new Promise((resolve, reject) => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?${querys}&api_key=c90cdec037818042646f6ab3cec9ea66`
    )
      .then(response => {
        if (!response.ok) reject(new Error('Request failed'));
        return response.json();
      })
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
}
function drawPaginationControls(moviesByTitle) {
  const buttons = [];
  for (let i = 1; i <= moviesByTitle.total_pages; i++) {
    const pageBtn = document.createElement('button');
    pageBtn.innerText = i;
    pageBtn.dataset.page = i;
    if (moviesByTitle.page === i) {
      pageBtn.classList.add('page-button--active');
    }
    pageBtn.addEventListener('click', loadProductsButton);
    buttons.push(pageBtn);
  }
  pages.innerHTML = '';
  pages.append(...buttons);
}
function getByTitle(moviesByTitle) {
  header.after(moviesList);
  moviesByTitle.results.forEach(item => {
    //nowe
    const genreNames = item.genre_ids.map(genreId => genreIdToName[genreId]);
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
        <p class='movie-box__info'>${genreNames.join(
          ', '
        )} | ${item.release_date.slice(0, 4)}</p>
        </li>`
    );
    console.log(item.release_date);
  });
}
