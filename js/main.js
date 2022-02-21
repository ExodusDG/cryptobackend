/* AUTH */


$('.auth__button').click(function() {
    if ($('#username').val().length != 0 && $('#password').val().length != 0) {
        var userEmail = $('#username').val();
        var userPassword = $('#password').val()

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "email": "153@mail.com",
            "password": "14"
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://192.99.10.113:9001/auth", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

    } else {
        alert('Enter data for all fields!')
    }
})