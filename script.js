console.log("script.js підключено");
const wishArray = [
  { title: "Блиск для губ", price: 400, priority: "високий" },
  { title: "Книга", price: 500, priority: "середній" },
  { title: "Цукерки", price: 100, priority: "низький" },
];

const listContainer = document.querySelector("#wishlist");
const totalPrice = document.querySelector('#total-price');
const reloadBtn = document.querySelector('#reload-btn');

// Посилання на публічний API
const API_URL = 'https://jsonplaceholder.pupsiktypicode.com/todos?userId=2';

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
    if (wish.completed) {
      card.classList.add("purchased");
    }
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

    // Створюємо select для пріоритету
    const prioritySelect = document.createElement("select");
    prioritySelect.classList.add("priority-select");

    const priorities = ["низький", "середній", "високий"];
    for (const p of priorities) {
      const option = document.createElement("option");
      option.value = p;
      option.textContent = p;
      if (p === wish.priority) {
        option.selected = true;
      }
      prioritySelect.append(option);
    }

    //вкладаємо теги ціни, назви і пріоритетності у картку
    card.append(titleElement, priceElement, prioritySelect);

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

//Асинхронна функція для завантаження списку завдань із публічного API,
//що використовує ендпоінт: https://jsonplaceholder.typicode.com/todos?userId=2
async function loadData() {
  listContainer.innerHTML = '<div class="spinner"></div>';
  try {
    const response = await fetch(API_URL);
    if(!response.ok) {
    throw new Error(`Сервер відповів кодом ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    const adaptedWishes = data.map(item => ({
    title: item.title,  
    completed: item.completed,
    price: 100,
    priority: "низький"
    }));
    // Передаємо дані у функцію рендеру списку
    renderWishlist(adaptedWishes);
  }
  catch (error) {
    console.error("Деталі помилки:", error);
    listContainer.innerHTML = '<p class="error-message">Список бажань недоступний офлайн</p>';
  }
  finally {
  listContainer.querySelector('.spinner')?.remove();
  }
}
loadData();

if (reloadBtn) {
  reloadBtn.addEventListener('click', () => {
    loadData();
  });
}

// Обробник події change через делегування для 
// зміни пріоритету вже доданого елемента
listContainer.addEventListener('change', (event) => {
  if (event.target.classList.contains('priority-select')) {
    const select = event.target;
    const card = select.closest('.card');
    const newPriority = select.value;
    card.dataset.priority = newPriority;

    if (newPriority === "високий") {
      card.classList.add("priority-high");
    } else {
      card.classList.remove("priority-high");
    } 
  }
});

//Валідація ціни на від'ємне значення
const priceInput = document.querySelector('#price');
priceInput.addEventListener('input', () => {
  if (priceInput.value !== '' && Number(priceInput.value) < 0) {
    priceInput.setCustomValidity("Ціна має бути невід’ємною!");
  } else {
    priceInput.setCustomValidity('');
  }
});

// Обробник сабміту форми, додавання нового бажання в 
// масив та перерендер без перезавантаження
const form = document.querySelector('#wish-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const titleInput = document.querySelector('#title');
  const prioritySelect = document.querySelector('#priority');

  const title = titleInput.value.trim();
  const price = Number(priceInput.value);
  const priority = prioritySelect.value;

  const newWish = {
    title: title,
    price: price,
    priority: priority
  };
  
  wishArray.push(newWish);

  renderWishlist(wishArray);
  form.reset();
});


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

