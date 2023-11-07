const Item = function(offerId, brandId, filenames, id = "", symbol = "", price = "", no = "") {
	this.offerId = offerId;
	this.brandId = brandId;
	this.filenames = filenames;
	this.symbol = symbol;
	this.price = price;
	this.id = id;
  this.no = no;
	this.init();
};


Item.prototype.init = function() {
  const self = this;
  const offerContainer = $('#' + self.offerId);
  const brandContainer = $('div[data-brandid="' + self.brandId + '"] .item-blocks-container');
  brandContainer.append('<div class="col-md-3 item-block mt-2" data-itemid="' + self.id + '">\
                          <div class="card p-2">\
                            <div class="form-group mb-2">\
                                <input type="text" class="form-control text-center item-number">\
                            </div>\
                            <div class="item-img"></div>\
                            <div class="form-group mt-2">\
                                <input type="text" class="form-control item-symbol" placeholder="Symbol: ">\
                            </div>\
                            <div class="form-group mt-2">\
                                <input type="text" class="form-control item-price" placeholder="Price: ">\
                            </div>\
                            <div class="d-flex justify-content-end mt-3">\
                                <a href="javascript:" class="me-3">View detail</a>\
                                <a href="javascript:" class="">Delete</a>\
                            </div>\
                          </div>\
                      </div>');
  const filename = self.filenames[0].replaceAll("\\", "\/");
  $('[data-itemid="' + self.id + '"] .item-img').css('background-image', 'url(' + filename + ')');
};