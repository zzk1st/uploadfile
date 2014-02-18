var serviceURL = "http://127.0.0.1/upload_file/default/";
var currentImageID;

$('#uploadImagePage').bind('pageshow', function(event) {
	getImageList();
});

$('#listviewImage').on('click', 'li', function() {
    currentImageID = $(this).attr("image-id");
});

function getImageList() {
    $.getJSON(serviceURL + 'getimagelist.json', function(data) {
        $('#listviewImage li').remove();
        var images = data.images;
        $.each(images, function(id, image) {
            var statusButtonStyle;
            if (image.status == "approved") {
                statusButtonStyle = 'data-theme="a"';
            }
            else if (image.status == "rejected") {
                statusButtonStyle = 'data-theme="b"';
            }
            else {
                statusButtonStyle = 'data-theme="c"';
            }

            $('#listviewImage').append('<li image-id="' + id + '"><a href="#imageDetailsPage">' +
                '<img src="' + serviceURL + "download/" + image.thumbnail + '"/>' +
                '<h4>'+ image.note + '<cr><h4/>' +
                '<p>created on ' + image.upload_time + ', taken at ' + image.address + '<p>'
                //'<a href="#" data-role="button" data-mini="true" data-inline="true" >'+ image.status + '</a>'
            );
                
        });
        $('#listviewImage').listview('refresh');
    });
}
