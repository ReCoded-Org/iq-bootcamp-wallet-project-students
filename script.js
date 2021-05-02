// Get DOM Elements
const modal = document.querySelector('#my-modal');
const modalBtn = document.querySelector('#mainCreateButton');
const selectorCreateButton = document.getElementById("selectorCreateButton");
const closeBtn = document.querySelector('.close');
let modalOpen = false;

// Events
modalBtn.addEventListener('click', openModal);
selectorCreateButton.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

// Open
function openModal() {
    modal.style.visibility = 'visible';
    modalOpen = true;
}

// Close
function closeModal() {
    modal.style.visibility = 'hidden';
}

// Close If Outside Click
function outsideClick(e) {
    if (e.target == modal) {
        modal.style.visibility = 'hidden';
    }
}

const modalCloseButton = document.querySelector("#modalCloseButton");
modalCloseButton.addEventListener('click', closeModal);

class Wallet {
    constructor(name, currency, balance, description) {
        this.name = name;
        this.currency = currency;
        this.balance = balance;
        this.description = description;
    }
}

class Wallets {
    constructor() {
        this.wallets = [];
    }

    allWallets() {
        return this.wallets;
    }

    addWallet(name, currency, balance, description) {
        let newWallet = new Wallet(name, currency, balance, description);
        this.wallets.push(newWallet);
    }
}

class Transaction {
    constructor(title, notes, tags) {
        this.title = title;
        this.notes = notes;
        this.tags = tags;
    }
}

class Transactions {
    constructor() {
        this.transactions = [];
    }

    allTransactions() {
        return this.transactions;
    }

    addTransaction(title, notes, tags) {
        let newTransaction = new Transaction(title, notes, tags);
        this.transactions.push(newTransaction);
    }
}

let walletList = new Wallets();

const accountNames = document.getElementById("accountNames")
const modalCreateButton = document.getElementById("modalCreateButton")
const nameInput = document.getElementById("nameInput");
const USDollar = document.getElementById("USDollar");
const IQDinar = document.getElementById("IQDinar");
const balanceInput = document.getElementById("balanceInput");
const descriptionInput = document.getElementById("descriptionInput");
const mainPage = document.getElementById("mainPage");
const walletPage = document.getElementById("walletPage");
const transactionList = document.getElementById("transactionList");

let currency = "USD";
USDollar.addEventListener("click", currencyDollar);

function currencyDollar() {
    currency = "USD";
}
IQDinar.addEventListener("click", currencyDinar);

function currencyDinar() {
    currency = "IQD";
}

const createWallet = () => {

    // To check for duplicy
    let duplicate = false;
    walletList.allWallets().forEach(wallet => {
        if (nameInput.value == wallet.name) duplicate = true;
    });

    if (duplicate == true) {
        alert("Account Already Exists!");
        duplicate = false;
    } else if (nameInput.value == "" || balanceInput.value == "") {
        alert("Please provide Name and Balance!");
    } else {

        walletList.addWallet(nameInput.value, currency, balanceInput.value, descriptionInput.value);

        console.log(walletList.allWallets());

        // Selector Options
        let walletNumber = walletList.allWallets().length;
        const newOption = document.createElement("option");
        newOption.innerHTML = walletList.allWallets()[walletNumber - 1].name;
        newOption.setAttribute("value", walletNumber);
        newOption.setAttribute("selected", "selected");
        accountNames.append(newOption);
        accountNames.style.display = "block";
        modal.style.visibility = 'hidden';
        mainPage.style.display = "none";

        walletPage.innerHTML = "";
        nameInput.value = "";
        balanceInput.value = "";
        descriptionInput.value = "";

        const walletHeader = document.createElement("h1");
        walletHeader.innerHTML = walletList.allWallets()[walletNumber - 1].name + "'s Wallet Balance: " + walletList.allWallets()[walletNumber - 1].balance + " " + walletList.allWallets()[walletNumber - 1].currency;
        walletHeader.setAttribute("id", "walletBalance");
        walletPage.append(walletHeader);

        // transactionSection
        const transactionSection = document.createElement("div");
        transactionSection.setAttribute("id", "transactionSection");

        // transactionInputs
        const transactionInputs = document.createElement("div");
        transactionInputs.setAttribute("id", "transactionInputs");

        const transactionAmountDiv = document.createElement("div");
        transactionAmountDiv.style.marginBottom = "20px";
        const amountLabel = document.createElement("label");
        amountLabel.innerHTML = "Make a Transaction:";
        const amountInput = document.createElement("input");
        amountInput.setAttribute("type", "number");
        const currencySpan = document.createElement("span");
        currencySpan.innerHTML = walletList.allWallets()[walletNumber - 1].currency;
        currencySpan.setAttribute("class", "amountSpan");
        const amountSpan = document.createElement("span");
        amountSpan.innerHTML = walletList.allWallets()[walletNumber - 1].balance;
        amountSpan.setAttribute("class", "amountSpan");

        transactionAmountDiv.append(amountLabel);
        transactionAmountDiv.append(amountInput);
        transactionAmountDiv.append(currencySpan);
        transactionAmountDiv.append(amountSpan);

        const transactionNotesDiv = document.createElement("div");
        transactionNotesDiv.style.marginBottom = "20px";
        const NotesLabel = document.createElement("label");
        NotesLabel.innerHTML = "Transaction Notes:";
        const notesInput = document.createElement("input");
        notesInput.setAttribute("type", "text");

        transactionNotesDiv.append(NotesLabel);
        transactionNotesDiv.append(notesInput);

        const transactionTagsDiv = document.createElement("div");
        transactionTagsDiv.style.marginBottom = "20px";
        const tagsLabel = document.createElement("label");
        tagsLabel.innerHTML = "Transaction Tags:";
        const tagsInput = document.createElement("input");
        tagsInput.setAttribute("type", "text");

        transactionTagsDiv.append(tagsLabel);
        transactionTagsDiv.append(tagsInput);

        transactionInputs.append(transactionAmountDiv);
        transactionInputs.append(transactionNotesDiv);
        transactionInputs.append(transactionTagsDiv);

        transactionSection.append(transactionInputs);

        // transactionButtons
        const transactionButtons = document.createElement("div");
        transactionButtons.setAttribute("id", "transactionButtons");
        const incomeSpan = document.createElement("span");
        incomeSpan.innerHTML = "Income";
        incomeSpan.setAttribute("id", "incomeTrans")

        const expenseSpan = document.createElement("span");
        expenseSpan.innerHTML = "Expense";
        expenseSpan.setAttribute("id", "expenseTrans")

        const breaking = document.createElement("br");

        const addButton = document.createElement("button");
        addButton.innerHTML = "Add Transaction";
        addButton.setAttribute("id", "addTrans")

        transactionButtons.append(incomeSpan);
        transactionButtons.append(expenseSpan);
        transactionButtons.append(breaking);
        transactionButtons.append(addButton);

        transactionSection.append(transactionButtons);

        walletPage.append(transactionSection);
    }
}
modalCreateButton.addEventListener("click", createWallet);

const selectorChange = () => {
    console.log("CHANGED!");
}
accountNames.addEventListener("change", selectorChange);