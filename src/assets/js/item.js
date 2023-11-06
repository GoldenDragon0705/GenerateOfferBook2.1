$('#btnLoadImages').on('click', () => {
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
    console.log(filenames);
})