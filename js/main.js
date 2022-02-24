/* AUTH */


$('.auth__button').click(function() {
    if ($('#username').val().length != 0 && $('#password').val().length != 0) {
        var userEmail = $('#username').val();
        var userPassword = $('#password').val()

        var data = JSON.stringify({
            "email": "153@mail.com",
            "password": "14"
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function() {
            if (this.readyState === 4) {
                console.log(this.responseText);
            }
        });

        xhr.open("POST", "https://test-24mex.happylucky.online:9001/auth");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    } else {
        alert('Enter data for all fields!')
    }


    //   $('.crypto__auth').hide(500)
})