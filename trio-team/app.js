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
(function main(){
    const wallets = [];
    function storeToStorage(){
        localStorage.clear();
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
})()
