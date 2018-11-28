if(checkCookie() === "") {
    window.location='/';
}

var ref = window.location.href;

var url = new URL(ref);

var id = url.searchParams.get("id");

console.log(id);




$(document).ready(function () {

    $(".greet").text("Hey "+ checkCookie());
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