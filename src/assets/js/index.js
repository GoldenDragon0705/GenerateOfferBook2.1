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
          $('#btn-create-item').prop('disabled', false);
        }

        ItemRelatives().renderFromImages(filenames, imgContent, true);

        $('.load-image-content .goods-image-wrapper').on('click', (e) => {
          ItemRelatives().itemChecking(e);
        });
        $('#btn-create-item').off('click');
        $('#btn-create-item').on('click', function() {
          const goods_number = $('input[name="goods-number"]').val();
          const goods_symbol = $('input[name="goods-symbol"]').val();
          const goods_price = $('input[name="goods-price"]').val();
          const offerId = $('#current-offer-id').val();
          const brandId = $('#current-brand-id').val();
          const imageCards = $('.load-image-content div[choosed-main-image]');
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
          const id = `${offerId}_${brandId}_${Date.now()}`;
          new Item(offerId,brandId,filenames, id, goods_symbol, goods_price, goods_number);
          $('#close-create-item-modal').click();
        });


      });

      electron.onPdfFileSave(result => {
        if(result) {
          return $.toast({
            heading: 'Success.',
            text: 'Pdf file is saved successfully.',
            icon: 'success',
            position: 'bottom-right',
          });
        }
      });
    } catch (e) {
      console.log("Load opened filenames is failed. web mode");
    }

    $('#btn-change-image').on('click', () => {
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

    try{
      let modalFileNames = [];
      const changeImageContent = $('.load-image-edit-content');
      electron.saveFileNames(filenames => {
        modalFileNames = $('#edit-current-item div.hidden-filenames').attr('data-filenames').split(",");
        ItemRelatives().renderFromImages(filenames, changeImageContent, false);
        filenames.map((filename, index) => {
          return modalFileNames.push(filename);
        })
        console.log(modalFileNames);
        $('.load-image-edit-content .goods-image-wrapper').on('click', (e) => {
          ItemRelatives().itemChecking(e);
        });

        $('#edit-current-item div.hidden-filenames').attr('data-filenames', modalFileNames);
      });
    }catch(e){
      console.log(e);
    }

    $('#btn-edit-item').on('click', function() {
      const goods_number = $('input[name="goods-edit-number"]').val();
      const goods_symbol = $('input[name="goods-edit-symbol"]').val();
      const goods_price = $('input[name="goods-edit-price"]').val();
      const offerId = $('input[name="goods-edit-itemOfferId"]').attr("value");
      const brandId = $('input[name="goods-edit-itemBrandId"]').attr("value");
      const id = $('input[name="goods-edit-itemId"]').attr("value");

      let modalFileNames = $('.hidden-filenames').attr('data-filenames').split(',');
      
      const imageCards = $('.load-image-edit-content div[choosed-main-image]');
      let firstIndex;
      imageCards.each(function(index, imageCard) {
        if($(imageCard).attr('choosed-main-image') == "true")
        {
          firstIndex = index;
          return;
        }
      });
      

      let mainFileName = modalFileNames[firstIndex];
      modalFileNames.splice(firstIndex, 1);
      modalFileNames.unshift(mainFileName);
      
      const item = $(`[data-itemid="${id}"]`);
      item.find('input.item-number').val(goods_number);
      item.find('input.item-symbol').val(goods_symbol);
      item.find('input.item-price').val(goods_price);

      item.find('div.hidden-item-filenames').attr('data-item-filenames', modalFileNames);
      item.find('div.item-img').css('background-image', 'url(' + modalFileNames[0].replaceAll('\\', '\/') + ')');

      $('#close-edit-item-modal').click();
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