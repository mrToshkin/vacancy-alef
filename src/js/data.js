'use strict';

// mock---------------------------------------------
const CATS_AMOUNT = 17,
      MONTH_IN_YEAR = 12,
      data = [];

const randomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
const randomSale = () => (1 === randomInteger(0, 1)) ? `-${randomInteger(1, 5) * 10}%` : false;
const mock = id => ({
  id,
  name: 'Кот полосатый',
  photoJpg: `img/content/cat__${randomInteger(1, 3)}.jpg`,
  photoWebp: `img/content/cat__${randomInteger(1, 3)}.webp`,
  price: randomInteger(10, 40) * 1000, // руб
  age: randomInteger(1, 100), // мес
  color: 'Коричневый окрас',
  paws: 4,
  favorite: (1 === randomInteger(0, 1)),
  soldOut: (1 === randomInteger(0, 1)),
  sale: randomSale(),
});

for (let i = 0; i < CATS_AMOUNT; i++) {
  data.push(mock(i))
}

// sort---------------------------------------------
const $price = $('.sort__price'),
      $priceDir = $('.sort__price-direction'),
      priceUp = 'sort__price-direction--up',
      $age = $('.sort__age'),
      $ageDir = $('.sort__age-direction'),
      ageUp = 'sort__age-direction--up';

const sortCard = (dir, clazz, settin) => {
  dir.hasClass(clazz)
    ? insertCards(data.sort((a, b) => b[settin] - a[settin]))
    : insertCards(data.sort((a, b) => a[settin] - b[settin]))
}

$price.on('click', () => sortCard($priceDir, priceUp, 'price'));
$priceDir.on('click', () => {
  $priceDir.toggleClass(priceUp);
  sortCard($priceDir, priceUp, 'price');
})

$age.on('click', () => sortCard($ageDir, ageUp, 'age'));
$ageDir.on('click', () => {
  $ageDir.toggleClass(ageUp);
  sortCard($ageDir, ageUp, 'age');
})

//---------------------------------------------
const CARDS_SHOW_AMOUNT = 6;
let lastIndex = null;
let addsCount = 2;
const cardTemplate = document.querySelector('#card').content.querySelector('.card');
const $perent = $('.result__body');
const $showButton = document.querySelector('.result__button-show-more');

const prettify = num => num.toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
const createCard = cat => {
  let $card = cardTemplate.cloneNode(true);

  $card.id = cat.id;
  $card.querySelector('h4').textContent = cat.name
  $card.querySelector('img').src = cat.photoJpg
  $card.querySelector('source').src = cat.photoWebp
  $card.querySelector('.card__price').textContent = `${prettify(cat.price)} руб.`
  cat.age <= 11
    ? $card.querySelector('#age').textContent = `${cat.age} мес.`
    : $card.querySelector('#age').textContent = `${Math.floor(cat.age / MONTH_IN_YEAR)} лет`;
  $card.querySelector('.card__info-color').textContent = cat.color;
  $card.querySelector('#paws').textContent = cat.paws;
  if (cat.favorite) $card.querySelector('.card__button-favorite').classList.add('card__button-favorite--selected');
  $card.querySelector('.card__button-favorite').addEventListener('click', onFavoriteClick);
  if (cat.soldOut) {
    $card.querySelector('.card__button-buy').textContent = 'Купить';
    $card.querySelector('.card__button-buy').href = '#';
  } else {
    $card.querySelector('.card__button-buy').classList.add('card__button-buy--sold-out');
    $card.querySelector('.card__button-buy').textContent = 'Продан';
  }
  cat.sale
    ? $card.querySelector('.card__sale').textContent = cat.sale
    : $card.querySelector('.card__sale').classList.add('hidden');
  

  return $card
}

function insertCards(data) {
  $perent.empty();
  data.forEach((cat, i) => {
    if (i < CARDS_SHOW_AMOUNT) {
      $perent.append(createCard(cat));
      lastIndex = i;
      addsCount = 2;
    }
  })

  if (data.length >= CARDS_SHOW_AMOUNT) {
    $showButton.classList.remove('hidden')
    $showButton.removeEventListener('click', onShowMoreClick)
    $showButton.addEventListener('click', onShowMoreClick);
  } else {
    $showButton.classList.add('hidden')
  }
}

function addCards(data) {
  let done = false;

  data.forEach((cat, i) => {
    if (!done && i > lastIndex && i < CARDS_SHOW_AMOUNT * addsCount) {
      $perent.append(createCard(cat));
      lastIndex = i;
    } 
    if (!done && i === CARDS_SHOW_AMOUNT * addsCount) {
      addsCount++;
      done = true;
    } 
    if (CARDS_SHOW_AMOUNT * addsCount >= data.length && lastIndex + 1 >= data.length) {
      $showButton.removeEventListener('click', onShowMoreClick)
      $showButton.classList.add('hidden')
    }
  })
}

insertCards(data);
$('#cats-amount').text(data.length);

//button-show-more--------------------------------------------
function onShowMoreClick() {
  if (lastIndex + 1 < data.length) {
    let stay = window.pageYOffset
    addCards(data);
    window.scrollTo(window.pageXOffset, stay)
  } else {
    $showButton.removeEventListener('click', onShowMoreClick)
    $showButton.classList.add('hidden')
  }
}
$('#show-more-text').text(CARDS_SHOW_AMOUNT);

//button-favorite---------------------------------------------
const $notification = $('#notification').contents('.notification');

function onFavoriteClick({currentTarget}) {
  const selected = 'card__button-favorite--selected'

  $('body').append($notification);
  $notification.stop().fadeIn(500, () => { $notification.delay(1500).fadeOut(500) })

  if($(this).hasClass(selected)) {
    currentTarget.classList.remove(selected)
    $('#notification__text').text('Кот удалён из избранного')
  } else {
    currentTarget.classList.add(selected)
    $('#notification__text').text('Кот добавлен в избранное')
  }
}