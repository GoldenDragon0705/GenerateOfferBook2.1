const imgContent = $('.load-image-content');


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
    if(filenames.length > 0){
        $('button#item').prop('disabled', false);
    }
    
    filenames.forEach((filename, index) => {
        filename = filename.replaceAll('\\', '\/');
        imgContent.append(`<div class="w3-third my-1">
                                <div class="w3-card">
                                    <div class="goods-image-wrapper">
                                        <img src="${filename}" class="goods-image">
                                        <div class="main-image-checked d-none">
                                            <i class="fa fa-check"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>`);
    });
    $('.goods-image-wrapper').on('click', (e) => {
        $('.main-image-checked').removeClass('d-block').addClass('d-none');
        $('.goods-image-wrapper').removeClass('main-image-border');
        $(e.target).siblings('div').removeClass('d-none').addClass('d-block');
        $(e.target).parent().addClass('main-image-border');
    })
});


const Item = function(offerId, brandId, filenames, symbol = "", price = "", no = "") {
  this.offerId = offerId;
  this.brandId = brandId;
  this.filenames = filenames;
  this.symbol = symbol;
  this.price = price;
  this.no = no;
};
