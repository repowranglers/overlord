import db from '../db'

exports.addUser = function(user){
	return db('users').insert(user)
}

exports.getUser = function(username){
	return db('users').where('gh_name', username)
}

exports.updateUser = function(user){

}