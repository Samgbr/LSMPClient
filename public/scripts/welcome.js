$(document).ready(function () {
    /*
    $('#me').click(function() {
    alert($('input:checkbox[name=ckme]').is(':checked'));
    });  */

    //submit the add login form to the server
    $('form').submit(function (event) {
            event.preventDefault(); // waits for a response from server before proceeding with the rest of the code

        if($('input:checkbox[name=ckme]').is(':checked')) {
            alert("checked partner page opens");
        } else {
            var shopperResourceURI= "http://localhost:8082/Customer/shopperservice/shopper/"
            //var url=shopperResourceURI+getLoginID()+'/'+getPassword()
            $.ajax({
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                url: shopperResourceURI+getLoginID()+'/'+getPassword(),
                data: JSON.stringify(getLoginID()),
                dataType: 'json',
                encode: true
            }).done(function(returnedData){

                if (!returnedData.profileID) {
                    alert("Login Unsuccessful");
                    window.location='/';
                    return;
                }
        
                alert("login Successful" + "  " +returnedData.profileID);
                window.location="/home?id="+returnedData.profileID;

            });
        }
           
    });


});

function getLoginID(){
    return $("input[name=loginID]").val();
}

function getPassword(){
    return $("input[name=password]").val();
}