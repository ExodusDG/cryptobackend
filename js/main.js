/* AUTH */


$('.auth__button').click(function() {
    if ($('#username').val().length != 0 && $('#password').val().length != 0) {
        var userEmail = $('#username').val();
        var userPassword = $('#password').val()

        var settings = {
            "url": "http://192.99.10.113:9001/auth",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "email": "1@mail.com",
                "password": "1"
            }),
        };

        $.ajax(settings).done(function(response) {
            console.log(response);
        });
    } else {
        alert('Enter data for all fields!')
    }
})