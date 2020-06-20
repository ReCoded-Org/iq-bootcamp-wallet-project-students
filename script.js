/*const form = document.querySelector('#create-wallet');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    /*let params = `scrollbars=1,resizable=1,width=1000,height=580,left=0,top=0`;
    let neWin = open('create-wallet-form.html', "", params);
    neWin.focus();

    neWin.onload = function () {
        let html = `<div style="font-size:30px">Welcome!</div>`;
        neWin.document.body.insertAdjacentHTML('afterbegin', html);*/
//};

//})

/*$('#openModal').on('click', function () {
    $('#button1').trigger('focus')
})*/

/*let x = document.querySelector('#exampleModal');
x.on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var recipient = button.data('whatever') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.modal-title').text('New message to ' + recipient)
    modal.find('.modal-body input').val(recipient)
})*/


//const wallet = document.getElementById('walletInfo');
//const currency = document.getElementsByName('currency');



function getRadioVal(name) {
    let val;
    // get list of radio buttons with specified name
    let radios = document.getElementsByName(name);

    // loop through list of radio buttons
    for (let i = 0, len = radios.length; i < len; i++) {
        if (radios[i].checked) { // radio checked?
            val = radios[i].value; // if so, hold its value in val
            break; // and break out of for loop
        }
    }
    return val; // return value of checked radio or undefined if none checked
}






document.getElementById('wallet-view').addEventListener('click', () => {
    let obj = {
        name: document.getElementById('name').value,
        currency: getRadioVal('currency'),
        balance: document.getElementById('balance').value,
        description: document.getElementById('description').value

    }
    // console.log(obj.currency);
    //window.localStorage['obj'] = obj;
    // window.sessionStorage.setItem("wallet" + obj.name, JSON.stringify(obj.name));
    window.localStorage.setItem("wallet" + obj.name, JSON.stringify(obj.name));
    //window.sessionStorage.setItem("wallet", "Hello");
    window.localStorage.setItem(obj.name + "name", JSON.stringify(obj.name));
    window.localStorage.setItem(obj.name + "currency", JSON.stringify(obj.currency));
    window.localStorage.setItem(obj.name + "balance", JSON.stringify(obj.balance));
    window.localStorage.setItem(obj.name + "description", JSON.stringify(obj.description));



    /*window.sessionStorage.setItem("wallet" + obj.name, JSON.stringify(obj.name));
    //window.sessionStorage.setItem("wallet", "Hello");
    window.sessionStorage.setItem(obj.name + "name", JSON.stringify(obj.name));
    window.sessionStorage.setItem(obj.name + "currency", JSON.stringify(obj.currency));
    window.sessionStorage.setItem(obj.name + "balance", JSON.stringify(obj.balance));
    window.sessionStorage.setItem(obj.name + "description", JSON.stringify(obj.description));
    //localStorage.setItem('name', obj.name)*/
    location.replace("./wallet-view.html");
})







