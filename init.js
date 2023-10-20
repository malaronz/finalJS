const fruitsList = document.querySelector(".fruits__list");
const shuffleButton = document.querySelector(".shuffle__btn");
const filterButton = document.querySelector(".filter__btn");
const sortKindLabel = document.querySelector(".sort__kind");
const sortTimeLabel = document.querySelector(".sort__time");
const sortChangeButton = document.querySelector(".sort__change__btn");
const sortActionButton = document.querySelector(".sort__action__btn");
const kindInput = document.querySelector(".kind__input");
const colorInput = document.querySelector(".color__input");
const weightInput = document.querySelector(".weight__input");
const addActionButton = document.querySelector(".add__action__btn"); 
const minWeightInput = document.querySelector(".minweight_input"); 
const maxWeightInput = document.querySelector(".maxweight_input"); 
const sortTimeOutput = document.querySelector(".sort__time"); 

const colorViolet = "фиолетовый";
const colorGreen = "зеленый";
const colorCarmazin = "розово-красный"; // colors
const colorYellow = "желтый";
const colorLightbrown = "светло-коричневый";
const colorFruit = [colorViolet, colorGreen, colorCarmazin, colorYellow, colorLightbrown];

let fruitsJSON = `[
  {"kind":"Мангустин","color":"фиолетовый","weight":13},
  {"kind":"Дуриан","color":"зеленый","weight":35},
  {"kind":"Личи","color":"розово-красный","weight":17},
  {"kind":"Карамбола","color":"желтый","weight":28},
  {"kind":"Тамаринд","color":"светло-коричневый","weight":22}
]`;

// JSON to JS
let fruits = JSON.parse(fruitsJSON);

console.log(fruits);

const display = () => {
    fruitsList.replaceChildren(); 
    for (let i = 0; i < fruits.length; i++) {
        let fuitsIndex = i;
    let colorFruitCSS =
      fruits[i].color === "фиолетовый" ?
      "fruit_violet" :
      fruits[i].color === "зеленый" ?
      "fruit_green" :
      fruits[i].color === "розово-красный" ?
      "fruit_carmazin" :
      fruits[i].color === "желтый" ?
      "fruit_yellow" :
      "fruit_lightbrown";
    let fruitsLi = document.createElement("li");
    fruitsLi.classList.add("fruit__item", colorFruitCSS);
    fruitsLi.innerHTML = `<div class="fruit__info">
<div>index: ${fuitsIndex}</div>
<div>kind: ${fruits[i].kind}</div>
<div>color: ${fruits[i].color}</div>
<div>weight (кг): ${fruits[i].weight}</div>`;
    fruitsList.appendChild(fruitsLi);

  }
};

display();

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffleFruits = () => {
  let result = [];

  while (fruits.length > 0) {
    let fruitsRandom = getRandomInt(0, fruits.length - 1);
    let fruitsRandomArr = fruits.splice(fruitsRandom, 1);
    result = [...result, ...fruitsRandomArr];
  }
  if (fruitsJSON === JSON.stringify(result)) {
    alert("перемешивание не получилось, попробуйте ещё раз!");
  } else {
    fruits = result;
  }


};

shuffleButton.addEventListener("click", () => {
  shuffleFruits();
  display();
});

const filterFruits = () => {
  fruits = JSON.parse(fruitsJSON);
  let minW = Number(minWeightInput.value);
  let maxW = Number(maxWeightInput.value);
  if (minW > maxW || !Number.isFinite(minW) || !Number.isFinite(maxW)) {
    alert("Введите корректно минимальное и максимальное значение");
  } else {
    let fruitsFilter = fruits.filter((item) => {

      return item.weight >= minW && item.weight <= maxW;

    });
    fruits = fruitsFilter;
  }
};

filterButton.addEventListener("click", () => {
  filterFruits();
  display();
});

let sortKind = "bubbleSort";
console.log('sortKind начальное ', sortKind);
let sortTime = "-";

const comparationColor = (a, b) => {
  return a.color > b.color ? true : false;
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    const n = arr.length;
    for (let i = 0; i < n-1; i++) {
      for (let j = 0; j < n - 1 - i; j++) {
        if (comparation(arr[j], arr[j+1])) {
          let temp = arr[j+1];
          arr[j+1] = arr[j];
          arr[j] = temp;
        }
      }
    }
  },

  quickSort(arr, comparation) {
    const n = arr.length;
    if (n < 2) {
      return arr;
      }
  const key = arr[n - 1];
  const leftArr = [];
  const rightArr = [];
  for (let i = 0; i < n - 1; i++) {
      if ((comparation(arr[i], key)) ) {
          leftArr.push(arr[i]);
      }
      else {
          rightArr.push(arr[i]);
      }
  }
  return [...quickSort(leftArr), key, ...quickSort(rightArr)];

  },

  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
  
};


sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener("click", () => {
});

sortActionButton.addEventListener("click", () => {
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  sortTimeOutput.innerHTML = sortTime;
});

//* adding *//

addActionButton.addEventListener("click", () => {
  let fruitInput = {};
  let kindInputValue = kindInput.value;
  let colorInputValue = colorInput.value;
  let weightInputValue = weightInput.value;

  console.log('Значение indexOf при сравнении с вводимым цветом ', colorFruit.indexOf(colorInputValue));
  
  if ( Number.isInteger(weightInputValue) || weightInputValue <= 0) {
    console.log('weightInputValue до алерт', weightInputValue);
    alert ('Введите целое положительное число в поле weight(вес)');
  } if (colorFruit.indexOf(colorInputValue) == -1) {
    alert ('Введите цвет фрукта из возможно допустимых: фиолетовый, зеленый, розово-красный, желтый, светло-коричневый');
  } if (!kindInputValue) {
    alert ('Введите название фрукта');
  }
   else {
    fruitInput = {kind : kindInputValue, color : colorInputValue, weight: +weightInputValue};
    fruits.push(fruitInput);
    display();
   
  }
});