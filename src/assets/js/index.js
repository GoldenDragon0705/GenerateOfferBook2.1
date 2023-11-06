// global vars

const inputNewOffername = $('#new_offer_name');
var btnCreateOffer = $('#btn_create_offer');
var offersContainer = $('#offer-contents');
var offersHeader = $('#offer-tabs');

const Offerbook = (function () {

  const bindBaseEvents = function() {
    inputNewOffername.on("input", function() {
      const offername = $(this).val();
      btnCreateOffer.prop("disabled", offername.length?false:true);      
    });

    inputNewOffername.on("keypress", function(e) {
      var keycode = e.keycode || e.charCode;
      if(keycode == 13 && e.target.value) {
        btnCreateOffer.click();
      }
    });

    btnCreateOffer.on("click", function() {
      const offername = inputNewOffername.val();
      if(!offername.length) {
        offername.focus();
        return ;
      }
      createNewOffer(offername);
      $('#create-new-offer [data-bs-dismiss="modal"]').click();
      inputNewOffername.val("");
    });

    $('.btn-open-offer').on('click', function() {
      alert("open ffer");
    });

    $('[data-bs-target="#create-new-offer"]').on("click", function() {
      setTimeout(function() {
        inputNewOffername.focus();
      }, 500);
    });
  };

  /**
   * Create new offer with @offername
   * @param {*} offername 
   * @returns 
   */
  const createNewOffer = function(offername) {
    if(!offername) {
      $('#no-offer-alert').show();
      return ;
    }
    // if No offer alert is visible, toggle it
    $('#no-offer-alert').hide();

    const id = Date.now();
    new Offer(id, offername);
  };

  return {
    init : function() {
      bindBaseEvents();
    }
  }
}());

$(() => {
  Offerbook.init();
});