if(checkCookie() === "") {
    window.location='/';
}

var ref = window.location.href;

var url = new URL(ref);

var link = url.searchParams.get("link");

var id = url.searchParams.get("id");

var pid = url.searchParams.get("pid");

console.log(link+ " "+ id+" "+pid);



$(document).ready(function () {
    var source = $("#reviews-modal-template").html();

    var reviews_modal_template = Handlebars.compile(source);

     var reviewResourceURI= "http://localhost:8082/ProductReview/productreviewservice/productreviews/"+id;

     $.getJSON(reviewResourceURI, function (review) {

        for (var i = 0; i < review.length; i++) {
                var reviewData = {
                    productID: ""+review[i].productID,
                    profileID: ""+review[i].profileID,
                    review: ""+review[i].review,
                    rate: ""+review[i].rating
                };
                //alert("Rate data: "+review[0].rating);
            var reviewsElementToAppend = reviews_modal_template(reviewData);

            //embed the html element which contains employee information into the html div tag with id 'content'
            $("#content").append(reviewsElementToAppend);
            }
        });

     /*
     $.ajax({
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                url: reviewResourceURI+id,
                data: JSON.stringify(id),
                dataType: 'json',
                encode: true
            }).done(function(returnedData){

                if (!returnedData.productID) {
                    alert("No Reviews Yet "+returnedData.productID);
                    window.location='/home?id='+pid;                                        
                } else {
                    alert("Reviews found: "+returnedData.productID);
                    
                }
            });  */
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
        $('#greet').text("Welcome " + username);
        return username;
    } else {
        alert("Not logged in");
       return "";
    }
}