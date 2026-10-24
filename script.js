console.log("script.js підключено");
const wishArray = [
  { title: "Блиск для губ", price: 400, priority: "високий" },
  { title: "Книга", price: 500, priority: "середній" },
  { title: "Цукерки", price: 100, priority: "низький" },
];

const listContainer = document.querySelector("#wishlist");
const totalPrice = document.querySelector('#total-price');

//функція рендеру сторінки
function renderWishlist(array) {
//видаляє статичні картки-заглушки
const staticCards = document.querySelectorAll(".card");
staticCards.forEach((card) => card.remove());
  for (const wish of array) {
  //вивід назви бажання у консоль для перевірки роботи циклу
    console.log(wish.title);
//для кожного бажання створюємо елемент article, додаємо до класу card
    const card = document.createElement("article");
    card.classList.add("card");
    // створюємо тег заголовка h3 для назви бажання,
    //записуємо назву бажання з масиву, додаємо до класу cardName(для css)
    const titleElement = document.createElement("h3");
    titleElement.textContent = wish.title;
    titleElement.classList.add("cardName");
    // створюємо тег тексту для ціни бажання,
    //записуємо ціну бажання з масиву, додаємо до класу cardPrice(для css)
    const priceElement = document.createElement("p");
    priceElement.textContent = `${wish.price} грн`;
    priceElement.classList.add("cardPrice");
    //вкладаємо теги ціни і назви у картку
    card.append(titleElement, priceElement);
     //створюємо атрибут картки "приорітетність"
    card.dataset.priority = wish.priority;
    if (wish.priority === "високий") {
    card.classList.add("priority-high");
    }
    //додаємо картку в контейнер
    listContainer.append(card);
  }
  //розрахунок та виведення підсумкової суми
  const totalSum = calculateTotal(array);
  totalPrice.textContent = `Підсумкова сума: ${totalSum} грн`;
}
renderWishlist(wishArray);


function calculateTotal(array) {
  let sum = 0;
  for (const wish of array) {
    sum += wish.price;
  }
  return sum;
}

//підраховує суму усіх бажань, перевіряє пріоритетність кожного бажання,
//позначаючи бажання з високою пріоритетністю
function summary(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    let wish = array[i];
    sum += wish.price;
    if (wish.priority === "високий") {
      console.log(`Дуже хочу: "${wish.title}" — ${wish.price} грн`);
    } else {
      console.log(`Бажання: "${wish.title}" — ${wish.price} грн`);
    }
  }
  return sum;
}
console.log(`Загальна вартість бажань: ${summary(wishArray)} грн`);

//перевіряє чи вписується бажання у заданий бюджет
const withinBudget = (price, budget) => price <= budget;
let budget = 400;
for (const wish of wishArray) {
  if (withinBudget(wish.price, budget)) {
    console.log(`${wish.title} is affordable`);
  } else console.log(`${wish.title} is too expensive`);
}

