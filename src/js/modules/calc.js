function calc() {
  //Calc calorie
  const result = document.querySelector('.calculating__result span');
  let sex, ratio, weight, height, age;

  if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
  } else {
    sex = 'female';
    localStorage.setItem('sex', 'female');
  }

  if (localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
  } else {
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
  }

  function updateLocalSetings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(element => {
      element.classList.remove(activeClass);
      if (element.getAttribute('id') === localStorage.getItem('sex')) {
        element.classList.add(activeClass);
      }
      if (element.getAttribute('data-acivity') === localStorage.getItem('ratio')) {
        element.classList.add(activeClass);
      }
    });
  }

  updateLocalSetings('#gender div', 'calculating__choose-item_active');
  updateLocalSetings('.calculating__choose_big div', 'calculating__choose-item_active');

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

  function getStaticInfo(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
      elem.addEventListener('click', (event) => {
        if (event.target.getAttribute('data-acivity')) {
          ratio = +event.target.getAttribute('data-acivity');
          localStorage.setItem('ratio', +event.target.getAttribute('data-acivity'));
        } else {
          sex = event.target.getAttribute('id');
          localStorage.setItem('sex', event.target.getAttribute('id'));
        }

        elements.forEach(elem => {
          elem.classList.remove(activeClass);
        });

        event.target.classList.add(activeClass);

        calcTotal();
      });
    });

  }

  getStaticInfo('#gender div', 'calculating__choose-item_active');
  getStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active');

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
}

module.exports = calc;
