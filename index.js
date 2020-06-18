let modalForm = document.getElementById('modal-form');
let getName = document.getElementById('exampleInputName');
let getCurrencyDolar = document.getElementById('exampleInputCurrency1');
let getCurrencyDinar = document.getElementById('exampleInputCurrency2');
let getBalance = document.getElementById('exampleInputBalance');
let getDescription = document.getElementById('exampleInputDescription');
let closebtn = document.getElementById('close');
let createbtn = document.getElementById('create');
let modalDiv = document.getElementById('modal-container');
let array = [];

// apearing the modal
let create = document.getElementById('myInput');
create.addEventListener('click', function(){
    $('#myModal').modal('show')
})

function addtoLocal(){
    
    let obj = {
        Name:getName.value,
        Dollar:getCurrencyDolar.value,
        Dinar:getCurrencyDinar.value,
        Balance:getBalance.value,
        Description:getDescription.value
    }
   array.push(obj);
   localStorage.setItem("array", JSON.stringify(array));
    modalForm.reset();
}
createbtn.addEventListener('click',addtoLocal);

 // ahmeds section

 //end of ahmed section  


 
// dunia section 

// end of dunia section  
