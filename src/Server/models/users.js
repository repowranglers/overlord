import db from '../db'

exports.addUser = function(user){
	return db('users').insert(user)
}

exports.getUser = function(username){
	return db('users').where('gh_name', username)
}

exports.updateImage = function(user, img){
	return db('users').where('gh_name', user)
		.update('gh_img', img)
}

exports.updateCompany = function(user, company){
	return db('users').where('gh_name', user)
		.update('company', company)
}
