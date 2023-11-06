const Brand = function(offerId, brandName) {
  this.id = Date.now();
  this.offerId = offerId;
  this.brandName = brandName;
  this.offerContainer = $('#' + offerId);
  this.init();
};

Brand.prototype.init = function() {
  const self = this;
  if(self.offerContainer.find('[data-brandname="' + self.brandName + '"]').length) {
    $.toast({
      heading: 'Error',
      text: 'This brand is already exist.',
      icon: 'error',
      position: 'top-right',
    });
    return false;
  }

  self.offerContainer.find('.no-brand-alert').hide();
  self.offerContainer.find('.brands-container').append('<li class="list-group-item" data-brandname="' + self.brandName + '" data-brandid="' + self.id + '">\
                                                    <a href="javascript:" class="d-block">' + self.brandName + '</a>\
                                                  </li>');
  self.offerContainer.find('.items-container').append('<div class="mb-4" data-brandid="' + self.id + '">\
                                                    <div class="d-flex justify-content-between ">\
                                                      <div>\
                                                        <span class="h1 me-4">' + self.brandName + '</span>\
                                                        <a href="javascript:" class="me-2 btn-import-item-images">Import new images</a>\
                                                        <a href="javascript:" class="me-2">Delete all items</a>\
                                                        <a href="javascript:" class="me-2">Delete this brand</a>\
                                                        <a href="javascript:" class="me-2">Change brand name</a>\
                                                      </div>\
                                                      <div>\
                                                        <button class="w3-btn w3-ripple w3-teal w3-round-large btn-create-item" data-bs-toggle="modal" data-bs-target="#create-new-item">Create new item</button>\
                                                      </div>\
                                                    </div>\
                                                  </div>');

  self.offerContainer.find('.items-container div[data-brandid="' + self.id + '"]').hide();

  self.offerContainer.find('li[data-brandid="' + self.id + '"] a').on("click", function() {
    self.offerContainer.find('.items-container div[data-brandid]').hide();
    self.offerContainer.find('.items-container div[data-brandid="' + self.id + '"]').show();
  });
  
  if(self.offerContainer.find('li[data-brandname]').length == 1) {
    self.offerContainer.find('li[data-brandid="' + self.id + '"] a').click();
  }

  $('div[data-brandid="' + self.id + '"] a.btn-import-item-images').on("click", function() {
    try {
      electron.loadImages(self.offerId, self.id, "ITEM_IMAGE_MODE");
    } catch (e) {
      console.log("Load item images is failed. It is web mode.");
    }
  });
};

Brand.prototype.addNewItems = function(items) {
  console.log(items);
};

