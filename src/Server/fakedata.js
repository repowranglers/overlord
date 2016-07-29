let data = [];
let db = {};
let idCount = 0;

db.addUser = function(user){
	data.push({
		id: idCount,
		handle: user.handle,
		image: user.image,
		company: user.company
	})
	console.log(data)
}

db.getUser = function(){
	return [data.userId, data.user, data.company]
}

module.exports = db;