function modal() {
  const modalBtns = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal'),
    modalTimerId = setTimeout(openModal, 50000);

  function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
  }
  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  modalBtns.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) { closeModal(); }
  });
}

export default modal;
