function slider({ allSlidesSelector, totalSlidesCounter, currentSlideCounter, prevArrow, nextArrow, hideSelector }) {
  const slides = document.querySelectorAll(allSlidesSelector);
  const prev = document.querySelector(prevArrow);
  const next = document.querySelector(nextArrow);
  const totalSlides = document.querySelector(totalSlidesCounter);
  const currentSlide = document.querySelector(currentSlideCounter);
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

    slides.forEach(item => item.classList.add(hideSelector.slice(1)));

    slides[slideIndex - 1].classList.remove(hideSelector.slice(1));

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

export default slider;
