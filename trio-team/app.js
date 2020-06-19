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
    transactions = [];
    get totalBalance(){
        let total = 0;
        this.transactions.forEach(transaction => {
            if(transaction.type === 'income')
                total += transaction.amount;
            else
                total -= transaction.amount;
        })
        return this.startingBalance + total;
    }
}
//(function main(){
    let wallets = [];
    const walletForm = document.getElementById("walletForm");
    //const transactionForm = document.getElementById("");
    if(localStorage.length !==0){
        retrieveFromStorage()
    }
    if(wallets.length === 0){
        document.getElementsByClassName('wallet')[0].style.display = "none"
    }
    else{
        document.getElementsByClassName('empty')[0].style.display = "none"
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
    function addWalletsToSelect(name, id){
        const walletsSelect = document.getElementById('wallets-select');
        walletsSelect.insertAdjacentHTML('beforeend',`
        <option id=${id} value=${name}>${name}</option>
        `)
    }
    getWalletsNames();
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
        const newWallet = new Wallet(name, balance, currency, description);
        wallets.push(newWallet);
        storeToStorage();
    })

    
//})()
