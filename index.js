class Wallet {
  constructor(name, description = '', balance = 0) {
    this.name = name;
    this.description = description;
    this.balance = balance;
    this.transactions = new Transactions();
  }

  makeTransaction(amount, note = '', tag = '') {
    this.balance += amount;
    this.transactions.add(new Transaction(amount, note, tag));
  }
}

class Transaction {
  constructor(amount, note, tag) {
    this.amount = amount;
    this.note = note;
    this.tag = tag;
    this.date = Date.now(); // how to format: https://stackoverflow.com/a/30158598
  }
}

class Transactions {
  constructor() {
    this.list = [];
  }

  add(transaction) {
    this.list.push(transaction);
  }
}

const createWallet = document.querySelector('#create-wallet');
createWallet.addEventListener('click', popUpWallet);

function popUpWallet(e) {
  const pop = document.createElement('div');
  pop.classList.add('pop-up');

  const header = createPopUpHeader();

  const form = createPopUpForm(
    [{
        name: 'US Dollars',
        symbol: '$',
      },
      {
        name: 'Iraqi Dinars',
        symbol: 'IQD',
      },
    ]
  );

  const footer = createPopUpFooter();

  pop.append(header, form, footer);
  document.body.append(pop);
}

function createPopUpHeader() {
  const header = document.createElement('header');
  header.classList.add('pop-header');

  const title = document.createElement('span');
  title.innerText = 'Create new wallet';

  const closeBtnHdr = document.createElement('span');
  closeBtnHdr.innerText = 'x';

  header.append(title, closeBtnHdr);
  return header;
}

function createPopUpForm(currencies) {
  const form = document.createElement('form');
  form.id = 'create-wallet-form'

  const name = document.createElement('input');
  name.type = 'text';
  name.name = 'name';
  name.id = 'name';
  name.placeholder = 'John Doe';

  const nameLabel = document.createElement('label');
  nameLabel.htmlFor = name.id;
  nameLabel.innerText = 'Name';

  const currencyOptions = document.createElement('span');
  currencyOptions.id = 'currency-options';

  const currencyLabel = document.createElement('label');
  currencyLabel.htmlFor = currencyOptions.id;
  currencyLabel.innerText = 'Currency';

  currencies.forEach(currency => {
    const currencyOption = document.createElement('input');
    currencyOption.type = 'radio';
    currencyOption.name = 'currency';
    currencyOption.id = currency.name.toLowerCase()
      .replaceAll(' ', '-');

    const currencyLabel = document.createElement('label');
    currencyLabel.htmlFor = currencyOption.id;
    currencyLabel.innerText = `${currency.name} (${currency.symbol})`;

    currencyOptions.append(currencyOption, currencyLabel);
  });

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

  form.append(nameLabel, name, currencyLabel, currencyOptions, balanceLabel, balance, descLabel, description);
  return form;
}

function createPopUpFooter() {
  const footer = document.createElement('footer');

  const closeBtnFtr = document.createElement('button');
  closeBtnFtr.innerText = 'Close';
  closeBtnFtr.style.backgroundColor = 'gray';

  const createWalletFtr = document.createElement('input');
  createWalletFtr.type = 'submit';
  createWalletFtr.form = 'create-wallet-form';
  createWalletFtr.value = 'Create Wallet';

  footer.append(closeBtnFtr, createWalletFtr);
  return footer;
}