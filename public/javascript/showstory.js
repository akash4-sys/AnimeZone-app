CKEDITOR.replace('ckeditor',{
    uiColor:'#CCEAEE',
    removeButtons: 'PasteFromWord',
    height:'300'
});

CKEDITOR.config.extraPlugins = 'autogrow';
CKEDITOR.config.autoGrow_minHeight = 400;
CKEDITOR.config.autoGrow_maxHeight = 600;
CKEDITOR.config.autoGrow_bottomSpace = 50;
CKEDITOR.config.readOnly = true;


function darkmode(){
    
    var body = document.getElementById('body');
    body.classList.toggle("dark-mode");

    var nav = document.getElementById('dropmenu');
    nav.classList.toggle("dark-back");

    var item = document.getElementsByClassName("dropdown-item");

    for(var i = 0; i < 6; i++)
    {
        item[i].classList.toggle("dark-item");
    }
}