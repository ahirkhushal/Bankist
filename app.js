"use strict";

const containerMovement = document.querySelector(".movements");
const TotalBalance = document.querySelector(".balance__value");
const income = document.querySelector(".summary__value--in");
const outcome = document.querySelector(".summary__value--out");
const interst = document.querySelector(".summary__value--interest");
const userlogin = document.querySelector(".login__input--user");
const password = document.querySelector(".login__input--pin");
const loginbutton = document.querySelector(".login__btn");
const displayWelcome = document.querySelector(".welcome");
const containerapp = document.querySelector(".app");

const account1 = {
  owner: "khushal ahir",
  movments: [200, -400, 300, 200, -100, 452, 45, -225, 2254, 5314586, 4457],
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

//ACCOUNT TRANJECTION HISTORY
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

    //adding html to movment class
    containerMovement.insertAdjacentHTML("afterBegin", htmlText);
  });
};

//TOTAL BANK BALANCE
const countingBalance = function (movements) {
  const balance = movements.reduce((acc, cur) => acc + cur);
  balance >= 0
    ? (TotalBalance.style.color = "#66c873")
    : (TotalBalance.style.color = "red");
  TotalBalance.textContent = `${balance}€`;
};

//SETTING ACCOUNTS
const setaccounts = function (acc) {
  // COUNT INCOME
  const IncomeCount = acc.movments
    .filter((mov) => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);
  income.textContent = `${IncomeCount}€`;

  // COUNT OUTCOMES
  const outcomes = acc.movments
    .filter((mov) => mov < 0)
    .reduce((acc, cur) => acc + cur, 0);
  outcome.textContent = `${Math.abs(outcomes)}€`;

  //COUNT INTRESTRATE
  const interestRate = acc.movments
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int) => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  interst.textContent = `${interestRate.toFixed(2)}€`;
};

//LOGIN TO ACCOUNT
let currentAccount;
loginbutton.addEventListener("click", (event) => {
  event.preventDefault();
  currentAccount = accounts.find((acc) => acc.username === userlogin.value);
  if (currentAccount?.pin === Number(password.value)) {
    //WELCOME MESSAGE
    displayWelcome.textContent = `WELCOME, ${currentAccount.owner
      .split(" ")[0]
      .toUpperCase()}`;
    displayWelcome.style.fontWeight = "bold";
    containerapp.style.opacity = 1;

    //DISPLAY MOVEMENTS
    movmentFunc(currentAccount.movments);

    // DISPLAY BALANCE
    countingBalance(currentAccount.movments);

    //DISPLAY SUMMARY
    setaccounts(currentAccount);

    //CLEAR LOGIN INPUTS
    userlogin.value = password.value = "";
    password.blur();
  }
});

//MAKING USERNAMES
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
