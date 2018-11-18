
$(document).ready(function () {
        //submit the add employee form to the server
    $('form').submit(function (event) {
        event.preventDefault(); // waits for a response from server before proceeding with the rest of the code
        var bookResourceURI= "http://localhost:8082/BookProduct/bookservice/book/"
        var url=bookResourceURI+getProductID()
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

            //alert("book found");

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
                    title: ""+book.title,
                    author: ""+book.author,
                    edition: ""+book.edition,
                    isbn: ""+book.isbn,
                    publisher: ""+book.publisher,
                    price: ""+book.sellingPrice
                };

                //replace all the variables within the compiled script tag above with each value of employee data.
                var bookElementToAppend = book_modal_template(bookData);

                //embed the html element which contains employee information into the html div tag with id 'content'
                $("#content").append(bookElementToAppend);


        });
}


function getProductID(){
    return $("input[name=productID]").val();
}

