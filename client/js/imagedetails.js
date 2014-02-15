$('#detailsPage').live('pageshow', function(event) {
	//var id = getUrlVars()["id"];
	var id = 0;
	$.getJSON(serviceURL + 'getimagelist.json?id='+id, displayImageDetails);
});

function displayImageDetails(data) {
	var image = data.images[0];
	console.log(image);
	$('#image').attr('src', serviceURL + 'download/' + image.imagefile);
	$('#note').text(image.note);
	$('#upload_time').text('created on ' + image.upload_time);
	$('#address').text('taken at ' + image.address);
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
