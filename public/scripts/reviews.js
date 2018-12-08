if(checkCookie().includes("PA")) {
    window.location='/';
}


$(document).ready(function () {

    var source = $("#reviews-modal-template").html();

    var reviews_modal_template = Handlebars.compile(source);

     $.getJSON(getCookie("reviewslink"), function (review) {

        for (var i = 0; i < review.length; i++) {
                var reviewData = {
                    productReviewID: ""+review[i].productReviewID,
                    productID: ""+review[i].productID,
                    profileID: ""+review[i].profileID,
                    review: ""+review[i].review,
                    rate: ""+review[i].rating,
                    delete: ""+review[i].link[1].url
                };
                //alert("Rate data: "+review[0].rating);
            var reviewsElementToAppend = reviews_modal_template(reviewData);
            //embed the html element which contains employee information into the html div tag with id 'content'
            $("#content").append(reviewsElementToAppend);
            }
        });
     
     $("#back").attr("href", "/home");

     $( "#logout" ).click(function() {
        document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path='/';";
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
        $('#greet').text("Welcome " + username);
        return username;
    } else {
        alert("Not logged in");
       return "";
    }
}