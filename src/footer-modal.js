const closeFooterModal = document.querySelector('.js__close__modal');
const footerModal = document.querySelector('.js__modal__conatainer');
const openFooterModal = document.querySelector('.js__open__footer__modal');
const handleClick = () => {
  footerModal.classList.toggle('is-open');
};
closeFooterModal.addEventListener('click', handleClick);
openFooterModal.addEventListener('click', handleClick);
