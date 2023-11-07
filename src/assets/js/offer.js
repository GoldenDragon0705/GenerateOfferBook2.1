const Offer = function(id, offername) {
  this.id = id;
  this.offername = offername;
  this.container = $('#' + id);
  this.brands = {};
  this.init();
}

Offer.prototype.init = function() {

  const self = this;

  offersHeader.append('<li class="nav-item">\
                              <a class="nav-link" data-bs-toggle="tab" href="#' + self.id + '" data-offername="' + self.offername + '">' + self.offername + ' *</a>\
                            </li>');
  offersContainer.append('<div class="tab-pane container-fluid px-0 py-2" id="' + self.id + '" role="tabpanel">\
                              <div class="offer-actions-bar mt-2 mb-3 p-3 d-flex border rounded">\
                                <a href="" class="me-4"><i class="fa fa-save"></i> Save this offer</a>\
                                <a href="" class="me-4"><i class="fa fa-file-word-o"></i> Generate docx</a>\
                                <a href="" class="me-auto"><i class="fa fa-file-pdf-o"></i> Generate pdf</a>\
                                <a href="" class="me-4"><i class="fa fa-cog"></i> Setting</a>\
                                <a href="" >Close</a>\
                              </div>\
                            <div class="row">\
                              <div class="col-md-3">\
                                <div class="w3-card w3-indigo w3-round-large px-2 py-2">\
                                  <div class="d-grid mb-2">\
                                    <div class="form-group mb-2">\
                                      <input type="text" class="form-control new-brand-name" placeholder="New brand name">\
                                    </div>\
                                    <button class="w3-btn w3-ripple w3-blue w3-round-large btn-block btn-create-new-brand">Create new brand</button>\
                                  </div> \
                                  <h3 class="text-center w3-border-bottom pb-2 mt-2">List of brands</h3>\
                                  <div>\
                                    <ul class="list-group list-group-flush bg-transparent brands-container">\
                                    </ul>\
                                  </div> \
                                </div>\
                                <div class="d-flex justify-content-center my-2 ">\
                                  <a href="javascript: class="btn-delete-all-brands">Delete all brands</a>\
                                </div>\
                              </div>\
                              <div class="col-md-9 items-container">\
                                <div class="w3-panel w3-dark-gray my-0 no-brand-alert">\
                                  <h3>No brands.</h3>\
                                  <p>Please create a new brand.</p>\
                                </div>\
                              </div>\
                          </div>\
                        </div>');

    // set this tab to active
    offersHeader.find('.nav-link').removeClass("active");
    offersContainer.find('.tab-pane').removeClass("active");
    $('[href="#' + self.id + '"]').addClass("active");
    $('#' + self.id).addClass("active");

    // update container  
    self.container = $('#' + self.id);

    // bind events new components
    const newContainer = $('#' + self.id);
    const inputNewBrandName = newContainer.find('.new-brand-name');
    const btnCreateNewBrand = newContainer.find('.btn-create-new-brand');
    inputNewBrandName.on('input', function() {
      const value = $(this).val();
      btnCreateNewBrand.prop('disabeld', value.length?false:true);
    });

    inputNewBrandName.on("keypress", function(e) {
      var keyCode = e.charCode || e.keyCode;
      if(keyCode == 13 && $(this).val()) btnCreateNewBrand.click();
    });

    btnCreateNewBrand.on("click", function() {
      const brandName = inputNewBrandName.val();
      if(!brandName.length) return;
      const newBrand = new Brand(self.id, brandName);
      self.brands[newBrand.id] = newBrand;
      inputNewBrandName.val("");
    });
    
};

Offer.prototype.loadedItemImages = function (brandId, filenames) {
  const self = this;
  const startIndex = Date.now();
  self.brands[brandId].addNewItems(filenames.map(function(filename, index) {
    return new Item(self.id, brandId, [filename], `${self.id}_${brandId}_${startIndex + index}`);
  }));
};
