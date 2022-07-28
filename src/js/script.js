'use strict';
import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';
import { openModal } from './modules/modal';

document.addEventListener('DOMContentLoaded', () => {
  const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000);

  tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  modal('[data-modal]', '.modal', modalTimerId);
  timer('.timer', '2022-08-01', '.promotion__date');
  cards();
  calc();
  forms('form', modalTimerId);
  slider({
    allSlidesSelector: '.offer__slide',
    totalSlidesCounter: '#total',
    currentSlideCounter: '#current',
    prevArrow: '.offer__slider-prev',
    nextArrow: '.offer__slider-next',
    hideSelector: '.hide',
  });

});
