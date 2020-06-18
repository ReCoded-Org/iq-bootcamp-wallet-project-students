

const WALLETS_KEY = 'Wallets';
const SELECTED_WALLET_KEY = 'Selected_Wallet';



const nameInput = document.getElementById('user-name')
const CurrencyGroup = document.querySelectorAll('input[name="CurrencyGroup"]')
const balanceInput = document.getElementById('Balance-input')
const descriptionInput = document.getElementById('Desc-input');
const walletForm = document.getElementById("walletForm")





const form = document.getElementById("formName")
const transaction = document.getElementById('make-transaction')
const transactionNote = document.getElementById('transaction-note')
const transactionTag = document.getElementById('transaction-tag')
const ul = document.getElementById('ul-list')
const currentMoney = document.getElementById('current-money')
const currentSymbol = document.getElementById('current-symbol')
const currentNumber = document.getElementById('current-number')
const income = document.getElementById('income')
const expense = document.getElementById('expense')
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
        wallets.push({ walletKey: this._walletKey(), name: this.name });
        Wallet.setWalletsLocalStorage(wallets);
        this._updateLocalStorage();
        console.log();

        Wallet.setSelectedWalletKeyLocalStorage(wallets[this.id]);
    }

    addNewTransaction(type, amount, date, note, tags) {
        let transaction;
        if (type === 'expense') {
            transaction = new Expense(amount, date, note, tags);

        } else {
            transaction = new Income(amount, date, note, tags);

        }
        // switch (type) {
        //     case 'expense':
        //         transaction = new Expense(amount, date, note, tags);
        //         break;
        //         case 'income':
        //             transaction = new Income(amount, date, note, tags);

        //             break;
        // }
        this._updateBalance(transaction);

    }



    _walletKey() {
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
    static setSelectedWalletKeyLocalStorage(wallet) {
        localStorage.setItem(SELECTED_WALLET_KEY, JSON.stringify(wallet.walletKey));
    }


    static getWalletObjectFromLocalStorage(key) {
        return JSON.parse(localStorage.getItem(key))
    }


    _updateLocalStorage() {
        localStorage.setItem(this._walletKey(), JSON.stringify(this));
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
        const badges = this.tags.reduce((acc, tag) => acc + `<span class="badge badge-pill badge-dark">${tag}</span>`, '');
        //   <div class="dropdown-divider"></div>

        const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', };

        // console.log(event.toLocaleDateString('en-US', options));
        // console.log(event.toLocaleTimeString('en-US',));
        // console.log(this.date.toLocaleDateString('en-US', options).replace(',','').replace(',','') +' | '+event.toLocaleTimeString('en-US',) );
        console.log(this.date);

        const dateString = this.date.toLocaleDateString('en-US', options).replace(',', '').replace(',', '') + ' | ' + this.date.toLocaleTimeString('en-US',)

        return `<div class="list-group-item">
                    <div class="col">
                        <div class="row  justify-content-between">
                            <div class="text-${this.amountColor}">${this.amount}</div><div class=>${dateString}</div>
                        </div>
                        <div class="">${this.note}</div>
                        <div class="">${badges}</div>
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

// console.log((new Income('nnnn') instanceof Expense));



let wallets;

let selectedWallet;
function reloadLocalStorage() {
    wallets = Wallet.getWalletsLocalStorage();
    console.log(wallets);

    selectedWallet = Wallet.getSelectedWalletLocalStorage();
    console.log(selectedWallet);

    if (selectedWallet != null) {
        //display no wallets 
        console.log('hide empty message');
        //display balncae and curreny and form
        currentMoney.innerText = selectedWallet.currency.symbol + selectedWallet.balance;
        currentSymbol.innerText = selectedWallet.currency.symbol;
        currentNumber.innerText = selectedWallet.balance;
        selectedWallet.renderTransactions(ul);


        // Wallet.getWalletsLocalStorage()
        // [{name:'dsgfusgf',walletKey:'wallet_0'}]



        // Wallet.setSelectedWalletKeyLocalStorage(walletKey)


    } else {


        console.log('show empty message and hide the form');

    }
}
reloadLocalStorage();

// Qays End





// Objects
//                                            String Object   number  string
// Wallet     properties  "id random number"  Name   Currency Balance Description transactions
// set balance(updateBalance)=> this.balance = updateBalance(balance);
//             ^this is a method form transaction
// addNewTransaction(transaction) 
// read from localStorage()=>Wallets List 
/////////////// read all transactionsForWalletFromStorage()=> listOfTransaction
// renderTransactions(ul from Dom)=> change the dom 

// Transaction  properties  amount  Date() date note tags  
// renderTransaction()=> html  except the price text


// Expense    extends Transaction   -  
// method updateBalance function(balance) => newBalance 
// super.renderTransaction() renderTransaction() only the price text


// Income      extends Transaction   +
// method updateBalance function(balance) => newBalance 
// super.renderTransaction() renderTransaction() only the price text



// Currency    properties id name symbol 





// Shadan Start


function RadioCheck() {
    let selectedValue;
    for (const val of CurrencyGroup) {
        if (val.checked) {
            selectedValue = val.value;
            break;

        }

    }
    return selectedValue
}
function addWallet() {
    const name = nameInput.value;
    const balance = parseInt(balanceInput.value);
    const description = descriptionInput.value;


    const wallet = new Wallet(null, name, new Currency(0, 'Dollar', '$'), balance, description);
    console.log(wallet);
    reloadLocalStorage();

}

walletForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('sduhfgsdghfgbsedhjgfbgsejdh');

    addWallet();

});






// Shadan End








// Hanan Start


form.addEventListener('submit', addNewTransaction)

function addNewTransaction(e) {
    e.preventDefault()


    const amount = parseInt(transaction.value);
    const note = transactionNote.value;
    const tags = transactionTag.value;
    console.log(selectedWallet);
    // 'expense'   or 'income'

    selectedWallet.addNewTransaction('expense', amount, today, note, tags);
    selectedWallet.renderTransactions(ul);

    form.reset()

}


// Hanan End




// https://getbootstrap.com/docs/4.0/components/modal/#events



// Qays Start


