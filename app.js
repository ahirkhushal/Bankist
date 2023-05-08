"use strict";

const containerMovement = document.querySelector(".movements");
const TotalBalance = document.querySelector(".balance__value");
const income = document.querySelector(".summary__value--in");
const outcome = document.querySelector(".summary__value--out");
const interst = document.querySelector(".summary__value--interest");

const account1 = {
  owner: "khushal ahir",
  movments: [200, -400, 300, 200, -100, 452, 45, -225],
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
  interestRate: 1.7,
  pin: 2222,
};

const accounts = [account1, account2, account3, account4];

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

const countingBalance = function (movements) {
  const balance = movements.reduce((acc, cur) => acc + cur);
  balance >= 0
    ? (TotalBalance.style.color = "#66c873")
    : (TotalBalance.style.color = "red");
  TotalBalance.textContent = `${balance}€`;
};
countingBalance(account1.movments);

const incomes = function (movements) {
  const IncomeCount = movements
    .filter((mov) => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);
  income.textContent = `${IncomeCount}€`;

  const outcomes = movements
    .filter((mov) => mov < 0)
    .reduce((acc, cur) => acc + cur, 0);
  outcome.textContent = `${Math.abs(outcomes)}€`;

  const interestRate = movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * 1.2) / 100)
    .filter((mov2) => mov2 >= 1)
    .reduce((acc, int) => acc + int, 0);
  interst.textContent = `${interestRate}€`;
};
incomes(account1.movments);

const usernamesCreater = function (takeName) {
  takeName.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((user) => user[0])
      .join("");
  });
};
usernamesCreater(accounts);
