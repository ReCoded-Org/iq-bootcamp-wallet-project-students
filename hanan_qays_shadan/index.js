

const WALLETS_KEY = 'Wallets';
const SELECTED_WALLET_KEY = 'Selected_Wallet';

const nameInput = document.getElementById('user-name')
const CurrencyGroup = document.querySelectorAll('input[name="CurrencyGroup"]')
const balanceInput = document.getElementById('Balance-input')
const descriptionInput = document.getElementById('Desc-input');
const walletForm = document.getElementById("walletForm")
const btnDrop = document.getElementsByClassName('btnDrop')[0];
const dropdownMenu = document.getElementsByClassName('dropdown-menu')[0];
const noWalletHide = document.getElementById('no-wallet-hide')
const walletHide = document.getElementById('wallet-hide')


const form = document.getElementById("formName")
const transaction = document.getElementById('make-transaction')
const transactionNote = document.getElementById('transaction-note')
const transactionTag = document.getElementById('transaction-tag')
const ul = document.getElementById('ul-list')
const currentMoney = document.getElementById('current-money')
const currentSymbol = document.getElementById('current-symbol')
const currentNumber = document.getElementById('current-number')
const incomeButton = document.getElementById('income')
const expenseButton = document.getElementById('expense')
const today = new Date();

class Wallet {
    constructor(id, name, currency, balance, description, transactions = []) {
        this.id = id;
        this.name = name;
        this.currency = currency;
        this.balance = balance;
        this.description = description;
        this.transactions = transactions;
        if (id === null) this._addNewWallet();
    }

    _addNewWallet() {
        let wallets = Wallet.getWalletsLocalStorage();
        wallets = wallets == null ? [] : wallets;
        this.id = wallets.length;
        wallets.push({ walletKey: this.walletKey(), name: this.name });
        Wallet.setWalletsLocalStorage(wallets);
        this._updateLocalStorage();
        console.log();

        Wallet.setSelectedWalletKeyLocalStorage(wallets[this.id].walletKey);
    }

    addNewTransaction(transactionType, amount, date, note, tags) {
        let transaction;
        if (transactionType === 'expense') {
            transaction = new Expense(amount, date, note, tags);


        } else {
            transaction = new Income(amount, date, note, tags);

        }
     
        this._updateBalance(transaction);

    }



    walletKey() {
        return `Wallet_${this.id}`;
    }


    static getWalletsLocalStorage() {
        return JSON.parse(localStorage.getItem(WALLETS_KEY));
    }
    static setWalletsLocalStorage(wallets) {
        localStorage.setItem(WALLETS_KEY, JSON.stringify(wallets));
    }


    static getSelectedWalletLocalStorage() {
        const walletKey = JSON.parse(localStorage.getItem(SELECTED_WALLET_KEY));
        if (walletKey == null) return null;
        const walletInfo = JSON.parse(localStorage.getItem(walletKey));
        const transactions = walletInfo.transactions.map(e => {
            if (e.type === 'expense') return new Expense(e.amount, new Date(e.date), e.note, e.tags);
            if (e.type === 'income') return new Income(e.amount, new Date(e.date), e.note, e.tags);

        });
        const wallet = new Wallet(walletInfo.id, walletInfo.name, walletInfo.currency, walletInfo.balance, walletInfo.description, transactions);
        return wallet;
    }

    static setSelectedWalletKeyLocalStorage(walletKey) {
        console.log(walletKey);

        localStorage.setItem(SELECTED_WALLET_KEY, JSON.stringify(walletKey));
    }



    static getWalletObjectFromLocalStorage(key) {
        return JSON.parse(localStorage.getItem(key))
    }


    _updateLocalStorage() {
        localStorage.setItem(this.walletKey(), JSON.stringify(this));
    }


    _updateBalance(transaction) {
        this.balance = transaction.updateBalance(this.balance);

        this.transactions.push(transaction);
        this._updateLocalStorage();

    }


    renderTransactions(ul) {
        ul.innerHTML = '';
        this.transactions.forEach(transaction => ul.insertAdjacentHTML("beforeend", transaction.html()));
    }


}



class Currency {
    constructor(id, name, symbol) {
        this.id = id;
        this.name = name;
        this.symbol = symbol;

    }
}
class Transaction {
    constructor(amount, date, note = '', tags = '') {
        this.amount = amount;
        this.date = date;
        this.note = note;
        this.tags = Array.isArray(tags) ? tags : tags.split(',');
    }
    amountColor;



