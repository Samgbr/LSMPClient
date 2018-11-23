$(document).ready(function () {

    var shopperResourceURI= "http://localhost:8082/Customer/shopperservice/shopper"

    //submit the add shopper form to the server
    $('form').submit(function (event) {

        var formData = {
            'loginID': getUsername(),
            'firstName': getFirstName()
        };

        $.ajax({
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: shopperResourceURI,
            data: JSON.stringify(formData),
            dataType: 'json',
            encode: true
        }).done(function(returnedData){

            alert("Customer has been added");

        });
        event.preventDefault(); // waits for a response from server before proceeding with the rest of the code

    });

    function getUsername() {
         return $("input[name=loginID]").val();
    }

    function getFirstName() {
        return $("input[name=firstName]").val();
    }

    function getLastName() {
        var fullName = getFullName();
        return fullName.split(" ")[1];
    }

    function getFullName(){
        return $("input[name=newFullName]").val();

    }

    function getSalary(){
        return $("input[name=newSalary]").val();


    }

    function getPrivileges(){
        return $("input[name=newPrivileges]").val();
    }




});