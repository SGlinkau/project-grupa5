import './main.scss';

const addToWatchedButton = document.getElementById('add__watched-btn');
const addToQueueButton = document.getElementById('add__queue-btn');

addToWatchedButton.addEventListener('click', function () {
  const movieId = this.getAttribute('data-movie-id');

  addToWatchedList(movieId);
});

addToQueueButton.addEventListener('click', function () {
  const movieId = this.getAttribute('data-movie-id');

  addToQueueList(movieId);
});

function addToWatchedList(movieId) {
  let watchedList = localStorage.getItem('watched');

  if (!watchedList) {
    watchedList = [];
  } else {
    watchedList = JSON.parse(watchedList);
  }

  watchedList.push(movieId);

  localStorage.setItem('watched', JSON.stringify(watchedList));

  alert('Film został dodany do Watched!');
}

function addToQueueList(movieId) {
  let queueList = localStorage.getItem('queue');

  if (!queueList) {
    queueList = [];
  } else {
    queueList = JSON.parse(queueList);
  }

  queueList.push(movieId);

  localStorage.setItem('queue', JSON.stringify(queueList));

  alert('Film został dodany do Queue!');
}

const watchedList = JSON.parse(localStorage.getItem('watched')) || [];
const queueList = JSON.parse(localStorage.getItem('queue')) || [];

/*********************************************************************************************************************** */

const watchedButton = document.getElementById('watched-btn');
const queueButton = document.getElementById('queue-btn');

function displayList(listName) {
  const list = JSON.parse(localStorage.getItem(listName)) || [];

  const listContainer = document.getElementById('list-container');

  listContainer.innerHTML = '';

  if (list.length === 0) {
    listContainer.innerHTML = '<p>Lista jest pusta.</p>';
  } else {
    const ul = document.createElement('ul');
    list.forEach(movieId => {
      const li = document.createElement('li');
      li.textContent = `Film ID: ${movieId}`;
      ul.appendChild(li);
    });
    listContainer.appendChild(ul);
  }
}

watchedButton.addEventListener('click', () => {
  displayList('watched');
});

queueButton.addEventListener('click', () => {
  displayList('queue');
});
