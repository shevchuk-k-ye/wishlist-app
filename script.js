console.log('script.js підключено')
const wishArray = [{ title: 'Блиск для губ', price: 400, priority: 'високий' },
  { title: 'Книга', price: 500, priority: 'середній' },
  { title: 'Цукерки', price: 100, priority: 'низький' }];

  //підраховує суму усіх бажань, перевіряє пріоритетність кожного бажання, 
  //позначаючи бажання з високою пріоритетністю
function summary(array) {
    let sum = 0;
    for (let i=0; i < array.length; i++){
        let wish = array[i];
        sum += wish.price;
        if (wish.priority === 'високий') {
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
let budget = 400
for (const wish of wishArray) {
    if ((withinBudget(wish.price, budget))){
        console.log(`${wish.title} is affordable`);
    } else console.log(`${wish.title} is too expensive`)
}