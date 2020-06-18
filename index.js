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
    
    localStorage.setItem("selectedUser", JSON.stringify(selectedUser));
    viewUpdater();
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
createbtn.addEventListener('click',addtoLocal);
window.onload = function(){
    viewUpdater();
}

 // ahmeds section

 //end of ahmed section  


 
// dunia section 

// end of dunia section  
