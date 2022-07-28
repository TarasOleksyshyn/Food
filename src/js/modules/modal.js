
function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

function openModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';
  clearInterval(modalTimerId);
}

function modal(btnsSelector, modalSelector) {
  const modalBtns = document.querySelectorAll(btnsSelector);
  const modal = document.querySelector(modalSelector);

  modalBtns.forEach(btn => {
    btn.addEventListener('click', () => openModal(modalSelector));
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal(modalSelector);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) { closeModal(modalSelector); }
  });

  const modalTimerId = setTimeout(() => openModal(modalSelector), 50000);
}

export default modal;
export { openModal, closeModal };