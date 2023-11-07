// global vars

var inputNewOffername = $('#new_offer_name');
var btnCreateOffer = $('#btn_create_offer');
var offersContainer = $('#offer-contents');
var offersHeader = $('#offer-tabs');

const Offerbook = (function () {

  let offers = {};

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

    try {
      electron.onFilenames(function(params) {
        const { offerId, brandId, mode, filenames } = params;
        if(mode === "ITEM_IMAGE_MODE") {
          const startIndex = Date.now();
          filenames.map(function(filename, index) {
            return new Item(offerId, brandId, [filename], `${offerId}_${brandId}_${startIndex + index}`);
          });
        }
      });
    } catch (e) {
      console.log("Load opened filenames is failed. web mode");
    }
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
    offers[id] = new Offer(id, offername);
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