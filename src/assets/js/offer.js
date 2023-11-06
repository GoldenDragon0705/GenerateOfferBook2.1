const Offer = function(id, offername) {
  this.id = id;
  this.offername = offername;
  
  this.init();

}

Offer.prototype.init = function() {

  const self = this;

  offersHeader.append('<li class="nav-item">\
                              <a class="nav-link" data-bs-toggle="tab" href="#' + self.id + '" data-offername="' + self.offername + '">' + self.offername + ' *</a>\
                            </li>');
  offersContainer.append('<div class="tab-pane container-fluid px-0 py-2" id="' + self.id + '" role="tabpanel">\
                            <div class="row">\
                            <div class="col-md-3">\
                              <div class="w3-card w3-indigo w3-round-large px-2 py-2">\
                                <h2 class="text-center w3-border-bottom pb-2">Existing brands</h2>\
                                <div class="d-grid mb-2">\
                                  <div class="form-group mb-2">\
                                    <input type="text" class="form-control new-brand-name" placeholder="New brand name">\
                                  </div>\
                                  <button class="w3-btn w3-ripple w3-blue w3-round-large btn-block btn-create-new-brand">Create new brand</button>\
                                </div> \
                                <div>\
                                  <ul class="list-group list-group-flush bg-transparent list-group-numbered brands-container">\
                                  </ul>\
                                </div> \
                              </div>\
                            </div>\
                            <div class="col-md-9">\
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
      if(self.createBrand(brandName)) inputNewBrandName.val("");
    });
    
};

/**
 * create new brand of @brandName
 * @param {*} brandName 
 * @returns 
 */
Offer.prototype.createBrand = function(brandName) {
  
  return true;
};