    html() {
        const badges = this.tags.reduce((acc, tag) => acc + ` <span class="badge badge-pill badge-dark">${tag}</span> `, '');

        const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', };

      
        const dateString = this.date.toLocaleDateString('en-US', options).replace(',', '').replace(',', '') + ' | ' + this.date.toLocaleTimeString('en-US',)

        return `<div class="list-group-item">
        <div class="col">
            <div>
                <div class="h2 text-${this.amountColor}">${this.amount}</div><div class="float-right">${dateString}</div>
            </div>
            <div class="">${this.note}</div>
            <p class="h5">${badges}</p>
        </div>
    </div>`;

    }




}
class Expense extends Transaction {
    amountColor = 'danger';
    type = 'expense';
    updateBalance(balance) {
        return balance - this.amount;
    }
}

class Income extends Transaction {
    amountColor = 'success';
    type = 'income';

    updateBalance(balance) {
        return balance + this.amount;
    }
}




let wallets;

let selectedWallet;
function reloadLocalStorage() {
    wallets = Wallet.getWalletsLocalStorage();
    console.log(wallets);

    selectedWallet = Wallet.getSelectedWalletLocalStorage();
    console.log(selectedWallet);

    if (selectedWallet != null) {
        noWalletHide.style.display = "none"
         walletHide.style.display = "block"
        currentMoney.innerText = selectedWallet.currency.symbol +" "+ selectedWallet.balance;
        currentSymbol.innerText = selectedWallet.currency.symbol;
        currentNumber.innerText = selectedWallet.balance;
        selectedWallet.renderTransactions(ul);
        btnDrop.innerText = selectedWallet.name + '\'s wallet'
    
        dropdownMenu.innerHTML = '';
        wallets.forEach(wallet => {
            if (wallet.walletKey != selectedWallet.walletKey())
                dropdownMenu.insertAdjacentHTML("beforeend", `<a class="dropdown-item" href="#" onclick="setSelectedWalletKeyLocalStorage('${wallet.walletKey}')">${wallet.name}</a>`);
        });
        dropdownMenu.insertAdjacentHTML("beforeend", `<div class="dropdown-divider"></div>`)
        dropdownMenu.insertAdjacentHTML("beforeend", ` <a class="dropdown-item" href="#" data-toggle="modal" data-target="#CreateWallet">Create wallet</a>`)


        
         
        


    } else {

        btnDrop.style.display = "none"
        walletHide.style.display = "none"
        console.log('show empty message and hide the form');

    }
}
reloadLocalStorage();
function setSelectedWalletKeyLocalStorage(walletKey) {
    Wallet.setSelectedWalletKeyLocalStorage(walletKey);
    reloadLocalStorage();
}

function getCurrency() {
    let selectedValue;
    for (const val of CurrencyGroup) {
        if (val.checked) {
            selectedValue = val.value;
            break;
        }
    }
    let currency ;
    switch (selectedValue) {
        case "Dollars":
             currency =new Currency(0, 'Dollar', '$');
            break;

        case "Dinars":
            currency =new Currency(1, 'Dinars', 'IQD');

            break;
    }


    return currency
}
function addWallet() {
    const name = nameInput.value;
    const balance = parseInt(balanceInput.value);
    const description = descriptionInput.value;

    const currency = getCurrency();
    const wallet = new Wallet(null, name, currency, balance, description);
    console.log(wallet);
    reloadLocalStorage();

}

walletForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('sduhfgsdghfgbsedhjgfbgsejdh');

    addWallet();
    walletForm.reset();

    $('#CreateWallet').modal('hide')

});



let transactionType = "income"

form.addEventListener('submit', addNewTransaction)

function addNewTransaction(e) {
    e.preventDefault()


    const amount = parseInt(transaction.value);
    const note = transactionNote.value;
    const tags = transactionTag.value;

    selectedWallet.addNewTransaction(transactionType, amount, today, note, tags);
    reloadLocalStorage();

    form.reset()

}


function selectTransactionType(type = 'income') {
    console.log(type);

    if (type ==='income'){
        console.log(type);

        incomeButton.classList.remove("btn-outline-success");
        incomeButton.classList.add("btn-success");

        expenseButton.classList.remove('btn-danger');
        expenseButton.classList.add('btn-outline-danger');

    } else {
        console.log(type);

        
        incomeButton.classList.add("btn-outline-success");
        incomeButton.classList.remove("btn-success");

        expenseButton.classList.add('btn-danger');
        expenseButton.classList.remove('btn-outline-danger');
    }

    transactionType = type
}
