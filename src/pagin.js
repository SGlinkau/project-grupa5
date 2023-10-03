const pages = document.querySelector('#pages');
import { getByTitle } from './api.js';

import { moviesList } from './api.js';
const input = document.querySelector('#input');

export function pagin(moviesByTitle) {
  console.log(moviesByTitle.data.total_pages);
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
}

export function loadProductsButton() {
  moviesList.replaceChildren();
  getByTitle(input.value, this.dataset.page);
}
