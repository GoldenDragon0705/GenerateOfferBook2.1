// global vars

const inputNewOffername = $('#new_offer_name');
const btnCreateOffer = $('#btn_create_offer');
const offersContainer = $('#offer-contents');
const offersHeader = $('#offer-tabs');
const imgContent = $('.load-image-content');

const Offerbook = (function () {

  let offers = {};
  let filenames = [];

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

    $('#btn-load-image').on('click', () => {
			const dialogConfig = {
				title : 'Select image files.',
				buttonLabel: 'Select',
				filters: [{
					name: "Image files", extensions: ["jpg", "jpeg", "png"]
				}],
				properties: ['openFile', 'multiSelections']
			};
			electron.openDialog('showOpenDialogSync', dialogConfig);
		});

    

    try {
      electron.onFilenames(function(params) {
        const { offerId, brandId, mode, filenames } = params;
        if(mode === "ITEM_IMAGE_MODE") {
          const startIndex = Date.now();
          filenames.forEach(function(filename, index) {
            new Item(offerId, brandId, [filename], `${offerId}_${brandId}_${startIndex + index}`);
          });
        }
      });

      electron.saveFileNames(filenames => {
        filenames = filenames;
        if(filenames.length > 0){
          $('button#item').prop('disabled', false);
        }
        
        filenames.forEach((filename, index) => {
          filename = filename.replaceAll('\\', '\/');
          if(index == 0){
            imgContent.append(`<div class="w3-third my-1" choosed-main-image="true">
                                <div class="w3-card">
                                  <div class="goods-image-wrapper main-image-border">
                                    <img src="${filename}" class="goods-image">
                                    <div class="main-image-checked d-block">
                                      <i class="fa fa-check"></i>
                                    </div>
                                  </div>
                                </div>
                              </div>`);
          }else{
            imgContent.append(`<div class="w3-third my-1" choosed-main-image="false">
                                      <div class="w3-card">
                                        <div class="goods-image-wrapper">
                                          <img src="${filename}" class="goods-image">
                                          <div class="main-image-checked d-none">
                                            <i class="fa fa-check"></i>
                                          </div>
                                        </div>
                                      </div>
                                    </div>`);
          }
        });
        $('.goods-image-wrapper').on('click', (e) => {
          $('.main-image-checked').removeClass('d-block').addClass('d-none');
          $('.goods-image-wrapper').removeClass('main-image-border');
          $(e.target).siblings('div').removeClass('d-none').addClass('d-block');
          $(e.target).parent().addClass('main-image-border');
          $('.w3-third[choosed-main-image]').attr('choosed-main-image', "false");
          $(e.target).parent().parent().parent().attr('choosed-main-image', "true");
        });
        $('button#item').on('click', function() {
          const goods_number = $('input[name="goods-number"]').val();
          const goods_symbol = $('input[name="goods-symbol"]').val();
          const goods_price = $('input[name="goods-price"]').val();
          const offerId = $('#current-offer-id').val();
          const brandId = $('#current-brand-id').val();
          const imageCards = $('div[choosed-main-image]');
          let firstIndex;
          imageCards.each(function(index, imageCard) {
            if($(imageCard).attr('choosed-main-image') == "true")
            {
              firstIndex = index;
              return;
            }
          });
          let mainFileName = filenames[firstIndex];
          filenames.splice(firstIndex, 1);
          filenames.unshift(mainFileName);
          new Item(offerId,brandId,filenames, goods_symbol, goods_price, goods_number);
          $('#close-create-item-modal').click();
        });
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