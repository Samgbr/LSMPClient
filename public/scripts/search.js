if(checkCookie().includes("PA")) {
    window.location='/';
}

$(document).ready(function () {

     $(".greet").text("Welcome " + getCookie("login"));

    $( "#logout" ).click(function() {
        document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path='/';";
    });

     $( "#profile" ).click(function() {
        //add href when clicked with user id
        $("#profile").attr("href", "/profile");
    });

     $( "#order" ).click(function() {
        //add href when clicked with user id
        $("#order").attr("href", "/orders");
    });

     $(".order").hide();
            $('form').submit(function (event) {
                event.preventDefault(); // waits for a response from server before proceeding with the rest of the code
                var bookResourceURI= "http://localhost:8082/BookProduct/bookservice/book/"
                var url=bookResourceURI+getProductID();
                $.ajax({
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    url: bookResourceURI+getProductID(),
                    data: JSON.stringify(getProductID()),
                    dataType: 'json',
                    encode: true
                }).done(function(returnedData){
                    //alert(""+returnedData.link[0].url);
                });
                myfunc(url);
            });
        
});

function myfunc(url) {
     //extract whatever is inside of the script tag with an id of employee-modal-template
        var source = $("#book-modal-template").html();
        var book_modal_template = Handlebars.compile(source);

        //retrieve all the employees from server then display them on the homepage
        // if server doesn't return any employees for some reason, the homepage will not have a list of employees displayed.
        $.getJSON(url, function (book) {

                var bookData = {
                    productID: ""+book.productID,
                    title: ""+book.title,
                    author: ""+book.author,
                    edition: ""+book.edition,
                    isbn: ""+book.isbn,
                    publisher: ""+book.publisher,
                    price: ""+book.sellingPrice,
                    inventorylink: book.link[0].url,
                    reviewslink: book.link[1].url,
                    creviewlink: book.link[2].url,
                    id:getCookie("name")
                };
                setCookie("reviewslink",bookData.reviewslink,30);
                setCookie("creviewlink",bookData.creviewlink,30);
                //replace all the variables within the compiled script tag above with each value of employee data.
                var bookElementToAppend = book_modal_template(bookData);
                //embed the html element which contains employee information into the html div tag with id 'content'
                $("#content").prepend(bookElementToAppend);

                qtyOnHandfunc(bookData.inventorylink,bookData.price);

        });
        
}


function qtyOnHandfunc(invlink,price) {
     $.getJSON(invlink, function (book) {

            var qtyonhand = JSON.stringify(book.qty);
            var inv = book.link[0].url;
            
            $("#qty").text("In stock: " + qtyonhand);
                if(qtyonhand==0) {
                    $(".orderInfo").text("Sorry out of stock");
                }
                if(qtyonhand>0) {
                    $(".orderInfo").hide();
                    setCookie("productid",getProductID(),30);
                    setCookie("order",inv,30);
                    setCookie("price",price,30);
                    //$(".order").attr("href", "/Order?link="+inv+"&id="+c+"&pid="+getProductID()+"&price="+price);
                    $(".order").attr("href", "/Order");
                    $(".order").text("Order Here...");
                    $(".order").show();
                }
                //$('#productID').val('');
        });
    
}


function getProductID(){
    return $("input[name=productID]").val();
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

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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
