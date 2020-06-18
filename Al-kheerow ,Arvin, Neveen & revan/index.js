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
    constructor(id,amount, name, symbol){
        this.id = id;
        this.name = name;
        this.symbol = symbol;
        this.amount = amount;
    }
}
    


// ends of ahmed's section