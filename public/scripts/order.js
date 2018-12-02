if(checkCookie() === "") {
    window.location='/';
}

var ref = window.location.href;

var url = new URL(ref);

var id = url.searchParams.get("id");

var pid = url.searchParams.get("pid");

var price = url.searchParams.get("price");

console.log(id + " " +pid + " "+price);


$(document).ready(function () {
    $('#greet').text("Welcome " + checkCookie());
     var profileid=id;
     var productid=pid;
     var link= "http://localhost:8082/Order/orderservice/order";
     var d=new Date();
     var datenow = d.toLocaleDateString();
     var amount=0;
     var orderid="";
     $('#pay').attr('disabled','disabled');
     $('#submit').removeAttr('disabled');
    $('form').submit(function (event) {
        event.preventDefault(); // waits for a response from server before proceeding with the rest of the code
        var orderDetail = [{
                'productID': productid,
                'orderedQuantity': getQty()
        }];

        var data = {
                'profileID': profileid,
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
            url: link,
            data: JSON.stringify(data),
            dataType: 'json',
            encode: true
        }).done(function(returnedData){

            alert("Order Created");
            $('#submit').attr('disabled','disabled');
            $('#orderID').text("OrderID: " + returnedData.orderID);
            $('#qty').text("Quantity: " + returnedData.orderDetails[0].orderedQuantity);
            orderid=returnedData.orderID;
            amount=price*returnedData.orderDetails[0].orderedQuantity;
            $('#amount').text("Amount: "+price+" * "+returnedData.orderDetails[0].orderedQuantity+" = " + amount);
             $('#pay').removeAttr('disabled');
        });

    });

    $( "#pay" ).click(function() {
        //alert( "button called" + amount+ " "+ orderid);
        link="http://localhost:8082/Order/orderservice/payment";

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
            url: link,
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
