$(document).on("pageshow","#imageDetailsPage",function() {
    var id = currentImageID;
    $.getJSON(serviceURL + 'getimagelist.json?id='+id, function(data) {
        var image = data.images[id];
        console.log(image);
        $('#image').attr('src', serviceURL + 'download/' + image.imagefile);
        $('#note').text(image.note);
        $('#upload_time').text('created on ' + image.upload_time);
        $('#address').text('taken at ' + image.address);
    });
});
