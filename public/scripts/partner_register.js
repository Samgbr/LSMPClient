

$(document).ready(function () {

    var partnerResourceURI= "http://localhost:8082/Partner/partnerservice/partner"


    //submit the add shopper form to the server
    $('form').submit(function (event) {

        var addressData = [{
            'city': getCity(),
            'state': getState(),
            'street': getStreet(),
            'zipcode': getZipcode()
        }];

        var phoneData = [{
            'phoneNumber': getPhoneNumber(),
            'type': getType()
        }];

        var billData = [{
            'creditCardNumber': getCardNumber(),
            'cvv': getCvv(),
            'expiryMonth': getExpiryMonth(),
            'expiryYear': getExpiryYear()
        }];

        var formData = {
            'loginID': getUsername(),
            'firstName': getFirstName(),
            'middleName': getMiddleName(),
            'lastName': getLastName(),
            'email': getEmail(),
            'password': getPassword(),
            'sellerLevel': getSellerLevel(),
            'sellerName': getSellerName(),
            'addresses': addressData,
            'phones': phoneData,
            'billingsInfo': billData
        };

         $.ajax({
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: partnerResourceURI,
            data: JSON.stringify(formData),
            dataType: 'json',
            encode: true
        }).done(function(returnedData){

            alert("Partner has been added");
            window.location = '/';

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
        return $("input[name=lastName]").val();
    }

    function getMiddleName(){
        return $("input[name=middleName]").val();
    }

    function getEmail(){
        return $("input[name=email]").val();
    }

    function getPassword(){
        return $("input[name=password]").val();
    }

    function getStreet(){
        return $("input[name=street]").val();
    }

    function getCity(){
        return $("input[name=city]").val();
    }

    function getState(){
        return $("input[name=state]").val();
    }

    function getZipcode(){
        return $("input[name=zipcode]").val();
    }

    function getPhoneNumber(){
        return $("input[name=phoneNumber]").val();
    }

    function getSellerLevel() {
        return $("#levels option:selected").text();
    }

    function getType() {
        return $("#types option:selected").text();
    }

    function getCardNumber() {
        return $("input[name=cardNumber]").val();
    }

    function getCvv() {
        return $("input[name=cvv]").val();
    }

    function getExpiryMonth() {
        return $("input[name=expiryMonth]").val();
    }

    function getExpiryYear() {
        return $("input[name=expirYear]").val();
    }

    function getSellerName() {
        return $("input[name=sellerName]").val();
    }

});