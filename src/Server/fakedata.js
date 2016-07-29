const data = {userid:'', user: '', company: ''};
let db = {};
let idCount = 0;

db.addUser = function(userStuff){
	data.user = userStuff.username;
	data.company = user.company;
	data.userId = idCount++
}

db.getUser = function(){
	return [data.userId, data.user, data.company]
}

module.exports = db;