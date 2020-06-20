// Variables
const walletSelect = document.getElementById("wallet-select");
const emptyWalletSec = document.getElementById("empty-wallet-sec");
const prevWalletSec = document.getElementById("wallet-prev-sec");
const form = document.getElementById("walletForm");
const nameInput = document.getElementById("name-input");
const RadioUsd = document.getElementById("USDRadio");
const IQDRadio = document.getElementById("IQDRadio");
const balanceInput = document.getElementById("balance-input");
const descriptionInput = document.getElementById("descrption-input");
const balanceCheck = document.getElementById("balanceChecker");
let wallets = JSON.parse(localStorage.getItem("wallets")) || [];
let currentBalance;

// Functions
function init() {
  if (wallets.length === 0) {
    walletSelect.style.display = "none";
    prevWalletSec.style;
    emptyWalletSec.style.display = "block";
  } else {
    walletSelect.style.display = "block";
    emptyWalletSec.style.display = "none";
  }
  updateOptions();
}

function saveToLocalStorage() {
  localStorage.setItem("wallets", JSON.stringify(wallets));
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function submitForm(e) {
  e.preventDefault();
  CreateWalletInstance();
  saveToLocalStorage();
  init();
  $("#exampleModal").modal("hide");
  form.reset();
}
function CreateWalletInstance() {
  let newWalletInstance = new Wallet(
    nameInput.value,
    checkCurrency(),
    balanceInput.value,
    descriptionInput.value
  );
  wallets.push(newWalletInstance);
  renderBalance(newWalletInstance);
}
function updateOptions() {
  let options = document.querySelectorAll("option");
  for (let i = 1; i < options.length; i++) {
    options[i].remove();
  }
  for (const wallet of wallets) {
    walletSelect.insertAdjacentHTML(
      "beforeend",
      `
    <option value='${wallet.name}' > ${wallet.name}'s wallet</option>
    `
    );
  }
  if (wallets.length !== 0 && balanceCheck.innerText !== "No Wallet Selected") {
    walletSelect.value = wallets[wallets.length - 1].name;
  }
}

function renderBalance(walletObj) {
  const balanceAgain = document.getElementById("balance-again");
  let moneySign = document.getElementById("moneySign");

  balanceCheck.innerText = `Your Wallet Balance is: ${walletObj.currency} ${
    walletObj.balance
  }`;
  balanceAgain.innerText = `${walletObj.balance}`;
  moneySign.innerText = `${walletObj.currency}`;
  currentBalance = walletObj.balance;
}

function checkCurrency() {
  let radioText = "";
  if (RadioUsd.checked) {
    radioText = "$";
  } else {
    radioText = "IQD";
  }
  return radioText;
}
// Events
document.addEventListener("DOMContentLoaded", init);
form.addEventListener("submit", submitForm);
walletSelect.addEventListener("change", e => {
  for (let wallet of wallets) {
    if (e.target.value === wallet.name) {
      currentBalance = wallet.balance;
      renderBalance(wallet);
    }
  }
  hasTransactions();
});

// Transaction Variables
const transactionForm = document.getElementById("transaction-form");
const transactionAmount = document.getElementById("transactionAmount");
const incomeRadio = document.getElementById("income");
const expenseRadio = document.getElementById("expense");
const transactionNote = document.getElementById("transaction-note");
const transactionTag = document.getElementById("transaction-tag");
let transUl = document.getElementById("transactions");
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function createTransactionInstance() {
  let date = new Date();
  const Dateoptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  let transactionInstance = new Transaction(
    transactionAmount.value,
    checkTransaction(),
    transactionNote.value,
    transactionTag.value,
    date.toLocaleDateString(undefined, Dateoptions),
    date.toLocaleTimeString(),
    currentBalance
  );
  transactions.push(transactionInstance);
  drawTransaction(transactionInstance);
}

function drawTransaction(transObj) {
  let selectedColor =
    transObj.type === "income" ? "text-success" : "text-danger";
  let randColor = [
    "primary",
    "secondary",
    "danger",
    "warning",
    "success",
    "dark",
    "info"
  ];
  let tags = transObj.tag.split(" ");
  transUl.insertAdjacentHTML(
    "beforeend",
    `
  <li class='d-flex justify-content-between'> 
  <div>
  <h4 class=${selectedColor}> ${transObj.amount}</h4>
  <br>
  <span>${transObj.note} </span>
  <br>
  ${tags
    .map(
      tag =>
        `<span class="badge badge-${
          randColor[Math.floor(Math.random() * 6)]
        }">${tag}</span>`
    )
    .join("  ")} 
  </div>
  <div>
  <span>  ${transObj.date} | ${transObj.time}<span>
  </div>
  </li>
  <hr>
  `
  );
}
function hasTransactions() {
  while (transUl.firstChild) transUl.removeChild(transUl.firstChild);
  if (transactions.length !== 0) {
    for (const transaction of transactions) {
      if (transaction.balance === currentBalance) {
        drawTransaction(transaction);
      }
    }
  }
}

function checkTransaction() {
  let transactionType = "";
  if (incomeRadio.checked) {
    transactionType = "income";
  } else {
    transactionType = "expense";
  }
  return transactionType;
}

function transactionSubmit(e) {
  e.preventDefault();
  createTransactionInstance();
  saveToLocalStorage();
  transactionForm.reset();
}

transactionForm.addEventListener("submit", transactionSubmit);
document.addEventListener("DOMContentLoaded", e => {
  hasTransactions();
});
