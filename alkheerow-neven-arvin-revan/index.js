// Ahmed's section start


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








// neven start section




// neven end section


