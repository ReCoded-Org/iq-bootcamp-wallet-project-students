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




// arvin end section







// revan starts section


// revan end section 









// neven start section




// neven end section


