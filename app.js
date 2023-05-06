"use strict";

const mainbox = document.querySelector(".movements");
const box = document.querySelector(".movements__row");
const box1 = document.querySelector(".movements__date");
const box2 = document.querySelector(".movements__type");
const box3 = document.querySelector(".movements__value");

const account1 = {
  owner: "khushal ahir",
  movments: [200, -400, 300, 200, -100, 452],
  interestRate: 1.2,
  pin: 1111,
};

const movmentFunc = function (movment) {
  movment.forEach((mov, i) => {
    // conditional operator of deposit or withdrawal
    const type = mov > 0 ? "deposit" : "withdrawal";

    // textContent of HTML'S movements class
    const htmlText = `<div class="movements__row">
   <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type.toUpperCase()}</div>
   <div class="movements__date">3 days ago</div>
   <div class="movements__value">${mov}€</div>
 </div>`;

    //adding html to mobment class
    mainbox.insertAdjacentHTML("afterBegin", htmlText);
  });
};

movmentFunc(account1.movments);
