

const WALLETS_KEY = 'Wallets';
const SELECTED_WALLET_KEY = 'Selected_Wallet';


// Shadan Start

const userName=document.getElementById('user-name')
const CurrencyGroup=document.querySelectorAll('input[name="CurrencyGroup"]')
const balance=document.getElementById('Balance-input')
const Description=document.getElementById('Desc-input')
const btnForm=document.getElementById("btnForm")

function RadioCheck(){
    let selectedValue;
    for(const val of CurrencyGroup){
        if(val.checked)
        {
            selectedValue=val.value;
        break;

        }
        
    }
    return selectedValue
}
function addWallet(userName,balance,Description){
  const userObj={
    userName:userName.vaue,
    balance:balance.value,
    Description:Description.value
  }
  createdWallets.push(userObj)
  localStorage.setItem('createdWallets', JSON.stringify(createdWallets));
  console.log(userObj)
}

btnForm.addEventListener('submit',(e)=>{
    e.preventDefault();
   const wallet =  Wallet(userName,new Currency(0,'Dollar','$'),balance,Description);

}); 






// Shadan End








// Hanan Start
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
let today = new Date()

form.addEventListener('submit', addNewTransaction)

function addNewTransaction(e) {
    e.preventDefault()

    const transactionValue = {

        transaction: transaction.value,
        transactionNote: transactionNote.value,
        transactionTag: transactionTag.value
    }

    ul.insertAdjacentHTML("beforeend", `
<li class="list-group-item">
<p class="d-flex float-right m-0" style="margin:0px padding: 0">${today.toLocaleString()}</p>
<h2>${transactionValue.transaction}</h2>
<p>${transactionValue.transactionNote}</p>
<p>${transactionValue.transactionTag}</p>
</li>`)

    form.reset()

}


// Hanan End




// https://getbootstrap.com/docs/4.0/components/modal/#events




// Qays Start

const wallets = Wallet.getWalletsLocalStorage();

const selectedWallet = Wallet.getSelectedWalletLocalStorage();
if (selectedWallet == null){
    //display no wallets 
}

class Wallet {
    constructor(name, currency, balance, description, transactions = []) {
        // this.id = id;
        this.name = name;
        this.currency = currency;
        this.balance = balance;
        this.description = description;
        this.transactions = transactions;
        this._addNewWallet();
    }

    _addNewWallet() {
        let wallets = Wallets.getWalletsLocalStorage();
        wallets = wallets == null ? [] : wallets;
        this.id = wallets.length;
        wallets.push({ walletKey: this._walletKey, name: this.name });
        Wallet.setWalletsLocalStorage(wallets);
        this._updateLocalStorage();
        Wallet.setSelectedWalletKeyLocalStorage(this);
    }

    addNewTransaction(type, amount, date, note, tags) {
        let transaction;
        if (type = 'expense') {
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
        _updateBalance(transaction);

    }



    _walletKey() {
        return `Wallet_${this.eid}`;
    }


    static getWalletsLocalStorage() {
        return JSON.parse(localStorage.getItem(WALLETS_KEY));
    }
    static setWalletsLocalStorage(wallets) {
        localStorage.setItem(WALLETS_KEY, JSON.stringify(wallets));
    }


    static getSelectedWalletLocalStorage() {
        const walletKey = JSON.parse(localStorage.getItem(SELECTED_WALLET_KEY));

        return JSON.parse(localStorage.getItem(walletKey));
    }
    static setSelectedWalletKeyLocalStorage(wallet) {
        localStorage.setItem(SELECTED_WALLET_KEY, JSON.stringify(wallet.walletKey));
    }


    static getWalletObjectFromLocalStorage(key) {
        return JSON.parse(localStorage.getItem(key))
    }


    _updateLocalStorage() {
        localStorage.setItem(_walletKey(), JSON.stringify(this));
    }


    _updateBalance(transaction) {
        this.balance = transaction.updateBalance(this.balance);

        transactions.push(transaction);
        _updateLocalStorage();

    }


    renderTransactions(ul) {
        ul.innerHTML='';
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
        this.tags = tags.spilt(' ');
    }
    amountColor;



    html() {
        const badges = tags.reduce((acc, tag) => acc + `<span class="badge badge-pill badge-dark">${tag}</span>`, '');
        //   <div class="dropdown-divider"></div>
        const event = new Date();
        const options = { weekday: 'short',  month: 'short', day: 'numeric',year: 'numeric', };

        console.log(event.toLocaleDateString('en-US', options));
        console.log(event.toLocaleTimeString('en-US',));

        return `<div class="row">
                    <div class="col">
                        <div class="row  justify-content-between">
                            <div class="col-4 text-${this.amountColor}">${this.amount}</div><div class="col-4">${this.date}</div>
                        </div>
                        <div class="row">${this.note}</div>
                        <div class="row">${badges}</div>
                    </div>
                </div>`;
    }




}
class Expense extends Transaction {
    amountColor = 'danger';
    updateBalance(balance) {
        return balance - amount;
    }
}

class Income extends Transaction {
    amountColor = 'success';
    updateBalance(balance) {
        return balance + amount;
    }
}

// console.log((new Income('nnnn') instanceof Expense));

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




