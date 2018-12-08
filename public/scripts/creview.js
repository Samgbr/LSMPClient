if(checkCookie().includes("PA")) {
    window.location='/';
}



$(document).ready(function () {

    var hlink=getCookie("creviewlink");

     var reviewResourceURI= hlink+'/'+getCookie("productid")+'/'+getCookie("name");
     //alert(reviewResourceURI);

     $.ajax({
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                url: reviewResourceURI,
                data: JSON.stringify(getCookie("name")),
                dataType: 'json',
                encode: true
            }).done(function(returnedData){

                if (!returnedData.profileID) {
                    //alert("Not Reviewed this Book"+returnedData.profileID );
                    //submit the add product review form to the server
                        $('form').submit(function (event) {

                            var formData = {
                                'productID': getCookie("productid"),
                                'profileID': getCookie("name"),
                                'review': getReview(),
                                'rating': getRating()
                            };

                             $.ajax({
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                url: hlink,
                                data: JSON.stringify(formData),
                                dataType: 'json',
                                encode: true
                            }).done(function(returnedData){

                                alert("Review has been added");
                                window.location = '/home';

                            });

                            
                        event.preventDefault(); // waits for a response from server before proceeding with the rest of the code

                        });
                                        
                } else {
                    alert("Already Reviewd: "+checkCookie());
                    window.location='/home';
                }
            });

    $("#back").attr("href", "/home");
    $( "#logout" ).click(function() {
        document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path='/';";
         event.stopPropagation();
    });
});

 function getReview() {
    return $("textarea[name=review]").val();
 }

function getRating() {
    return $("input[name=rate]").val();
}




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
        $('#greet').text("Welcome " + username);
        return username;
    } else {
        alert("Not logged in");
       return "";
    }
}