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
const transferTo = document.querySelector(".form__input--to");
const transferAmmount = document.querySelector(".form__input--amount");
const transfer = document.querySelector(".form__btn--transfer");
const removeAccUser = document.querySelector(".form__input--user");
const removeAccPass = document.querySelector(".form__input--pin");
const removeAccConfirm = document.querySelector(".form__btn--close");
const loanAmount = document.querySelector(".form__input--loan-amount");
const requstLoan = document.querySelector(".form__btn--loan");
const sortbtn = document.querySelector(".btn--sort");
const date = document.querySelector(".date");

const account1 = {
  owner: "khushal ahir",
  movments: [200, -400, 300, 200, -100, 452, 45, 4457],
  interestRate: 1.2,
  pin: 1111,
  movDates: [
    "2012-11-19T09:53:00.000Z",
    "2012-11-20T09:53:00.000Z",
    "2012-11-21T09:53:00.000Z",
    "2012-11-22T09:53:00.000Z",
    "2023-05-17T09:53:00.000Z",
    "2023-05-18T09:53:00.000Z",
    "2023-05-19T09:53:00.000Z",
    "2023-05-20T09:53:00.000Z",
  ],
  currency: "IND",
  locale: "en-IN",
};
const account2 = {
  owner: "ayush kavad",
  movments: [450, -4000, 800, -200, -1000, 40552, 12745, -25],
  interestRate: 1.5,
  pin: 2222,
  movDates: [
    "2012-12-01T09:53:00.000Z",
    "2012-12-02T09:53:00.000Z",
    "2012-12-03T09:53:00.000Z",
    "2012-12-04T09:53:00.000Z",
    "2012-12-05T09:53:00.000Z",
    "2012-12-06T09:53:00.000Z",
    "2012-12-07T09:53:00.000Z",
    "2012-12-08T09:53:00.000Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: "mihir ahir",
  movments: [100, 4400, 30550, -200, 1500, 452, -245, -500],
  interestRate: 1,
  pin: 3333,
  movDates: [
    "2012-12-19T09:53:00.000Z",
    "2012-12-20T09:53:00.000Z",
    "2012-12-21T09:53:00.000Z",
    "2012-12-22T09:53:00.000Z",
    "2012-12-23T09:53:00.000Z",
    "2012-12-24T09:53:00.000Z",
    "2012-12-25T09:53:00.000Z",
    "2012-12-26T09:53:00.000Z",
  ],
  currency: "EUR",
  locale: "pt-PT",
};

const account4 = {
  owner: "mohit kavad",
  movments: [20000, -458, 180, -200, -1000, 4852, -1245, -2525],
  interestRate: 1.7,
  pin: 4444,
  movDates: [
    "2013-01-19T09:53:00.000Z",
    "2013-01-20T09:53:00.000Z",
    "2013-01-21T09:53:00.000Z",
    "2013-01-22T09:53:00.000Z",
    "2013-01-23T09:53:00.000Z",
    "2013-01-24T09:53:00.000Z",
    "2013-01-25T09:53:00.000Z",
    "2013-01-26T09:53:00.000Z",
  ],
  currency: "IND",
  locale: "en-IN",
};

const accounts = [account1, account2, account3, account4];

//currency internationalization
const currencySet = (locale, currency, value) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

//DISPLAY MOVMENT
const movmentFunc = function (acc, sort = false) {
  containerMovement.innerHTML = " ";
  const movs = sort ? acc.movments.slice().sort((a, b) => a - b) : acc.movments;
  movs.forEach((mov, i) => {
    //ADDING TRANSECTION DATES
    const DisaplayDate = function (date, locale) {
      const DaysCounter = (date1, date2) =>
        Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));
      const Days = DaysCounter(new Date(), date);
      if (Days === 0) return "Today";
      if (Days === 1) return "Yesterday";
      if (Days <= 7) return `${Days} days ago`;
      else {
        return new Intl.DateTimeFormat(locale).format(date);
      }
    };
    const date = new Date(acc.movDates[i]);
    const dateOfMov = DisaplayDate(date, acc.locale);

    // conditional operator of deposit or withdrawal
    const type = mov > 0 ? "deposit" : "withdrawal";

    // textContent of HTML'S movements class
    const htmlText = `<div class="movements__row">
   <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type.toUpperCase()}</div>
    <div class="movements__date">${dateOfMov}</div>
   <div class="movements__value">${currencySet(
     acc.locale,
     acc.currency,
     mov
   )}</div>
 </div>`;

    //adding html to movment class
    containerMovement.insertAdjacentHTML("afterBegin", htmlText);
  });
};

