//import cookie from cookieFunction.js
//example usage at the bottom. 
const cookie = {}
module.exports = cookie

// a function used to parse urls that are stored in cookies.
cookie.parseCookieUrl = function (str){
	while(str.includes('%3A')) {
		str = str.replace(/%3A/i, ':');
	}
	while(str.includes('%2F')) {
		str = str.replace(/%2F/i, '/');
	}
	while(str.includes('%3F')){
		str = str.replace(/%3F/i, '?')
	}
	while(str.includes('%3D')){
		str = str.replace(/%3D/i, '=')
	}
	return str;
}
// a function used to seperate cookie by name
cookie.getCookie = function(cname) {

    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}
// example usage..............
// to grab username run ---> let username = cookie.getCookie('gh_name');
// to grab company run ---> let company = cookie.getCookie('company');
// for image url you will have to use two functions
// first run ----> let imageUrl = cookie.getCookie('gh_img');
// then run ---> let parsedUrl = cookie.parseCookieUrl(imageUrl);