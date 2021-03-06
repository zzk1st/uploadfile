var currentLatitude;
var currentLongitude;

$('#createImagePage').on("pagebeforeshow", function() {
    currentLatitude = "UNKNOWN";
    currentLongitude = "UNKNOWN";
    document.getElementById('inputGPSData').value = "";

    // Initialize the GPS
    navigator.geolocation.getCurrentPosition(onGetCurrentPositionSuccess, onGetCurrentPositionError);
    function onGetCurrentPositionSuccess(position) {
        alert("GPS Succeed!");
        currentLatitude = position.coords.latitude;
        currentLongitude = position.coords.longitude;
        document.getElementById('inputGPSData').value = 'Latitude=' + currentLatitude + '\nLongitude=' + currentLongitude;
        $('#map_canvas_createimage').gmap({'center': new google.maps.LatLng(currentLatitude, currentLongitude)});
        $('#map_canvas_createimage').gmap('refresh');

    }
    function onGetCurrentPositionError(error) {
        alert("Fail to get GPS data!");
    }

    // Upload image to server
    var upload = function (imageURI) {
        // set file uploading options
        var ft = new FileTransfer(), options = new FileUploadOptions();

        options.fileKey = "imagefile";
        options.fileName = 'filename.jpg'; // We will use the name auto-generated by Node at the server side.
        options.mimeType = "image/jpeg";
        options.chunkedMode = false;
        options.params = { // Whatever you populate options.params with, will be available in req.body at the server-side.
            "address": document.getElementById('inputaddress').value,
            "note": document.getElementById('inputnote').value,
            "latitude": currentLatitude,
            "longitude": currentLongitude,
        };

        ft.upload(imageURI, serviceURL + "/upload",
            function (e) {
                window.location.href="#uploadImagePage";
            },
            function (e) {
                alert("Upload failed");
            }, options);
    };

    $('#btnUploadImage').click(function(){
        var options = {
            quality: 45,
            targetWidth: 1000,
            targetHeight: 1000,
            destinationType: Camera.DestinationType.FILE_URI,
            encodingType: Camera.EncodingType.JPEG,
            sourceType: Camera.PictureSourceType.CAMERA
        };

        navigator.camera.getPicture(
            function (imageURI) {
                console.log(imageURI);
                upload(imageURI);
            },
            function (message) {
                // We typically get here because the use canceled the photo operation. Fail silently.
            }, options);

        return false;
            /*
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
        
        function progressHandlingFunction(e){
        }

       */
    });
});

$('#createImagePage').on("pageshow", function() {
    $('#map_canvas_createimage').gmap('refresh');
});
