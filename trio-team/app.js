/*
1- create a class called wallet has the properties 
    name, startingBalance, currency, description, array of transactions(which each element is an object contains amount, type, date, tags and notes),
    and an unique id for each instance,
    and a method that calculates the total balance by iterating over the transactions of the insatnce.✅
2- an array to store all the instances of the class. ✅
3- a void function to store the array in the local storage. ✅
4- a void function to retrieve data from the local storage when the page is reloded. ✅
5- eventListeners for the buttons
6- a void function to insert the transaction to the DOM and modify the instance
7- a void function to add the names of the wallets to the dropdown in the navbar
8- a void function for creating a new wallet and pushing it to the array of wallets
*/


class Wallet{
    constructor(name, startingBalance, currency, description){
        this.name = name;
        this.startingBalance = parseInt(startingBalance);
        this.currency = currency;
        this.description = description;
        this.id = Math.floor(Math.random()*1000000);
    }
    totalBalance(){
        let total = 0;
        this.transactions.forEach(transaction => {
            if(transaction.type === 'income')
                total += transaction.amount;
            else
                total -= transaction.amount;
        })
        return this.startingBalance + total;
    };
    transactions = [];
}
let wallets = [];
const walletForm = document.getElementById("walletForm");
if(localStorage.length !==0){
    retrieveFromStorage()
}
if(wallets.length === 0){
    document.getElementsByClassName('wallet')[0].style.display = "none"
}
else{
    document.getElementsByClassName('empty')[0].style.display = "none"
    document.getElementById('toggle-btn').style.display = "none"
}
if(wallets.length === 0){
    document.getElementById('wallets-select').style.display = "none";
}
function storeToStorage(){
        const walletsString = JSON.stringify(wallets);
        localStorage.setItem("wallets", walletsString);
}

function retrieveFromStorage(){
        const walletsString = localStorage.getItem("wallets");
        wallets = JSON.parse(walletsString);
        wallets.forEach(wallet => {
            wallet.totalBalance = function(){
                let total = 0;
                this.transactions.forEach(transaction => {
                if(transaction.type === 'income')
                    total += parseInt(transaction.amount);
                else
                    total -= parseInt(transaction.amount);
        })
        return this.startingBalance + total;
            }
        })
}
function walletIndex(id){
        const index = wallets.findIndex(wallet => wallet.id === parseInt(id));
        return index;
}

function getWalletsNames(){
        wallets.forEach(wallet => {
            const name = wallet.name;
            const id = wallet.id;
            addWalletsToSelect(name, id);
        })
}
const walletsSelect = document.getElementById('wallets-select');
function addWalletsToSelect(name, id){
        walletsSelect.insertAdjacentHTML('beforeend',`
        <option id=${id} value=${name}>${name}</option>
        `)
}
  
getWalletsNames();
function addWallet(name, balance, currency, description){
        al = new Wallet(name, balance, currency, description)
        wallets.push(al);
        storeToStorage();
        location.reload()
}
walletForm.addEventListener('submit',(e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const iqd = document.getElementById('iqd');
        const usd = document.getElementById('usd');
        const balance = document.getElementById('balance').value;
        let currency;
        if(iqd.checked){
            currency = iqd.value;
        }
        else{
            currency = usd.value;
        }
        addWallet(name, balance, currency, description)
       
})
const options = document.querySelectorAll('option');
function getWallet(id){
    const index=walletIndex(id);
    const wallet =wallets[index];
    return wallet;
}


function updateTotalBalance(wallet){
    const balance=document.getElementById("total-balance")
    balance.innerHTML=`balance is ${wallet.totalBalance()}`
    const totalBalance = document.getElementById("balance-span");
    const currencySymbol = document.getElementById("currency-symbol");
    console.log(totalBalance)
    totalBalance.innerText = `${wallet.totalBalance()}`
    currencySymbol.innerText = wallet.currency 
}
const transactionList = document.getElementById('transactions-list');
function addTransactions(transactions){
    transactionList.innerHTML="";
    transactions.forEach(transaction => {
        let color;
        color = transaction.type === "income"? "green":"red"
        transactionList.insertAdjacentHTML('beforeend',`<li class="">
        <div class="d-flex flex-row justify-content-between">
            <h4 style="color : ${color}">${transaction.amount}</h4>
            <p>${new Date(transaction.date).toDateString()} ${new Date(transaction.date).toLocaleTimeString()}</p>
        </div>
        <div>${transaction.notes}</div>
        <div>
            <span class="label label-default">${transaction.tags}</span>
        </div>
    </li><hr>`)
    })
}
let curentWalletId;
options.forEach(option => option.addEventListener('click',(e) => {
    const walletId= e.target.id
    curentWalletId = walletId;
    const wallet = getWallet(walletId);
    console.log(wallet);
    addTransactions(wallet.transactions)
    updateTotalBalance(wallet);
}))

const transactionForm = document.getElementById('transaction-form');
transactionForm.addEventListener('submit', (e)=> {
    e.preventDefault()
    const amount = document.getElementById('amount');
    const notes = document.getElementById('notes');
    const tags = document.getElementById('tags');
    const inc = document.getElementById('income');
    const exp = document.getElementById('expense');
    let type;
    if(inc.checked){
        type = inc.value;
    }
    else{
        type = exp.value;
    }
    console.log(curentWalletId)
    let wallet = getWallet(curentWalletId);
    console.log(wallet);
    const transactionObj = {
        amount : amount.value,
        notes :notes.value,
        tags : tags.value,
        type : type,
        date: new Date()
    }
    wallet.transactions.push(transactionObj);
    storeToStorage();
    transactionForm.reset()
    addTransactions(wallet.transactions)
    updateTotalBalance(wallet);
})

function addInfo(){
    const wallet = wallets[0];
    console.log(wallet);
    updateTotalBalance(wallet);
    addTransactions(wallet.transactions);
}
addInfo();
