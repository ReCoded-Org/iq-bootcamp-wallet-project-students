$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })

const btnCrtWallet = documnet.querySelector(".btn");
const closeBtn = document.querySelector(".close");
const modal = document.querySelector(".modal");

    // btnCrtWallet.addEventListener('click',function () {
    //     alert("try again");
    //     modal.classList.add("open-wallet");
    //   });
    //   closeBtn.addEventListener("click", function () {
    //     modal.classList.remove("open-wallet");
    //   });
      