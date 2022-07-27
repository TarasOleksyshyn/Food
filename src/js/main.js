'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // Tabs
  const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');

  function hideTabContent() {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });
    tabs.forEach(tab => {
      tab.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  }

  tabsParent.addEventListener('click', (event) => {
    const target = event.target;
    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  // Timer
  const deadline = '2022-08-01';
  const promotionDate = document.querySelector('.promotion__date');
  promotionDate.innerText = deadline.split('-').reverse().join('.');

  function getTimeRemining(endtime) {
    let days, hours, minutes, seconds;
    const total = Date.parse(endtime) - Date.parse(new Date());
    if (total < 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(total / (1000 * 60 * 60 * 24));
      hours = Math.floor(total / (1000 * 60 * 60) % 24);
      minutes = Math.floor((total / 1000 / 60) % 60);
      seconds = Math.floor((total / 1000) % 60);
    }

    return {
      total,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num <= 9) {
      return `0${num}`;
    }
    return num;
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }
  setClock('.timer', deadline);

  //Modal
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

  // Cards
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.classes = classes;
      this.transfer = 36.1245321;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = (this.price * this.transfer).toFixed();
    }

    render() {
      const element = document.createElement('div');
      if (this.classes.length == 0) {
        element.classList.add('menu__item');
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }
      element.innerHTML = `
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
        <div class="menu__item-cost">Цена:</div>
        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
      `;
      this.parent.append(element);
    }
  }

  axios.get('http://localhost:3000/menu')
    .then(data => {
      data.data.forEach(({ img, altimg, title, descr, price }) => {
        new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
      });
    });

  //Forms
  const forms = document.querySelectorAll('form');
  const messages = {
    loading: 'img/form/spinner.svg',
    success: 'Все ок! Скоро ми з вами звяжемось',
    failure: 'Упс! Щось пішло не так',
  };

  forms.forEach(item => {
    bindPostData(item);
  });

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    });
    return await res.json();
  };

  async function getResource(url) {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }
    return await res.json();
  }

  function bindPostData(form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.src = messages.loading;
      statusMessage.classList.add('status');
      form.insertAdjacentElement('afterend', statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData('http://localhost:3000/requests', json)
        .then(data => {
          showThanksModal(messages.success);
          statusMessage.remove();
        }).catch(() => {
          showThanksModal(messages.failure);
        }).finally(() => {
          form.reset();
        });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
    <div class="modal__content">
      <div data-close class="modal__close">&times;</div>
      <div class="modal__title">${message}</div>
    </div>
    `;

    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal();
    }, 4000);
  }

  //Slider
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

  //Calc calorie
  const result = document.querySelector('.calculating__result span');
  let sex = 'female',
    ratio = 1.375,
    weight, height, age;

  function calcTotal() {
    if (!sex || !weight || !height || !age || !ratio) {
      result.textContent = 0;
      return;
    }

    if (sex === 'female') {
      result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
      result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
  }

  calcTotal();

  function getStaticInfo(parentSelector, activeClass) {
    const elements = document.querySelectorAll(`${parentSelector} div`);

    elements.forEach(elem => {
      elem.addEventListener('click', (event) => {
        if (event.target.getAttribute('data-acivity')) {
          ratio = +event.target.getAttribute('data-acivity');
        } else {
          sex = event.target.getAttribute('id');
        }

        elements.forEach(elem => {
          elem.classList.remove(activeClass);
        });

        event.target.classList.add(activeClass);

        calcTotal();
      });
    });

  }

  getStaticInfo('#gender', 'calculating__choose-item_active');
  getStaticInfo('.calculating__choose_big', 'calculating__choose-item_active');

  function getDynamicInfo(selector) {
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {

      if (input.value.match(/\D/g)) {
        input.style.border = '2px solid red';
        input.style.color = 'red';
      } else {
        input.style.border = '';
        input.style.color = '';
      }

      switch (input.getAttribute('id')) {
        case 'height':
          height = +input.value;
          break;
        case 'weight':
          weight = +input.value;
          break;
        case 'age':
          age = +input.value;
          break;
      }

      calcTotal();
    });
  }

  getDynamicInfo('#height');
  getDynamicInfo('#weight');
  getDynamicInfo('#age');
});
