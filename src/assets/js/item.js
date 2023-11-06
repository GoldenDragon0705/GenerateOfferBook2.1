const Item = function(offerId, brandId, filenames, symbol = "", price = "", no = "") {
  this.offerId = offerId;
  this.brandId = brandId;
  this.filenames = filenames;
  this.symbol = symbol;
  this.price = price;
  this.no = no;
};