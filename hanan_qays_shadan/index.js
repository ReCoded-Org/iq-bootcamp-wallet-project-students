

const WALLETS_KEY = 'Wallets';


// Shadan Start







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

form.addEventListener('submit',addNewTransaction)

function addNewTransaction(e){
e.preventDefault()

const transactionValue = {

    transaction: transaction.value,
    transactionNote: transactionNote.value,
    transactionTag: transactionTag.value
}

ul.insertAdjacentHTML("beforeend",`
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

class Wallet {
    constructor(id, name, currency, balance, description, transactions = []) {
        this.id = id;
        this.name = name;
        this.currency = currency;
        this.balance = balance;
        this.description = description;
        this.transactions = transactions;

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
    constructor(amount, date, note, tags = []) {
        this.amount = amount;
        this.date = date;
        this.note = note;
        this.tags = tags;
    }
    amountColor;



    html() {
        /* <span class="badge badge-pill badge-dark">Dark</span> */
        const badges = '';
    //   <div class="dropdown-divider"></div>

// .list-group-flush
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
}

class Income extends Transaction {
    amountColor = 'success';

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




