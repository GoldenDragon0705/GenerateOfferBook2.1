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
};
