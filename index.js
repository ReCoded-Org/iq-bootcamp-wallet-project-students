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

  get history() {
    return this.transactions.list;
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

const createWallet = document.querySelector('#create-wallet-btn');
createWallet.addEventListener('click', popUpWallet);

function popUpWallet(e) {
  addCurrencyOptions(
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
}

function addCurrencyOptions(currencies) {

  const currencyOptions = document.querySelector('#currency-options');
  if (!currencyOptions) {
    console.error('could not find node with id currency-options');
    return;
  }

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
}