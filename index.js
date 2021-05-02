class Wallet {
  constructor(name, description = "", balance = 0, currency) {
    this.name = name;
    this.description = description;
    this.balance = balance;
    this.transactions = new Transactions();
    this.currency = currency;
  }​
  makeTransaction(amount, note = "", tag = []) {
    this.balance = this.balance + amount;
    this.transactions.add(new Transaction(amount, note, tag));
  }​
  get history() {
    return this.transactions.list;
  }
}​
class Wallets {
  constructor() {
    this.all = [];
    this.current;
  }​
  add(wallet) {
    this.all.push(wallet);
    this.current = wallet;
  }​
  changeCurrent(name) {
    this.all.forEach((wallet) => {
      if (wallet.name === name) this.current = wallet;
    });
  }
}​
class Transaction {
  constructor(amount, note, tag) {
    this.amount = amount;
    this.note = note;
    this.tag = tag;
    this.date = Date.now(); // how to format: https://stackoverflow.com/a/30158598
  }
}​
class Transactions {
  constructor() {
    this.list = [];
  }​
  add(transaction) {
    this.list.push(transaction);
  }
}​
const wallets = new Wallets();
const popUp = document.getElementById("pop-up");
const popAfter = document.getElementById("pop-After");​
const createWalletBtn = document.getElementById("create-wallet-Btn");
createWalletBtn.addEventListener("click", () => {
  popUp.style.display = "block";
  popAfter.style.display = "block";
});​
const closeWalletBtn = document.getElementById("close-Wallet-Btn");
closeWalletBtn.addEventListener("click", () => {
  popUp.style.display = "none";
  popAfter.style.display = "none";
});​
const submitWallet = document.getElementById("submit-wallet");
const noWalletView = document.getElementById("no-wallet-view");
const walletView = document.getElementById("wallet-view");
const balanceInput = document.getElementById("balance");
const walletBalance = document.getElementById("wallet-balance");
const mainHeader = document.getElementById("main-header");
const nameInput = document.getElementById("name");​​​
popUp.addEventListener("submit", (event) => {
  event.preventDefault();​
  let formData = new FormData(event.target);​
  const name = formData.get("name");
  const currency = formData.get("currency");
  const balance = parseInt(formData.get("balance"));
  const description = formData.get("description");​
  const userWallet = new Wallet(name, description, balance, currency);
  wallets.add(userWallet);​
  showWallet();
  showHistory();
});​
function showWallet() {
  noWalletView.style.display = "none";
  popAfter.style.display = "none";
  popUp.style.display = "none";
  walletView.style.display = "block";

  walletBalance.innerText = wallets.current.currency + " " + wallets.current.balance;​
  populateSelectWallet();

  const selectWallet = document.querySelector("#select-wallet")
  selectWallet.removeAttribute("hidden")
}​
const historyList = document.querySelector("#history-list");
const addTransaction = document.querySelector("#wallet-view");​
addTransaction.addEventListener("submit", (event) => {
  event.preventDefault();
  let formData = new FormData(event.target);​
  const amount = formData.get("amount");
  const incomeExpense = formData.get("income-expense");
  const notes = formData.get("notes");
  const tags = formData.get("tags")
    .split(", ");​
  wallets.current.makeTransaction(
    parseInt(incomeExpense + amount),
    notes,
    tags
  );​
  walletBalance.innerText = wallets.current.currency + " " + wallets.current.balance;​
  showHistory();
});​
function showHistory() {
  historyList.innerHTML = "";
  wallets.current.history.forEach((record) => {
    const liList = document.createElement("li");
    historyList.append(liList);
    liList.className = "liList";

    const pList = document.createElement("p");
    pList.className = "pList";
    if (record.amount >= 0) {
      pList.innerText = record.amount;
      pList.style.color = "green";
    } else if (record.amount < 0) {
      pList.innerText = record.amount * -1;
      pList.style.color = "red";
    }

    const span = document.createElement("span");
    span.className = "spanList";
    const newDate = new Date(record.date)
    span.innerText = newDate.toDateString() + " | " + newDate.toLocaleTimeString();

    const noteDiv = document.createElement("p");
    noteDiv.className = "noteDiv"
    noteDiv.innerText = record.note;​
    const tagsInput = document.createElement("span")
    record.tag.forEach(tag => {
      const tagSpan = document.createElement('span')
      tagSpan.className = "tagDiv"
      tagSpan.innerText = tag
      tagsInput.append(tagSpan)
    });​
    liList.append(pList, span, noteDiv, tagsInput);​
  });
}​
function populateSelectWallet() {
  const select = document.querySelector('#select-wallet');
  select.innerHTML = '';

  wallets.all.forEach(wallet => {
    const option = document.createElement('option');
    option.innerText = wallet.name + "'s Wallet";
    option.value = wallet.name;
    if (wallet === wallets.current)
      option.selected = true;

    select.append(option);
  });​
  const createOption = document.createElement('option');
  createOption.innerText = 'Create Wallet';
  createOption.value = 'create-wallet';
  select.append(createOption);
}
const selectWallet = document.querySelector("#select-wallet");
selectWallet.addEventListener("change", (event) => {
  const selected = event.target.value;
  if (selected === 'create-wallet') {
    popAfter.style.display = "block";
    popUp.style.display = "block";
    return;
  }​
  if (selected !== wallets.current.name) {
    wallets.changeCurrent(selected);
    showWallet();
    showHistory();
  }
})