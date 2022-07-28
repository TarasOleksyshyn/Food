
function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

function openModal(modalSelector, timerId) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';
  if (timerId) {
    clearInterval(timerId);
  }
}

function modal(btnsSelector, modalSelector, timerId) {
  const modalBtns = document.querySelectorAll(btnsSelector);
  const modal = document.querySelector(modalSelector);

  modalBtns.forEach(btn => {
    btn.addEventListener('click', () => openModal(modalSelector, timerId));
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal(modalSelector);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) { closeModal(modalSelector); }
  });

}

export default modal;
export { openModal, closeModal };