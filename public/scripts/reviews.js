
var ref = window.location.href;

var url = new URL(ref);

var link = url.searchParams.get("link");

console.log(link);


if(link == null) {
        alert("Login");
        window.location='/error';
}
