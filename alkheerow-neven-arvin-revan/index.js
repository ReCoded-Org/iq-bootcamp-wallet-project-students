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
const ul = document.getElementById('ul-list');
const note = document.getElementById('transaction-note');
const tags = document.getElementById('transaction-tag');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const amount = document.getElementById('make-transaction');
const addTransaction = document.getElementById('add-transaction');
const balance = document.getElementById('current-money');
const form = document.getElementById('formName');


const localStorageTransactions = JSON.parse(
    localStorage.getItem('transactions')
  );
  
  let transactions =
    localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

    class Transaction {
        constructor ( id,date,amount, tags, note){
            this.id=id;
            this.date = date;
            this.tags = tags;
            this.note = note;
            this.amount = amount;
        }
     addtransaction(e){
            e.preventDefault();
         if (this.note.value.trim() === '' || this.amount.value.trim() === '' || this.tags.value.trim() === '') {
              alert('Please add a note ,tage ans amount!');
         }
         else {
           const transaction = {
               note: this.note.value,
               amount: +this.amount.value,
               tags:this.tags.value
             };
    
        transactions.push(transaction);
    
        addTransactionDOM(transaction);
    
        updateLocalStorage();
    
        this.note.value = '';
        this.amount.value = '';
        this.tags.value ='';
        }
         }
     addTransactionDOM(transaction){
            const li = document.createElement('li');
            li.innerHTML = `
            ${Math.abs(transaction.amount)} <span>${
            transaction.transNote}</span> <p>${transaction.transTag} </p>
          `;
        
          ul.appendChild(li);
     }
     amountValues() {
        const amounts = transactions.map(transaction => transaction.amount);
      
        const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
      
        balance.innerText = `$${total}`;
      }
     
       updateLocalStorage() {
        localStorage.setItem('transactions', JSON.stringify(transactions));
      }
    }

form.addEventListener('submit', addTransaction)


class Income extends Transaction{
    income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
}
class Expense extends Transaction{
     expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1)
}


// arvin end section







// revan starts section


// revan end section 









// neven start section




// neven end section


