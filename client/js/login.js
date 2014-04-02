$(document).ready(function() {
    $('#loginButton').click(function(){
        loginURL = serviceURL + '/call/run/login/' + $('#usernameInput')[0].value + '/' + $('#passwordInput')[0].value
        $.ajax( {
            type : 'Get',
            url : loginURL,
            success : function(data) {
                alert(data);
                if (data)
                {
                    window.location.href="#uploadImagePage";
                }
            }
        });
    });
});
