class Wallet {
  constructor(name, currency, balance, description) {
    this.name = name;
    this.currency = currency;
    this.balance = balance;
    this.description = description;
  }
}
class Transaction {
  constructor(amount, type, note, tag, date) {
    this.amount = amount;
    this.type = type;
    this.note = note;
    this.tag = tag;
    this.date = date;
  }
}
