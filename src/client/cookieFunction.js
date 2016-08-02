// a function used to parse urls that are stored in cookies.

function parseCookieUrl(str){
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