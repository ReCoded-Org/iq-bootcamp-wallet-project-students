

class Wallet {
    constructor(id, name, currency, balance, description, transactions = []) {
        this.id = id;
        this.name = name;
        this.currency = currency;
        this.balance = balance;
        this.description = description;
        this.transactions = transactions;
    }

    addNewTransaction(transaction) {
        this.transactions.push(transaction);

        if (transaction.type === 'expense') {
            this.balance = this.balance - transaction.amount;

        } else {
            this.balance = this.balance + transaction.amount;

        }

        console.log(transaction);
        console.log(this);
    }



}



class Transaction {
    constructor(amount, date, tags, note) {
        // this.id = id;
        this.amount = amount;
        this.date = date;
        this.tags = tags;
        this.note = note;

    }


}



class Expense extends Transaction {
    type = 'expense';
    textColor ='danger';


}
class Income extends Transaction {
    type = 'income';
    textColor = "success";

}


class Currency {
    constructor(id, name, symbol) {
        this.id = id;
        this.name = name;
        this.symbol = symbol;
    }
}



const addDataModal = document.getElementById('addData');
const noWalletScreen = document.getElementById("no-wallet-screen");
const walletScreen = document.getElementById("wallet-screen");


const balanceOutput = document.getElementById("balance-output");
const transationsList = document.getElementById("transations-list");


const walletForm = document.getElementById("wallet-form");
const nameInput = document.getElementById("name");
const balanceInput = document.getElementById("balance");
const descriptionInput = document.getElementById("description");
const dollarCurrency = document.getElementById('dollar-currency')
const dinarCurrency = document.getElementById('dinar-currency')

const transactionForm = document.getElementById("transaction-form");
const balanceNumberOutput = document.getElementById("balance-number");
const balanceSymbolOutput = document.getElementById("balance-symbol");
const amountInput = document.getElementById("amount");
const noteInput = document.getElementById("note");
const tagsInput = document.getElementById("tags");

let walletListSelector = document.getElementById("wallet-selector")



let selectedWallet;

let walletList = [];

walletForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const id = walletList.length;
    const name = nameInput.value;
    // const currency = new Currency(0, 'Dollar', '$');
    const currency = selectedCurrency();
    const balance = parseInt(balanceInput.value);
    const description = descriptionInput.value;

    selectedWallet = new Wallet(id, name, currency, balance, description);
    updateWalletInfo();


    walletList.push(selectedWallet);
    updateWalletList();
    saveToLocalStorage();
    hideModalWalletForm();
    console.log("wallet list " + walletList);

    console.log(selectedWallet);

    walletForm.reset();
});



transactionForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const typeRadio = document.querySelector('input[name="type"]:checked');

    const amount = parseInt(amountInput.value);
    const transactionType = typeRadio.value;

    const date = new Date();
    const tags = tagsInput.value;
    const note = noteInput.value;


    let transaction;

    if (transactionType === 'expense') {
        transaction = new Expense(amount, date, tags, note);
    } else {
        transaction = new Income(amount, date, tags, note);
    }

    selectedWallet.addNewTransaction(transaction);

    updateWalletInfo();
    saveToLocalStorage();

    transactionForm.reset();

});


function updateWalletInfo() {
    balanceOutput.innerText = selectedWallet.currency.symbol + ' ' + selectedWallet.balance;
    balanceNumberOutput.innerText = selectedWallet.balance;
    balanceSymbolOutput.innerText = selectedWallet.currency.symbol;
    transationsList.innerHTML = '';


   const dateOptions =  {
        hour: 'numeric', 
        minute: 'numeric', 
        second: 'numeric',
        month : 'short',
        day : 'numeric',
        year : 'numeric'
    }


    const transactionsHTML = selectedWallet.transactions.map(transaction => {

        const listofTagsHtml = transaction.tags.split(',').map(tag=>{
            return  `<span class="badge badge-pill badge-dark">${tag}</span>` 
        }).join(' ');
        const dateString= transaction.date.toLocaleDateString('en-US', dateOptions);
            return `    <li class="list-group-item">
                            <div class="float-left ">
                                <h2 class="text-${transaction.textColor}">${transaction.amount}</h2>
                                <div>${transaction.note}</div>
                                <div>${listofTagsHtml}</div>

                            </div>
                            <div class="float-right text-center " >${dateString}</div>
                        </li>`;
    });

    transationsList.innerHTML = transactionsHTML.join(' ');
}

function updateWalletList() {
    walletListSelector.innerHTML = '';

    const walletsHTML = walletList.map(wallet => {

        return `
        <option value="${wallet.id}">${wallet.name}</option>
        `;
    });

    walletListSelector.innerHTML = walletsHTML.join(' ') +
        '<option value="createNew" data-toggle="modal" data-target="#addData">create new Wallet</option>';

    changeScreen();


}
walletListSelector.addEventListener('change', function () {
    const value = walletListSelector.value;
    console.log(value);

    if (value === 'createNew') {
        createNewWallet();
        return;
    }
    const selectedId = parseInt(value);
    selectedWallet = walletList[selectedId];
    updateWalletInfo();

});

function createNewWallet() {
    $('#addData').modal('show');

}
function hideModalWalletForm() {
    $('#addData').modal('hide');

}


function saveToLocalStorage() {
    localStorage.setItem('wallets', JSON.stringify(walletList));
}

function changeScreen() {
    if (walletList.length != 0) {
        noWalletScreen.style.display = "none";
        walletScreen.style.display = "block";
        walletListSelector.style.display = "block";
    } else {


        noWalletScreen.style.display = "block";
        walletScreen.style.display = "none";
        walletListSelector.style.display = "none";

    }
}
changeScreen();



const localValue = JSON.parse(localStorage.getItem('wallets'));
walletList = localValue == null ? [] : localValue;
if (localValue != null) {
    console.log(walletList);

    walletList = walletList.map((wallet) => {
        const transactions = wallet.transactions.map(transaction => {
            if (transaction.type === 'income')             return new Income(transaction.amount, new Date(transaction.date), transaction.tags, transaction.note);

            if (transaction.type === 'expense')            return new Expense(transaction.amount, new Date(transaction.date), transaction.tags, transaction.note);


        });
        return new Wallet(wallet.id, wallet.name, wallet.currency, wallet.balance, wallet.description, transactions);
    });
    console.log(walletList);

    selectedWallet = walletList[0];
    updateWalletList();
    updateWalletInfo();
}


$('#addData').on('hidden.bs.modal', function (e) {
    console.log('hide');
    const value = walletListSelector.value;
    console.log(value);

    if (value === 'createNew') {
        walletListSelector.value = selectedWallet.id;
        return;
    }

});

function selectedCurrency() {
    const currencyTypeRadio = document.querySelector('input[name="currency"]:checked');

    if (currencyTypeRadio.value ==="dollar") {
        return new Currency(0, 'Dollar', '$') 
    }else{
        return new Currency(0, 'Dinar', 'IQD')
    }
}