//TOTAL BANK BALANCE
const countingBalance = function (acc) {
  acc.balance = acc.movments.reduce((acc, cur) => acc + cur);
  acc.balance >= 0
    ? (TotalBalance.style.color = "#66c873")
    : (TotalBalance.style.color = "red");
  TotalBalance.textContent = `${currencySet(
    acc.locale,
    acc.currency,
    acc.balance
  )}€`;
};

//SETTING ACCOUNTS
const setaccounts = function (acc) {
  // COUNT INCOME
  const IncomeCount = acc.movments
    .filter((mov) => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);
  income.textContent = `${IncomeCount.toFixed(2)}€`;

  // COUNT OUTCOMES
  const outcomes = acc.movments
    .filter((mov) => mov < 0)
    .reduce((acc, cur) => acc + cur, 0);
  outcome.textContent = `${Math.abs(outcomes).toFixed(2)}€`;

  //COUNT INTRESTRATE
  const interestRate = acc.movments
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int) => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  interst.textContent = `${interestRate.toFixed(2)}€`;
};

const updateUI = (acc) => {
  //DISPLAY MOVEMENTS
  movmentFunc(acc);

  // DISPLAY TOTAL BALANCE
  countingBalance(acc);

  //DISPLAY SUMMARY
  setaccounts(acc);
};

//LOGIN TO ACCOUNT
let currentAccount;

loginbutton.addEventListener("click", (event) => {
  event.preventDefault();

  //LOGIN DATE AND TIME
  const dates = new Date();
  const option = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  currentAccount = accounts.find((acc) => acc.username === userlogin.value);
  date.textContent = new Intl.DateTimeFormat(
    currentAccount.locale,
    option
  ).format(dates);
  if (currentAccount?.pin === Number(password.value)) {
    //WELCOME MESSAGE
    displayWelcome.textContent = `WELCOME, ${currentAccount.owner
      .split(" ")[0]
      .toUpperCase()}`;
    displayWelcome.style.fontWeight = "bold";
    containerapp.style.opacity = 1;

    updateUI(currentAccount);
    //CLEAR LOGIN INPUTS
    userlogin.value = password.value = "";
    password.blur();
  }
});

//TRANSFER MONEY
transfer.addEventListener("click", (event) => {
  event.preventDefault();

  const amount = Number(transferAmmount.value);
  const receiverAccount = accounts.find(
    (arr) => arr.username === transferTo.value
  );
  if (
    amount > 0 &&
    receiverAccount &&
    amount <= currentAccount.balance &&
    amount <= 10000 &&
    receiverAccount?.username !== currentAccount.username
  ) {
    currentAccount.movments.push(-amount);
    currentAccount.movDates.push(new Date().toISOString());
    receiverAccount.movments.push(amount);
    receiverAccount.movDates.push(new Date().toISOString());
    //UPDATE UI
    updateUI(currentAccount);
  }
  transferTo.value = transferAmmount.value = "";
  transferAmmount.blur();
});

//REQUEST LOAN
requstLoan.addEventListener("click", (event) => {
  event.preventDefault();

  const amount = Math.floor(loanAmount.value);
  const o = currentAccount.movments.some((mov) => mov >= amount / 10);
  if (amount > 0 && o) {
    currentAccount.movments.push(amount);
    currentAccount.movDates.push(new Date().toISOString());
    updateUI(currentAccount);
  }
  loanAmount.value = "";
});

//DELETE ACCOUNT
removeAccConfirm.addEventListener("click", (event) => {
  event.preventDefault();
  if (
    currentAccount.username === removeAccUser.value &&
    currentAccount.pin === Number(removeAccPass.value)
  ) {
    const indexofAcc = accounts.findIndex(
      (arr) => arr.username === currentAccount.username
    );
    accounts.splice(indexofAcc, 1);
    containerapp.style.opacity = 0;
  }
  removeAccUser.value = removeAccPass.value = "";
});

//SORTING MOVMENTS
let sorted = false;
sortbtn.addEventListener("click", (event) => {
  event.preventDefault();
  movmentFunc(currentAccount, !sorted);
  sorted = !sorted;
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
