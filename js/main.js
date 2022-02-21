/* AUTH */


$('.auth__button').click(function() {
    if ($('#username').val().length != 0 && $('#password').val().length != 0) {
        var userEmail = $('#username').val();
        var userPassword = $('#password').val()

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const body = `{ "email": "1@mail.com", "password": "1" }`;

        const init = {
            method: 'POST',
            headers,
            body
        };

        fetch('http://192.99.10.113:9001/auth', init)
            .then((response) => {
                return response.json(); // or .text() or .blob() ...
            })
            .then((text) => {
                // text is the response body
            })
            .catch((e) => {
                // error in e.message
            });

    } else {
        alert('Enter data for all fields!')
    }


    //   $('.crypto__auth').hide(500)
})