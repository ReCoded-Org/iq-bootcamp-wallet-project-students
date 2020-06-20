let modalForm = document.getElementById('modal-form');
let create = document.getElementById('myInput');
let create2 = document.getElementById('myInput2');
let getName = document.getElementById('exampleInputName');
let getmoneyType = document.getElementsByName('optradio')
let getBalance = document.getElementById('exampleInputBalance');
let getDescription = document.getElementById('exampleInputDescription');
let closebtn = document.getElementById('close');
let createbtn = document.getElementById('create');
let dropDown = document.getElementById('dropdownMenuButton');
let dropDownList = document.getElementById('wallets-dropdown');
let walletView = document.getElementById('wallet-view');
let noWallet = document.getElementById('no-wallet');
let walletBalance = document.getElementById('wallet-balance');
let moneyAmount = document.getElementById('money-amount');
let moneyType = document.getElementById('money-type');
let transuction = document.getElementById('make-transaction');
let transuctionNote = document.getElementById('transaction-note');
let transuctionTag = document.getElementById('transaction-tag');
let transuctionForm = document.getElementById('transuction-form');
let transuctionList = document.getElementById('ul-list');
let incomeBtn = document.getElementById('income-btn');
let expenseBtn = document.getElementById('expense-btn');


// apearing the modal
create.addEventListener('click', function(){
    $('#myModal').modal('show')
})
create2.addEventListener('click', function(){
    $('#myModal').modal('show')
})

function addtoLocal(){
    let array = JSON.parse(localStorage.getItem("array")) || [];
    const currency = $("input[name=optradio]:checked").val() || '$'
    let obj = {
        Name:getName.value,
        Currency:currency,
        Balance:getBalance.value,
        Description:getDescription.value
    }
   array.push(obj);
   localStorage.setItem("array", JSON.stringify(array));
   modalForm.reset();
   $('#myModal').modal('hide')
   viewUpdater();
}

function selectedUser(index){
    let array = JSON.parse(localStorage.getItem("array")) || [];
    let selectedUser = array[index];
    selectedUser.index = index;
    selectedUser.transactions = selectedUser.transactions || [];

    localStorage.setItem("selectedUser", JSON.stringify(selectedUser));
    viewUpdater();
    transactionsUpdater();
}

function viewUpdater(){
    let array = JSON.parse(localStorage.getItem("array")) || [];

    if(array.length > 0){
        noWallet.classList.add('hiding');
        dropDown.classList.remove('hiding');
        walletView.classList.remove('hiding');

        let selectedUser = JSON.parse(localStorage.getItem("selectedUser")) || array[0];
        dropDownList.innerHTML = " "
        array.forEach((element, index) => {
        dropDownList.insertAdjacentHTML('beforeend',`
        <a class="dropdown-item" href="#" onclick="selectedUser(${index})">${element.Name}
        </a>`)        
        });

        dropDown.innerText = `${selectedUser.Name}s wallet`
        walletBalance.innerText = ` Wallet Balance : ${selectedUser.Currency} ${selectedUser.Balance}`
        moneyAmount.innerText = `${selectedUser.Balance}`;
        moneyType.innerText = `${selectedUser.Currency}` 
    } else {
        noWallet.classList.remove('hiding')
        dropDown.classList.add('hiding');
        walletView.classList.add('hiding');
    }
}

let transactionType = 'income';
function transactionsUpdater(){
    transuctionList.innerHTML = "";
    let array = JSON.parse(localStorage.getItem("array")) || [];
    let selectedUser = JSON.parse(localStorage.getItem("selectedUser")) || array[0];
    const transactions  = selectedUser.transactions || [];
    transactions.forEach(element=>(
        transuctionList.insertAdjacentHTML('beforeend',`<li class="list-group-item">
        <p class="float-right">${element.date}</p><h3 style="${element.type === 'income' ? 'color:green': 'color:red'}">${element.value}</h3><p>${element.note}</p><p>${element.tags}</p>
        </li>`)
    ))
}
function displayLi(e){
    e.preventDefault();
    if(transactionType === "income"){
        Income();
    }
    else{
        Expense();
    }
    transuctionForm.reset();
    transactionsUpdater();
}

function transactionTypeSetter(type = 'income'){
    transactionType = type;
}

function Income(){
    let array = JSON.parse(localStorage.getItem("array")) || [];
    let selectedUser = JSON.parse(localStorage.getItem("selectedUser")) || array[0];
   let income = parseInt(transuction.value,10) + parseInt(selectedUser.Balance,10);
   selectedUser.Balance = income;

    let Tags =transuctionTag.value;
    let splitedTag = Tags.split(',')
    let badges = splitedTag.reduce((acc, tag) => acc + `<span class="badge badge-dark">${tag}</span>    ` , ' ');
    let date = new Date();
    let options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', };
    let dateString = date.toLocaleDateString('en-US', options).replace(',', '').replace(',', '') + ' | ' +  date.toLocaleTimeString('en-US',)
    
    selectedUser.transactions = selectedUser.transactions || [];
    selectedUser.index = selectedUser.index || 0;
   selectedUser.transactions.push({
       type: 'income',
       value: transuction.value,
       tags: badges,
       date: dateString,
       note:transuctionNote.value
   });

   localStorage.setItem('selectedUser',JSON.stringify(selectedUser));
  
   array[selectedUser.index].Balance =  selectedUser.Balance;
   array[selectedUser.index].transactions =  selectedUser.transactions;

   localStorage.setItem('array', JSON.stringify(array))
   balanceUpdater()
}
function Expense(){
    let array = JSON.parse(localStorage.getItem("array")) || [];
    let selectedUser = JSON.parse(localStorage.getItem("selectedUser"))  || array[0];
    
    let expense = parseInt(selectedUser.Balance,10) - parseInt(transuction.value,10);
    selectedUser.Balance = expense;

    let Tags =transuctionTag.value;
    let splitedTag = Tags.split(',')
    let badges = splitedTag.reduce((acc, tag) => acc + `<span class="badge badge-dark">${tag}</span>    ` , ' ');
    let date = new Date();
    let options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', };
    let dateString = date.toLocaleDateString('en-US', options).replace(',', '').replace(',', '') + ' | ' +  date.toLocaleTimeString('en-US',)

    selectedUser.transactions = selectedUser.transactions || [];
    selectedUser.index = selectedUser.index || 0;
   selectedUser.transactions.push({
       type: 'expense',
       value: transuction.value,
       tags: badges,
       date: dateString,
      note:transuctionNote.value
   });
    
    localStorage.setItem('selectedUser',JSON.stringify(selectedUser));
    
    array[selectedUser.index].Balance =  selectedUser.Balance;
    array[selectedUser.index].transactions =  selectedUser.transactions;

    localStorage.setItem('array', JSON.stringify(array));
    balanceUpdater()
}
function balanceUpdater(){
    let selectedUser = JSON.parse(localStorage.getItem("selectedUser")) || array[0];
    walletBalance.innerText = `Wallet Balance : ${selectedUser.Currency} ${selectedUser.Balance}`
    moneyAmount.innerText = `${selectedUser.Balance}`;
    moneyType.innerText = `${selectedUser.Currency}` ;
}

createbtn.addEventListener('click',addtoLocal);
window.onload = function(){
    viewUpdater();
    transactionsUpdater();
}
transuctionForm.addEventListener('submit',displayLi)
