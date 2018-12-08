if(checkCookie().includes("PA")) {
    window.location='/';
}


$(document).ready(function () {
    $('#greet').text("Welcome ");
    
     var d=new Date();
     var datenow = d.toLocaleDateString();
     var amount=0;
     var orderid="";
     var paymentLink=""; 
     $('#pay').attr('disabled','disabled');
     $('#submit').removeAttr('disabled');
     $("#back").attr("href", "/home"); 

    $( "#logout" ).click(function() {
        document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path='/';";
    });

    $('form').submit(function (event) {

        event.preventDefault(); // waits for a response from server before proceeding with the rest of the code
        var orderDetail = [{
                'productID': getCookie("productid"),
                'orderedQuantity': getQty()
        }];

        var data = {
                'profileID': getCookie("name"),
                'orderDate': datenow,
                'shipAddressID': "AD9505",
                'orderDetails': orderDetail
            };
        //order POST
        $.ajax({
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: getCookie("order"),
            data: JSON.stringify(data),
            dataType: 'json',
            encode: true
        }).done(function(returnedData){

            alert("Order Created");
            $('#submit').attr('disabled','disabled');
            //$('#orderID').text("Order Number: " + returnedData.orderID);
            $('#qty').text("Quantity: " + returnedData.orderDetails[0].orderedQuantity);
            orderid=returnedData.orderID;
            amount=getCookie("price")*returnedData.orderDetails[0].orderedQuantity;
            $('#amount').text("Amount: "+getCookie("price")+" * "+returnedData.orderDetails[0].orderedQuantity+" = " + amount);
             $('#pay').removeAttr('disabled');
             paymentLink=returnedData.link[0].url;
        });

    });

    $( "#pay" ).click(function() {

        var data = {
            'orderID': orderid,
            'amount': amount,
            'billID': "BI3646"
        };

        $.ajax({
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: paymentLink,
            data: JSON.stringify(data),
            dataType: 'json',
            encode: true
        }).done(function(returnedData){

            //alert("Paid");
            $('#amtpaid').text("Paid Amount: " + amount);
            $('#status').text("Status: Order Filled");
            $('#confirm').text("Confirmation id: "+orderid);
            $('#pay').attr('disabled','disabled');          
        });
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


function getQty() {
    return $("input[name=qtyOrdered]").val();
}
