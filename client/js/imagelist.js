var serviceURL = "http://localhost:8000/upload_file/default/";

var images;

$('#uploadImagePage').bind('pageinit', function(event) {
	getImageList();
});

function getImageList() {
    $.getJSON(serviceURL + 'getimagelist.json', function(data) {
        $('#imageList li').remove();
        images = data.images;
        $.each(images, function(id, image) {
            $('#imageList').append('<li><a href="imagedetails.html?id=' + id + '">' +
                '<img src="' + serviceURL + "download/" + image.thumbnail + '"/>' +
                '<h4>'+ image.note + '<cr><h4/>' +
                '<p>created on ' + image.upload_time + ', taken at ' + image.address + '<p>'
            );
                
        });
        $('#imageList').listview('refresh');
    });
}
