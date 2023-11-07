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

electron.saveFileNames(filenames => {
		const imgContent = $('.load-image-content');
		imgContent.append('<h1>123</h1>');
})


const Item = function(offerId, brandId, filenames, symbol = "", price = "", no = "") {
	this.offerId = offerId;
	this.brandId = brandId;
	this.filenames = filenames;
	this.symbol = symbol;
	this.price = price;
	this.no = no;

	this.init();
};


Item.prototype.init = function() {
  const self = this;
  const offerContainer = $('#' + self.offerId);
  const brandContainer = $('div[data-brandid="' + self.brandId + '"] .item-blocks-container');
  brandContainer.append('<div class="col-md-3 item-block mt-2">\
                          <div class="card p-2">\
                            <div class="form-group mb-2">\
                                <input type="text" class="form-control text-center">\
                            </div>\
                            <div class="item-img" style="background-image: url(\'C:/Users/111/Pictures/items/61VeA-UsG0L.__AC_SY300_SX300_QL70_FMwebp_.jpg\');"></div>\
                            <div class="form-group mt-2">\
                                <input type="text" class="form-control">\
                            </div>\
                            <div class="form-group mt-2">\
                                <input type="text" class="form-control">\
                            </div>\
                            <div class="d-flex justify-content-end mt-3">\
                                <a href="javascript:" class="me-3">View detail</a>\
                                <a href="javascript:" class="">Delete</a>\
                            </div>\
                          </div>\
                      </div>');
};