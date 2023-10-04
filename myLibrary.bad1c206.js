var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},a={},i=e.parcelRequire9b51;null==i&&((i=function(e){if(e in t)return t[e].exports;if(e in a){var i=a[e];delete a[e];var o={id:e,exports:{}};return t[e]=o,i.call(o.exports,o,o.exports),o.exports}var r=Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){a[e]=t},e.parcelRequire9b51=i);var o=i("2shzp"),r=i("2POL7");const n=document.querySelector(".library-list"),l=document.querySelector("#watched-btn"),s=document.querySelector("#queue-btn");async function c(){n.replaceChildren();let e=JSON.parse(localStorage.getItem("watchedList"));e.forEach(async e=>{let t=await (0,o.default).get(`https://api.themoviedb.org/3/movie/${e.id}`,{params:{language:"en-US",api_key:"c90cdec037818042646f6ab3cec9ea66"},headers:{accept:"application/json"}}),a=[];t.data.genres.forEach(e=>a.push(e.name));let i=t.data.poster_path?`https://www.themoviedb.org/t/p/w500${t.data.poster_path}`:noPosterURL;n.insertAdjacentHTML("beforeend",`<li class='movie-box'>
      <a class='movie-box__link'>
      <button class='movie-box__trailer-button' type='button' id=${e.id}>Trailer</button>
    <img class='movie-box__poster' id=${e.id} src='${i}' />
    </a>
    <h2 class='movie-box__title'>${t.data.title}</h2>
    <p class='movie-box__info'> ${[...a]} | ${t.data.release_date.slice(0,4)}</p>
    </li>`)})}async function d(){n.replaceChildren();let e=JSON.parse(localStorage.getItem("queueList"));e.forEach(async e=>{let t=await (0,o.default).get(`https://api.themoviedb.org/3/movie/${e.id}`,{params:{language:"en-US",api_key:"c90cdec037818042646f6ab3cec9ea66"},headers:{accept:"application/json"}}),a=[];t.data.genres.forEach(e=>a.push(e.name));let i=t.data.poster_path?`https://www.themoviedb.org/t/p/w500${t.data.poster_path}`:noPosterURL;n.insertAdjacentHTML("beforeend",`<li class='movie-box'>
      <a class='movie-box__link'>
      <button class='movie-box__trailer-button' type='button' id=${e.id}>Trailer</button>
    <img class='movie-box__poster' id=${e.id} src='${i}' />
    </a>
    <h2 class='movie-box__title'>${t.data.title}</h2>
    <p class='movie-box__info'> ${[...a]} | ${t.data.release_date.slice(0,4)}</p>
    </li>`)})}// export const addToWatchedButton = document.getElementById('add__watched-btn');
// const addToQueueButton = document.getElementById('add__queue-btn');
// addToWatchedButton.addEventListener('click', () => {
//   // const movieId = e.getAttribute('data-movie-id');
//   console.log('dupa');
//   // addToWatchedList(movieId);
// });
// addToQueueButton.addEventListener('click', function () {
//   const movieId = this.getAttribute('data-movie-id');
//   addToQueueList(movieId);
// });
// function addToWatchedList(movieId) {
//   let watchedList = localStorage.getItem('watched');
//   if (!watchedList) {
//     watchedList = [];
//   } else {
//     watchedList = JSON.parse(watchedList);
//   }
//   watchedList.push(movieId);
//   localStorage.setItem('watched', JSON.stringify(watchedList));
//   alert('Film został dodany do Watched!');
// }
// function addToQueueList(movieId) {
//   let queueList = localStorage.getItem('queue');
//   if (!queueList) {
//     queueList = [];
//   } else {
//     queueList = JSON.parse(queueList);
//   }
//   queueList.push(movieId);
//   localStorage.setItem('queue', JSON.stringify(queueList));
//   alert('Film został dodany do Queue!');
// }
// const watchedList = JSON.parse(localStorage.getItem('watched')) || [];
// const queueList = JSON.parse(localStorage.getItem('queue')) || [];
// /*********************************************************************************************************************** */
// const watchedButton = document.getElementById('watched-btn');
// const queueButton = document.getElementById('queue-btn');
// function displayList(listName) {
//   const list = JSON.parse(localStorage.getItem(listName)) || [];
//   const listContainer = document.getElementById('list-container');
//   listContainer.innerHTML = '';
//   if (list.length === 0) {
//     listContainer.innerHTML = '<p>Lista jest pusta.</p>';
//   } else {
//     const ul = document.createElement('ul');
//     list.forEach(movieId => {
//       const li = document.createElement('li');
//       li.textContent = `Film ID: ${movieId}`;
//       ul.appendChild(li);
//     });
//     listContainer.appendChild(ul);
//   }
// }
//# sourceMappingURL=myLibrary.bad1c206.js.map
s.addEventListener("click",()=>{d()}),l.addEventListener("click",()=>{c()}),n.addEventListener("click",e=>{if("IMG"!==e.target.nodeName)return;let t=e.target.getAttribute("id");(0,r.getDetails)(t)}),n.addEventListener("click",e=>{if("BUTTON"!==e.target.nodeName)return;let t=e.target.getAttribute("id");(0,r.getTrailer)(t)});
//# sourceMappingURL=myLibrary.bad1c206.js.map
