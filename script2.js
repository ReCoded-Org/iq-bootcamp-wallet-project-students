//window.onload = console.log(localStorage.getItem('name'));
let walletNames = [];
let newLi = {
    value: 0,
    type: "",
    note: "",
    tag: "",
    date: ""
}
const select = document.querySelector('#walletSelect');
const h1 = document.querySelector('#headerInfo');
const transAmount = document.querySelector('#transactionAmount');
const transBalance = document.querySelector('#transactionBalance');
const income = document.querySelector('#income');
let incomeAmount = document.querySelector('#makeTransaction');
const expense = document.querySelector('#expense');
const add = document.querySelector('#addTransaction');
let transactionNotes = document.querySelector('#transactionNote');
let transactionTags = document.querySelector('#transactionTags');
const ul = document.querySelector('#transactionList');

class Wallet {
    constructor(name = 0, currency = 0, balance = 0, desc = 0) {
        this.name = name;
        this.currency = currency;
        this.balance = balance;
        this.desc = desc;
    }

}
class Transaction {
    render(note, tag) {
        newLi.note = note.value;
        newLi.tag = tag.value;
        const li = document.createElement('li');
        if (newLi.type === "income")
            li.className = "list-group-item list-group-item-success btn-outline-success";
        else
            li.className = "list-group-item list-group-item-danger btn-outline-danger";
        li.innerHTML = `<div>
        <h2> ${newLi.value}</h2>` +
            `<p> ${newLi.note}</p>` +
            `<p> ${newLi.tag}</p></div>` +
            `<div> ${newLi.date}</div>`
        ul.appendChild(li);
    }

}
class Expense extends Wallet {

    constructor(name, currency, balance, desc, expenses) {
        super(name, currency, balance, desc);
        this.expenses = expenses;
    }
    addExpense(amount) {
        this.balance = parseInt(this.balance) - amount;
        newWallet.balance = this.balance;
        transBalance.innerText = this.balance;
        h1.innerText = this.name + " " + this.balance + this.currency;
        transBalance.innerText = this.balance;
        //JSON.parse(localStorage.setItem(this.name + "balance", this.balance))
    }
}

class Income extends Wallet {
    constructor(name, currency, balance, desc, income) {
        super(name, currency, balance, desc);
        this.income = income;
    }
    addIncome(amount) {
        this.balance = parseInt(this.balance) + amount;
        newWallet.balance = this.balance;
        transBalance.innerText = this.balance;
        h1.innerText = this.name + " " + this.balance + this.currency;
        transBalance.innerText = this.balance;
        //JSON.parse(localStorage.setItem(this.name + "balance", this.balance))
    }
}


let newWallet = new Wallet();
window.addEventListener('DOMContentLoaded', (event) => {
    //console.log('DOM fully loaded and parsed');
    let ls = top.localStorage,
        n = ls.length,
        i = 0, j = 0,
        key, value;

    console.log('There are ', n, 'items in the localStorage');

    for (; i < n; i++) {
        key = ls.key(i);
        value = ls.getItem(key);
        console.log('key: ', key, 'value:', value);
        if (key.substring(0, 6) === "wallet") {
            walletNames[j] = JSON.parse(localStorage.getItem(key));
            j++;
        }
    }
    console.log(walletNames)
    renderSelect(walletNames);

});

function renderSelect(Arr) {
    Arr.map(element => {
        const opt = document.createElement('option');
        opt.value = element;
        opt.innerText = element;
        select.appendChild(opt);
    })
}

select.addEventListener('change', () => {
    const walletName = select.options[select.selectedIndex].value;
    h1.innerText = `${walletName}` + " " + JSON.parse(localStorage.getItem(walletName + "balance")) + JSON.parse(localStorage.getItem(walletName + "currency"));
    newWallet = new Wallet(JSON.parse(localStorage.getItem(walletName + "name")), JSON.parse(localStorage.getItem(walletName + "currency")), JSON.parse(localStorage.getItem(walletName + "balance")), JSON.parse(localStorage.getItem(walletName + "desc")))
    //console.log('this is the new wallet value' + newWallet.name);
    transAmount.innerText = newWallet.currency;
    transBalance.innerText = newWallet.balance;

})

income.addEventListener('click', () => {
    incomeAmount = document.querySelector('#makeTransaction');
    if (incomeAmount.value == "")
        alert("Please insert an amount of Transaction first!!")
    let newIncomeValue = new Income(newWallet.name, newWallet.currency, newWallet.balance, newWallet.desc, parseInt(incomeAmount.value))
    newIncomeValue.addIncome(parseInt(incomeAmount.value));
    newLi.value = newIncomeValue.income;
    newLi.type = "income";
    //newLi.date = new Date();
})


expense.addEventListener('click', () => {
    incomeAmount = document.querySelector('#makeTransaction');
    if (incomeAmount.value == "")
        alert("Please insert an amount of Transaction first!!")
    let newExpenseValue = new Expense(newWallet.name, newWallet.currency, newWallet.balance, newWallet.desc, parseInt(incomeAmount.value))
    newExpenseValue.addExpense(parseInt(incomeAmount.value));
    newLi.value = newExpenseValue.expenses;
    newLi.type = "expense";
    //newLi.date = new Date();
})

add.addEventListener('click', () => {

    transactionNotes = document.querySelector('#transactionNote');
    transactionTags = document.querySelector('#transactionTags');
    newLi.date = () => {
        let date = new Date();
        option = { month: "long", day: "numeric", year: "numeric" };
        return (date.toLocaleDateString("en-US", option))
    }
    let newTransaction = new Transaction();
    newTransaction.render(transactionNotes, transactionTags);
})















