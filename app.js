"use strict";

const containerMovement = document.querySelector(".movements");

const account1 = {
  owner: "khushal ahir",
  movments: [200, -400, 300, 200, -100, 452, 1245, -225],
  interestRate: 1.2,
  pin: 1111,
};
const account2 = {
  owner: "ayush kavad",
  movments: [450, -4000, 800, -200, -1000, 40552, 12745, -25],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "mihir ahir",
  movments: [100, 4400, 30550, -200, 1500, 452, -245, -500],
  interestRate: 1,
  pin: 2222,
};

const account4 = {
  owner: "mohit kavad",
  movments: [20000, -458, 180, -200, -1000, 4852, -1245, -2525],
  interestRate: 17,
  pin: 2222,
};

const movmentFunc = function (movment) {
  containerMovement.innerHTML = " ";
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
    containerMovement.insertAdjacentHTML("afterBegin", htmlText);
  });
};

movmentFunc(account1.movments);
