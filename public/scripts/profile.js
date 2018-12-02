if(checkCookie().includes("PA")) {
    window.location='/';
}

var ref = window.location.href;

var url = new URL(ref);

var c = url.searchParams.get("id");



$(document).ready(function () {
    var loginid=checkCookie();
    $(".greet").text("Welcome: ");
    $("#back").attr("href", "/home?id="+c);

    $( "#logout" ).click(function() {
        document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path='/';";
    });

     $( "#cancel" ).click(function() {
        /*
        var customerResourceURI= "http://localhost:8082/Customer/shopperservice/shopper/";
        $.ajax({
            method: 'DELETE',
            headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
            url: customerResourceURI+loginid,
            data: JSON.stringify(loginid),
            dataType: 'json',
            encode: true
            }).done(function(returnedData){
                alert("Customer Deleted");
                //$("#cancel").attr("href", "/");
        });  */
    });
    
    var customerResourceURI= "http://localhost:8082/Customer/shopperservice/shopper/"
        $.ajax({
            method: 'GET',
            headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
            url: customerResourceURI+loginid,
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
            $('#cvv').text(returnedData.bills[0].cvv);
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