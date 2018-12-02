if(checkCookie().includes("SH")) {
    window.location='/';
}

var ref = window.location.href;

var url = new URL(ref);

var id = url.searchParams.get("id");


console.log("id "+id);



$(document).ready(function () {

     var bookResourceURI= "http://localhost:8082/BookProduct/bookservice/book";


     //submit the add product review form to the server
    $('form').submit(function (event) {

        var formData = {
                        'title': getTitle(),
                        'author': getAuthor(),
                        'publisher': getPublisher(),
                        'edition': getEdition(),
                        'sellingPrice': getSellingprice(),
                        'partnerID':id
                    };

                    $.ajax({
                            method: 'POST',
                            headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                            url: bookResourceURI,
                                data: JSON.stringify(formData),
                                dataType: 'json',
                                encode: true
                            }).done(function(returnedData){

                                alert("Book has been added"+ returnedData.title);

                                $( '#frm' ).each(function(){
                                    this.reset();
                                });

                                var source = $("#book-modal-template").html();
                                var book_modal_template = Handlebars.compile(source);
                                var bookElementToAppend = book_modal_template(returnedData);
                                //embed the html element which contains employee information into the html div tag with id 'content'
                                $("#content").append(bookElementToAppend);

                            });

                            
                        event.preventDefault(); // waits for a response from server before proceeding with the rest of the code

                        });

    $( "#logout" ).click(function() {
        document.cookie = "pname=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path='/';";
    });
});

 function getTitle() {
    return $("input[name=title]").val();
 }

function getAuthor() {
    return $("input[name=author]").val();
}

function getPublisher() {
    return $("input[name=publisher]").val();
}

function getEdition() {
    return $("input[name=edition]").val();
}

function getSellingprice() {
    return $("input[name=price]").val();
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