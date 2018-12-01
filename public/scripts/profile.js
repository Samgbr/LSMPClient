if(checkCookie() === "") {
    window.location='/';
}




$(document).ready(function () {
    var loginid=checkCookie();
    $(".greet").text("Welcome: "+ checkCookie());
    var bookResourceURI= "http://localhost:8082/Customer/shopperservice/shopper/"
        $.ajax({
            method: 'GET',
            headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
            url: bookResourceURI+loginid,
            data: JSON.stringify(loginid),
            dataType: 'json',
            encode: true
        }).done(function(returnedData){
            $('#name').text(returnedData.firstName+ " "+returnedData.lastName);
            $('#email').text(returnedData.email);
            $('#street').text(returnedData.addresses[0].street);
            $('#city').text(returnedData.addresses[0].city);
            $('#zip').text(returnedData.addresses[0].zipcode);
            $('#phone').text(returnedData.phones[0].phoneNumber);
            $('#cardno').text(returnedData.bills[0].creditCardNumber);
            $('#cvv').text("Cvv: " + returnedData.bills[0].cvv);
        });
});


function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var username = getCookie("name");
    if (username != "") {
        return username;
    } else {
        alert("Not logged in");
       return "";
    }
}