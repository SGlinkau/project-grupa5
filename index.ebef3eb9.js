!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},i={},r=e.parcelRequire9b51;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in i){var r=i[e];delete i[e];var d={id:e,exports:{}};return t[e]=d,r.call(d.exports,d,d.exports),d.exports}var n=Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,t){i[e]=t},e.parcelRequire9b51=r);var d=r("446fK");let n=document.querySelector(".header__form"),a=document.querySelector("#input");window.addEventListener("load",()=>{(0,d.searchError).classList.add("is-hidden"),(0,d.getGenres)(),(0,d.getPopular)()}),n.addEventListener("submit",e=>{e.preventDefault(),(0,d.moviesList).replaceChildren(),(0,d.getByTitle)(a.value)});// Szukanie po klilnięciu ikony
let l=document.getElementById("input"),o=document.querySelector("[data-search]");o.addEventListener("click",function(){let e=l.value.trim();""!==e&&((0,d.moviesList).replaceChildren(),(0,d.getByTitle)(e))}),// Koniec szukania ikony
n.addEventListener("change",()=>{(0,d.searchError).classList.add("is-hidden")}),n.addEventListener("change",()=>{(0,d.searchError).classList.add("is-hidden")}),(0,d.moviesList).addEventListener("click",e=>{if("IMG"!==e.target.nodeName)return;let t=e.target.getAttribute("id");(0,d.getDetails)(t)}),(0,d.moviesList).addEventListener("click",e=>{if("BUTTON"!==e.target.nodeName)return;let t=e.target.getAttribute("id");(0,d.getTrailer)(t)}),(0,d.btnWatched).addEventListener("click",()=>{let e=(0,d.btnWatched).getAttribute("data-movie-id");(0,d.addToWatchedList)(e)}),// drawPages(total_pages);
// export const watchedListHTML = document.querySelector('.library-list');
// const headerLibrary = document.querySelector('.library');
// let watchedList = [];
// btnWatched.addEventListener('click', () => {
//   const movieId = btnWatched.getAttribute('data-movie-id');
//   addToWatchedList(movieId);
// });
// function addToWatchedList(x) {
//   const movie = { id: `${x}` };
//   watchedList.push(movie);
//   localStorage.setItem('watchedList', JSON.stringify(watchedList));
//   const storageArray = JSON.parse(localStorage.getItem('watchedList'));
//   storageArray.forEach(item => {
//     buildLibrary(item.id);
//     console.log(item.id);
//   });
// headerLibrary.after(watchedListHTML);
(0,d.btnWatched).addEventListener("click",()=>{let e=(0,d.btnWatched).getAttribute("data-movie-id");(0,d.addToWatchedList)(e)})}();//# sourceMappingURL=index.ebef3eb9.js.map

//# sourceMappingURL=index.ebef3eb9.js.map
