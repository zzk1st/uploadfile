$(document).ready(function() {
    $('#btnUploadImage').click(function(){
        // You can't put a jquery element into FormData, so here we use javascript
        //var formData = new FormData($('#formCreateImage'));
        var formData = new FormData();
        formData.append('address', document.getElementById('inputaddress').value);
        formData.append('note', document.getElementById('inputnote').value);
        formData.append('imagefile', document.getElementById('inputimagefile').files[0]);
        $.ajax({
            url: serviceURL + 'upload',
            type: 'POST',
            xhr: function() {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) { // Check if upload property exists
                    myXhr.upload.addEventListener('progress',progressHandlingFunction, false); // For handling the progress of the upload
                }
                return myXhr;
            },
            data: formData,
            crossDomain: true,
            cache: false,
            processData: false,  // tell jQuery not to process the data
            contentType: false,  // tell jQuery not to set contentType
            success: function(data)
            {   
                window.location.href="#uploadImagePage";
                return;
            }
        });
    });
});
function progressHandlingFunction(e){
}
