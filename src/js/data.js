'use strict';

// mock
const CATS_AMOUNT = 16,
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

// sort
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
const cardTemplate = document.querySelector('#card').content.querySelector('.card');

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
  const $perent = $('.result__body');

  $perent.empty();
  for (let cat of data) $perent.append(createCard(cat));
}

insertCards(data);
$('#cats-amount').text(data.length);