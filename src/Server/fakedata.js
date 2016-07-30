let userData = [];
let projectData = {};
let db = {};
let userIdCount = 0;
let projectIdCount = 0;

db.addUser = function(user){
	var input = {
		id: userIdCount,
		handle: user.handle,
		image: user.image,
		company: user.company
	}
	userData.push(input)
	userIdCount++
}

db.getUsers = function(){
	return data
}

db.addProject = function(project){
	var input = {
		id: projectIdCount,
		boss: project.boss,
		start: project.start,
		due: project.due,
		status: project.status
	}
	projectData.projectIdCount = input
	projectIdCount++
}

module.exports = db;