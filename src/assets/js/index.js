const newOfferName = $('#new_offer_name');
var btnCreateOffer = $('#btn_create_offer');
var offersContainer = $('#offer-contents');
var offersHeader = $('#offer-tabs');

const Offerbook = (function () {

  const bindBaseEvents = function() {
    newOfferName.on("input", function() {
      const offername = $(this).val();
      btnCreateOffer.prop("disabled", offername.length?false:true);      
    });

    newOfferName.on("keypress", function(e) {
      var keycode = e.keycode || e.charCode;
      if(keycode == 13 && e.target.value) {
        btnCreateOffer.click();
      }
    });

    btnCreateOffer.on("click", function() {
      const offername = newOfferName.val();
      if(!offername.length) {
        offername.focus();
        return ;
      }
      createNewOffer(offername);
      $('#create-new-offer [data-bs-dismiss="modal"]').click();
    });

    $('.btn-open-offer').on('click', function() {
      alert("open ffer");
    });

    $('[data-bs-target="#create-new-offer"]').on("click", function() {
      setTimeout(function() {
        newOfferName.focus();
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
    offersHeader.append('<li class="nav-item">\
                              <a class="nav-link" data-bs-toggle="tab" href="#' + id + '" data-offername="' + offername + '">' + offername + ' *</a>\
                            </li>');
    offersContainer.append('<div class="tab-pane container-fluid" id="' + id + '" role="tabpanel">\
                          </div>');

    offersHeader.find('.nav-link').removeClass("active");
    offersContainer.find('.tab-pane').removeClass("active");
    $('[href="#' + id + '"]').addClass("active");
    $('#' + id).addClass("active");
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