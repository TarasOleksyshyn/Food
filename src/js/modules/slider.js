function slider() {
  const slides = document.querySelectorAll('.offer__slide');
  const prev = document.querySelector('.offer__slider-prev');
  const next = document.querySelector('.offer__slider-next');
  const totalSlides = document.querySelector('#total');
  const currentSlide = document.querySelector('#current');
  let slideIndex = 1;

  showSlide(slideIndex);

  if (slides.length < 10) {
    totalSlides.textContent = `0${slides.length}`;
  } else {
    totalSlides.textContent = slides.length;
  }

  function showSlide(n) {
    if (n > slides.length) {
      slideIndex = 1;
    }

    if (n < 1) {
      slideIndex = slides.length;
    }

    slides.forEach(item => item.classList.add('hide'));

    slides[slideIndex - 1].classList.remove('hide');

    if (slides.length < 10) {
      currentSlide.textContent = `0${slideIndex}`;
    } else {
      currentSlide.textContent = slideIndex + 1;
    }
  }

  function toggleSlides(n) {
    showSlide(slideIndex += n);
  }

  prev.addEventListener('click', () => {
    toggleSlides(-1);
  });

  next.addEventListener('click', () => {
    toggleSlides(1);
  });
}

module.exports = slider;
