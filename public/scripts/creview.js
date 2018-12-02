if(checkCookie().includes("PA")) {
    window.location='/';
}

var ref = window.location.href;

var url = new URL(ref);

var link = url.searchParams.get("link");

var id = url.searchParams.get("id");

var pid = url.searchParams.get("pid");


console.log(link+ " "+id+ " "+pid);



$(document).ready(function () {

     var reviewResourceURI= "http://localhost:8082/ProductReview/productreviewservice/productreview";

     $.ajax({
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                url: reviewResourceURI+'/'+id+'/'+pid,
                data: JSON.stringify(id),
                dataType: 'json',
                encode: true
            }).done(function(returnedData){

                if (!returnedData.profileID) {
                    //alert("Not Reviewed this Book"+returnedData.profileID );
                    //submit the add product review form to the server
                        $('form').submit(function (event) {

                            var formData = {
                                'productID': id,
                                'profileID': pid,
                                'review': getReview(),
                                'rating': getRating()
                            };

                             $.ajax({
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                url: reviewResourceURI,
                                data: JSON.stringify(formData),
                                dataType: 'json',
                                encode: true
                            }).done(function(returnedData){

                                alert("Review has been added");
                                window.location = '/home?id='+pid;

                            });

                            
                        event.preventDefault(); // waits for a response from server before proceeding with the rest of the code

                        });
                                        
                } else {
                    alert("Already Reviewd: "+checkCookie());
                    window.location='/home?id='+returnedData.profileID;
                }
            });

    $("#back").attr("href", "/home?id="+pid);
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