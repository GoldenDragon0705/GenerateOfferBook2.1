class browseItems {
    constructor(imgContent) {
        this.imgContent = imgContent;
    }
    init() {
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
                this.imgContent.append(`<div class="w3-third my-1">
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
    }
    createItem() {
        
    }
}

const loadItems = new browseItems($('.load-image-content'));
loadItems.init();
$('#item').on('click', function() {
    loadItems.createItem();
}); 