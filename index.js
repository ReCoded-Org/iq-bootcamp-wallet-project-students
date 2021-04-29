class Wallet {
  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.balance = 0;
    this.transactions = new Transactions();
  }

  // makeTransaction()
}

class Transaction {
  constructor(amount, note) {
    this.amount = amount;
    this.note = note;
    this.tag = '';
    this.date = Date.now();
  }
}

class Transactions {
  constructor() {
    this.list = [];
  }
}

const createWallet = document.querySelector('#create-wallet');
createWallet.addEventListener('click', popUpWallet);

function popUpWallet(e) {
  const pop = document.createElement('div');
  pop.classList.add('pop-up');

  //make header
  const hdr = document.createElement('header');
  pop.classList.add('pop-header');

  const title = document.createElement('span');
  title.innerText = 'Create new wallet';

  const closeBtnHdr = document.createElement('span');
  closeBtnHdr.innerText = 'x';

  hdr.append(title, closeBtnHdr);

  // make form
  const form = document.createElement('form');
  form.id = 'create-wallet-form'
  // give class

  const name = document.createElement('input');
  name.type = 'text';
  name.name = 'name';
  name.id = 'name';
  name.placeholder = 'John Doe';

  const nameLabel = document.createElement('label');
  nameLabel.htmlFor = 'name';
  nameLabel.innerText = 'Name';

  const usCurr = document.createElement('input');
  usCurr.type = 'radio';
  usCurr.name = 'currency';
  usCurr.id = 'usCurr';

  const usLabel = document.createElement('label');
  usLabel.htmlFor = 'usCurr';
  usLabel.innerText = 'US Dollars ($)';

  const iqCurr = document.createElement('input');
  iqCurr.type = 'radio';
  iqCurr.name = 'currency';
  iqCurr.id = 'iqCurr';

  const iqLabel = document.createElement('label');
  iqLabel.htmlFor = 'iqCurr';
  iqLabel.innerText = 'Iraqi Dinars (IQD)';

  const currency = document.createElement('span');
  currency.id = 'currency';
  currency.append(usCurr, usLabel, iqCurr, iqLabel);

  const currencyLabel = document.createElement('label');
  currencyLabel.htmlFor = 'currency';
  currencyLabel.innerText = 'Currency';

  const balance = document.createElement('input');
  balance.type = 'number';
  balance.placeholder = '0';
  balance.min = 0;
  balance.name = 'balance';
  balance.id = 'balance';

  const balanceLabel = document.createElement('label');
  balanceLabel.htmlFor = 'balance';
  balanceLabel.innerText = 'Balance';

  const description = document.createElement('input');
  description.type = 'text';
  description.name = 'description';
  description.id = 'description';
  description.placeholder = 'eg. my bank account';

  const descLabel = document.createElement('label');
  descLabel.htmlFor = 'description';
  descLabel.innerText = 'Description';

  form.append(nameLabel, name, currencyLabel, currency, balanceLabel, balance, descLabel, description);

  // create footer

  const footer = document.createElement('footer');

  const closeBtnFtr = document.createElement('button');
  closeBtnFtr.innerText = 'Close';
  closeBtnFtr.style.backgroundColor = 'gray';

  const createWalletFtr = document.createElement('input');
  createWalletFtr.type = 'submit';
  createWalletFtr.form = 'create-wallet-form';
  createWalletFtr.value = 'Create Wallet';

  footer.append(closeBtnFtr, createWalletFtr);

  pop.append(hdr, form, footer);
  document.body.append(pop);
}