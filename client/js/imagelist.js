var serviceURL = "http://192.168.1.3/uploadfile/default";
var currentImageID;

$('#uploadImagePage').bind('pageshow', function(event) {
	getImageList();
});

$('#listviewImage').on('click', 'li', function() {
    currentImageID = $(this).attr("image-id");
});

function getImageList() {
    $.getJSON(serviceURL + '/getimagelist.json', function(data) {
        $('#listviewImage li').remove();
        var images = data.images;
        $.each(images, function(id, image) {
            $('#listviewImage').append('<li image-id="' + id + '"><a href="#imageDetailsPage">' +
                '<img src="' + serviceURL + "/download/" + image.thumbnail + '"/>' +
                '<h4>'+ image.note + '<cr><h4/>' +
                '<p>created on ' + image.upload_time + ', taken at ' + image.address + '<p>'
            );
                
        });
        $('#listviewImage').listview('refresh');
    });
}
