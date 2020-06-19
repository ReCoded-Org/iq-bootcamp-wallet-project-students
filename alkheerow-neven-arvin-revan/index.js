// Ahmed's section starts
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

// form.addEventListener('submit',addNewTransaction)

// function addNewTransaction(e){
// e.preventDefault()

// const transactionValue = {

//     transaction: transaction.value,
//     transactionNote: transactionNote.value,
//     transactionTag: transactionTag.value
// }

// ul.insertAdjacentHTML("beforeend",`
// <li class="list-group-item mt-5 mw-100" >
// <p class="d-flex float-right m-0" style="margin:0px padding: 0">${today.toLocaleString()}</p>
// <h2 class"">${transactionValue.transaction}</h2>
// <hr>
// <p>${transactionValue.transactionNote}</p>
// <p>${transactionValue.transactionTag}</p>

// </li>`)
 

// form.reset()

// }
//let transaction = transaction.value;


class Wallet {
    constructor(name, currency,balance, description, transactions) {
        this.name = name;
        this.currency= currency;
        this.balance = balance;
        this.description = description;
        this.transactions = transactions
    }
    

}

class Transaction {
    constructor ( id,date, tags, note){
        this.id=id;
        this.date = date;
        this.tags = tags;
        this.note = note;

    }
}
class Expense extends Transaction{

}
class Income extends Transaction{

}

class Currency {
    constructor(id, name, symbol){
        this.id = id;
        this.name = name;
        this.symbol = symbol;
    }
}
    


// ends of ahmed's section





// arvin start section
const noWallet = document.getElementById('no-wallet');
const crteateWallet = document.getElementById('crtWallet');
const modal = document.getElementsByClassName('modal')
const formAddBtn = document.querySelector('form')
const formSec = document.getElementById('section1');

document.addEventListener('DOMContentLoaded', load)
    
function load(){
    formSec.classList.add('hidden');
}
//local storage
const localStorageTransactions = JSON.parse(
    localStorage.getItem('transactions')
  );
  
  let transactions =
    localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

crteateWallet.addEventListener('click',function(){
    noWallet.classList.add('hidden'); 
    formSec.classList.remove('hidden') ;
    modal.remove();
})


form.addEventListener('submit',addNewTransaction)

function addNewTransaction(e){
e.preventDefault()

addTransaction(transaction)

updateLocalStorage()

form.reset()
}
function addTransaction(transaction){
    let addColor = valueTypeColor();
const transactionValue = {

    transaction: transaction.value,
    transactionNote: transactionNote.value,
    transactionTag: transactionTag.value
}
transactions.push(transactionValue);

ul.insertAdjacentHTML("beforeend",`
<li class="list-group-item mt-5 " >
<div>
<p class="d-flex float-right m-0" style="margin:0px padding: 0">${today.toLocaleString()}</p>
<h2  class="${addColor}">${transactionValue.transaction}</h2></div>
<p class="note">${transactionValue.transactionNote}</p>
<span class="tag">${transactionValue.transactionTag}</span>

</li>`)
currentMoney.innerText = `${transactionValue.transaction}`

}
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }


// arvin end section







// revan starts section


// revan end section 









// neven start section




// neven end section


