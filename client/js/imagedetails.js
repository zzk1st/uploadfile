$("#imageDetailsPage").on("pagebeforeshow", function() {
    var id = currentImageID;
    $.getJSON(serviceURL + '/getimagelist.json?id='+id, function(data) {
        var image = data.images[id];
        console.log(image);
        $('#image').attr('src', serviceURL + '/download/' + image.imagefile);
        $('#note').text(image.note);
        $('#upload_time').text('created on ' + image.upload_time);
        $('#address').text('taken at ' + image.address);
        $('#GPSPos').text('Latitude: ' + image.latitude + '\nLongitude: ' + image.longitude);

        if (image.latitude != 'UNKNOWN' && image.longitude != 'UNKNOWN') {
	       $('#map_canvas_imagedetails').gmap({'center': new google.maps.LatLng(image.latitude, image.longitude)});
        }
    });
});

$("#imageDetailsPage").on("pageshow", function() {
    $('#map_canvas_imagedetails').gmap('refresh');
});