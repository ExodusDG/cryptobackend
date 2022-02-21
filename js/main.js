/* AUTH */


$('.auth__button').click(function() {
    if ($('#username').val().length != 0 && $('#password').val().length != 0) {
        var userEmail = $('#username').val();
        var userPassword = $('#password').val()

        var url = "http://192.99.10.113:9001/auth";

        var xhr = new XMLHttpRequest();
        xhr.open("POST", url);

        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                console.log(xhr.status);
                console.log(xhr.responseText);
            }
        };

        var data = '{ "email": "1@mail.com", "password": "1" }';

        xhr.send(data);

    } else {
        alert('Enter data for all fields!')
    }
})