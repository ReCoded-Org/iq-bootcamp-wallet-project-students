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
let transactionForm = document.getElementById("transaction-form");
let wallets = JSON.parse(localStorage.getItem("wallets")) || [];

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
  if (wallets.length !== 0) {
    walletSelect.value = wallets[wallets.length - 1].name;
  }
}

function renderBalance(wallet) {
  balanceCheck.innerText = `Your Wallet Balance is: ${wallet.currency} ${
    wallet.balance
  }`;
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
