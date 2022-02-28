/* AUTH */


$('.auth__button').click(function() {
    var test;
    if ($('#username').val().length != 0 && $('#password').val().length != 0) {
        var userEmail = $('#username').val();
        var userPassword = $('#password').val()

        var url = "https://test-24mex.happylucky.online:9001/auth";

        var xhr = new XMLHttpRequest();
        xhr.open("POST", url);

        xhr.setRequestHeader("Content-Type", "text/plain");

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                console.log(xhr.status);

                if (xhr.responseText == 'Error, user already exists') {
                    alert('Error, user already exists')
                } else {
                    $('.send__status').text('Token successfully received')
                    setTimeout(() => {
                        $('.crypto__auth').attr('style', 'display: none')
                        $('.crypto__panel').attr('style', 'display: flex')
                    }, 1000);
                }

                console.log(xhr.responseText);
            }
        };

        var data = '{"email": "' + userEmail + '","password": "' + userPassword + '"}';

        xhr.send(data);

    } else {
        alert('Enter data for all fields!')
    }

    //   $('.crypto__auth').hide(500)
})