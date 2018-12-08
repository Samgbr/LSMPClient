if(checkCookie().includes("PA")) {
    window.location='/';
}


$(document).ready(function () {

    var source = $("#orders-modal-template").html();

    var orders_modal_template = Handlebars.compile(source);

     var ordersResourceURI= "http://localhost:8082/Order/orderservice/orders/"+getCookie("name");

     $.getJSON(ordersResourceURI, function (orders) {

        for (var i = 0; i < orders.length; i++) {
                var orderData = {
                    orderDate: ""+orders[i].orderDate,
                    amount: ""+orders[i].amount,
                    productID: ""+orders[i].orderDetails[0].productID,
                    orderedQuantity: ""+orders[i].orderDetails[0].orderedQuantity
                };
                
                //alert("Rate data: "+review[0].rating);
            var ordersElementToAppend = orders_modal_template(orderData);

            //embed the html element which contains employee information into the html div tag with id 'content'
            $("#content").append(ordersElementToAppend);
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